const HEADING_TYPES = new Set(['header', 'sub_header', 'sub_sub_header'])
const TEXT_TYPES = new Set([
  'text',
  'bulleted_list',
  'numbered_list',
  'quote',
  ...HEADING_TYPES
])
const STRUCTURAL_TYPES = new Set(['column', 'column_list'])

function unwrap(record) {
  let value = record
  while (value && !value.type && value.value) value = value.value
  return value?.type ? value : null
}

function plainText(block) {
  return (block?.properties?.title || []).map(item => item[0] || '').join('')
}

function sectionKind(heading) {
  const name = plainText(heading).trim().toLowerCase()
  if (/experience|经历|經歷/.test(name)) return 'experience'
  if (/publications?|preprints?|papers?|论文|論文/.test(name)) {
    return 'publications'
  }
  if (/projects?|项目|項目/.test(name)) return 'projects'
  if (/research interests?|研究兴趣|研究興趣/.test(name)) return 'text'
  return 'content'
}

/**
 * Read the maintained About-page schema without modifying the Notion recordMap.
 *
 * sections preserve source order and use the heading's Notion ID as their key.
 * Block descriptors are { id, block, richText, children, source? }. `block` and
 * `richText` retain the original values, including links, equations and styles.
 * Text arrays contain roots: render each root's children recursively once.
 *
 * Entries have kind intro (portrait/images/blocks), experience (images/blocks),
 * publication (bibliography/figures/abstract), or project (title/description/
 * images). Every entry also carries `source`, its full original subtree.
 * Unsupported shapes become fallback entries (blockIds/blocks/recordMap), so
 * the caller can use the standard renderer for that entire subtree.
 */
export function parseProfile(post) {
  const recordMap = post?.blockMap || {}
  const records = recordMap.block || {}
  const getBlock = id => unwrap(records[id])
  const canonicalId = id => String(id || '').replace(/-/g, '')
  const rootId = records[post?.id]
    ? post.id
    : Object.keys(records).find(id => canonicalId(id) === canonicalId(post?.id))
  const root = getBlock(rootId)
  const sections = []

  function describe(id, ancestors = new Set()) {
    const block = getBlock(id)
    const path = new Set(ancestors)
    path.add(id)
    return {
      id,
      block,
      richText: block?.properties?.title || [],
      children: (block?.content || [])
        .filter(childId => !path.has(childId))
        .map(childId => describe(childId, path)),
      ...(block?.type === 'image'
        ? {
            source:
              block.properties?.source?.[0]?.[0] ||
              block.format?.display_source ||
              ''
          }
        : {})
    }
  }

  function blank(descriptor) {
    return (
      descriptor.block?.type === 'divider' ||
      (descriptor.block?.type === 'text' &&
        !plainText(descriptor.block).trim() &&
        descriptor.children.length === 0)
    )
  }

  // Only known leaves may enter a custom card. Unknown blocks, missing children
  // and cycles fail closed to the full Notion subtree rather than losing data.
  function collect(ids, ancestors = new Set()) {
    const result = { texts: [], images: [], supported: true }
    for (const id of ids) {
      const block = getBlock(id)
      if (!block || ancestors.has(id)) {
        result.supported = false
        continue
      }
      const descriptor = describe(id)
      if (blank(descriptor)) continue
      const path = new Set(ancestors)
      path.add(id)
      if (STRUCTURAL_TYPES.has(block.type)) {
        const nested = collect(block.content || [], path)
        result.texts.push(...nested.texts)
        result.images.push(...nested.images)
        result.supported &&= nested.supported
      } else if (block.type === 'image') {
        result.images.push(descriptor)
        if (block.content?.length) result.supported = false
      } else if (TEXT_TYPES.has(block.type)) {
        result.texts.push(descriptor)
        const nested = collect(block.content || [], path)
        // Text children remain in the descriptor; collect is validation only.
        result.supported &&= nested.supported && nested.images.length === 0
      } else {
        result.supported = false
      }
    }
    return result
  }

  function fallback(id) {
    return {
      kind: 'fallback',
      id,
      blockIds: [id],
      blocks: [describe(id)],
      recordMap,
      source: describe(id)
    }
  }

  function parseCard(id, kind) {
    const block = getBlock(id)
    const source = describe(id)
    const rows = (block?.content || []).filter(
      childId => getBlock(childId)?.type === 'column_list'
    )
    if (block?.type !== 'callout' || rows.length !== 1) return fallback(id)
    const body = collect(block.content || [], new Set([id]))
    if (!body.supported || !body.texts.length || !body.images.length) {
      return fallback(id)
    }
    const ownText = plainText(block).trim() ? [{ ...source, children: [] }] : []
    if (kind === 'experience') {
      return {
        kind: 'experience',
        id,
        source,
        images: body.images,
        blocks: [...ownText, ...body.texts]
      }
    }
    const row = collect([rows[0]], new Set([id]))
    const outside = collect(
      block.content.filter(childId => childId !== rows[0]),
      new Set([id])
    )
    if (!row.texts.length || outside.images.length) return fallback(id)
    return {
      kind: 'publication',
      id,
      source,
      bibliography: row.texts,
      figures: row.images,
      abstract: [...ownText, ...outside.texts]
    }
  }

  function parseProject(id) {
    const source = describe(id)
    const body = collect([id])
    if (
      source.block?.type !== 'column_list' ||
      !body.supported ||
      body.texts.length !== 1 ||
      !body.images.length
    ) {
      return fallback(id)
    }
    const title = body.texts[0]
    return {
      kind: 'project',
      id,
      source,
      title: { ...title, children: [] },
      description: title.children,
      images: body.images
    }
  }

  let section = null
  for (const id of root?.content || []) {
    const block = getBlock(id)
    if (HEADING_TYPES.has(block?.type)) {
      section = {
        id,
        kind: sectionKind(block),
        heading: describe(id),
        entries: []
      }
      sections.push(section)
      continue
    }
    if (blank(describe(id))) continue
    if (!section) {
      const intro = collect([id])
      if (
        block?.type === 'column_list' &&
        intro.supported &&
        intro.images.length &&
        intro.texts.length
      ) {
        sections.push({
          id,
          kind: 'intro',
          heading: null,
          entries: [
            {
              kind: 'intro',
              id,
              source: describe(id),
              portrait: intro.images[0],
              images: intro.images,
              blocks: intro.texts
            }
          ]
        })
        continue
      }
      section = { id, kind: 'content', heading: null, entries: [] }
      sections.push(section)
    }
    const entry =
      section.kind === 'experience' || section.kind === 'publications'
        ? parseCard(id, section.kind)
        : section.kind === 'projects'
          ? parseProject(id)
          : fallback(id)
    section.entries.push(entry)
  }

  return { id: rootId || post?.id || '', recordMap, sections }
}
