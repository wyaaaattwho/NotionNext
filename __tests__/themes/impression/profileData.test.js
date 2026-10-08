import { parseProfile } from '@/themes/impression/profileData'

function fixture() {
  const block = {}
  const add = (id, type, title = '', content = [], extra = {}) => {
    block[id] = {
      value: {
        id,
        type,
        properties: { title: typeof title === 'string' ? [[title]] : title },
        content,
        ...extra
      }
    }
    return id
  }
  const image = id =>
    add(id, 'image', 'figure.png', [], {
      properties: {
        title: [['figure.png']],
        source: [[`https://example.test/${id}.png`]],
        caption: [['An original caption']]
      }
    })
  const row = (id, left, right) => {
    add(`${id}-left`, 'column', '', left)
    add(`${id}-right`, 'column', '', right)
    return add(id, 'column_list', '', [`${id}-left`, `${id}-right`])
  }
  const experience = id => {
    image(`${id}-logo`)
    add(`${id}-role`, 'text', 'Researcher')
    add(`${id}-date`, 'text', '2026 – Present')
    const columns = row(
      `${id}-row`,
      [`${id}-logo`],
      [`${id}-role`, `${id}-date`]
    )
    return add(id, 'callout', '', [columns])
  }
  const paper = id => {
    image(`${id}-figure`)
    add(`${id}-authors`, 'bulleted_list', 'A. Researcher, B. Researcher')
    add(`${id}-title`, 'text', [
      ['Learning Agents', [['b']]],
      [' [Paper]', [['a', 'https://example.test/paper']]],
      ['⁍', [['e', 'x^2']]]
    ])
    const columns = row(
      `${id}-row`,
      [`${id}-authors`, `${id}-title`],
      [`${id}-figure`]
    )
    add(`${id}-abstract`, 'text', 'Our method learns from interaction.')
    return add(id, 'callout', '', [columns, `${id}-abstract`])
  }

  image('portrait')
  add('intro-heading', 'sub_sub_header', 'About Me')
  add('second-email', 'text', 'alternate@example.test')
  add('email', 'text', 'Email: research@example.test', ['second-email'])
  row('intro', ['portrait'], ['intro-heading', 'email'])
  add('interests-heading', 'sub_sub_header', 'Research Interests')
  add('interests', 'text', 'Robotics and learning')
  add('work-heading', 'sub_sub_header', 'Work Experience')
  experience('job')
  add('research-heading', 'sub_sub_header', 'Research Experience')
  experience('research')
  add('publication-heading', 'sub_sub_header', 'Publications')
  paper('paper')
  add('preprint-heading', 'sub_sub_header', 'Preprints')
  paper('preprint')
  add('project-heading', 'sub_sub_header', 'Projects')
  image('project-image')
  add('project-detail', 'text', 'A community-maintained knowledge base.')
  add('project-title', 'bulleted_list', 'Knowledge Wiki', ['project-detail'])
  row('project', ['project-title'], ['project-image'])
  add('services-heading', 'sub_header', 'Services')
  add('services', 'text', 'Reviewer: A research conference')
  add('blank', 'text', '   ')
  add('divider', 'divider')
  add('root', 'page', 'About Researcher', [
    'intro',
    'interests-heading',
    'divider',
    'interests',
    'work-heading',
    'blank',
    'job',
    'research-heading',
    'research',
    'publication-heading',
    'paper',
    'preprint-heading',
    'preprint',
    'project-heading',
    'project',
    'services-heading',
    'services'
  ])

  return {
    post: { id: 'root', blockMap: { block } },
    add,
    image,
    row,
    experience
  }
}

test('maintained sections and cards preserve source order and nested details', () => {
  const { post } = fixture()
  const result = parseProfile(post)
  expect(result.sections.map(section => section.id)).toEqual([
    'intro',
    'interests-heading',
    'work-heading',
    'research-heading',
    'publication-heading',
    'preprint-heading',
    'project-heading',
    'services-heading'
  ])
  expect(result.sections.map(section => section.kind)).toEqual([
    'intro',
    'text',
    'experience',
    'experience',
    'publications',
    'publications',
    'projects',
    'content'
  ])
  const intro = result.sections[0].entries[0]
  expect(intro.portrait.id).toBe('portrait')
  expect(intro.blocks.map(block => block.id)).toEqual([
    'intro-heading',
    'email'
  ])
  expect(intro.blocks[1].children[0].id).toBe('second-email')
  const job = result.sections[2].entries[0]
  expect(job.kind).toBe('experience')
  expect(job.images.map(block => block.id)).toEqual(['job-logo'])
  expect(job.blocks.map(block => block.id)).toEqual(['job-role', 'job-date'])
  const paper = result.sections[4].entries[0]
  expect(paper.bibliography.map(block => block.id)).toEqual([
    'paper-authors',
    'paper-title'
  ])
  expect(paper.figures[0].id).toBe('paper-figure')
  expect(paper.abstract[0].id).toBe('paper-abstract')
  const project = result.sections[6].entries[0]
  expect(project.title.id).toBe('project-title')
  expect(project.title.children).toEqual([])
  expect(project.description.map(block => block.id)).toEqual(['project-detail'])
  expect(project.images[0].id).toBe('project-image')
  expect(result.sections[7].entries[0].blockIds).toEqual(['services'])
})

test('rich text, figures and source subtrees retain their original data', () => {
  const { post } = fixture()
  const snapshot = JSON.stringify(post)
  const result = parseProfile(post)
  const paper = result.sections[4].entries[0]
  expect(paper.bibliography[1].richText).toBe(
    post.blockMap.block['paper-title'].value.properties.title
  )
  expect(paper.figures[0].source).toBe('https://example.test/paper-figure.png')
  expect(paper.figures[0].block.properties.caption).toEqual([
    ['An original caption']
  ])
  expect(paper.source.block).toBe(post.blockMap.block.paper.value)
  expect(result.recordMap).toBe(post.blockMap)
  expect(JSON.stringify(post)).toBe(snapshot)
})

test('appending a card to the same Notion schema needs no code or IDs changes', () => {
  const { post, experience } = fixture()
  experience('new-research')
  const root = post.blockMap.block.root.value
  root.content.splice(
    root.content.indexOf('publication-heading'),
    0,
    'new-research'
  )
  const result = parseProfile(post)
  expect(result.sections[3].entries.map(entry => entry.id)).toEqual([
    'research',
    'new-research'
  ])
})

test('unsupported or incomplete cards preserve the complete subtree as fallback', () => {
  const { post, add } = fixture()
  add('extra-table', 'table', '', ['missing-cell'])
  post.blockMap.block['paper-row-left'].value.content.push('extra-table')
  post.blockMap.block['job-row'].value.content.push('missing-column')
  add('unknown-heading', 'sub_header', 'Teaching')
  add('unknown-block', 'embed', 'An external resource')
  post.blockMap.block.root.value.content.push(
    'unknown-heading',
    'unknown-block'
  )
  const result = parseProfile(post)
  expect(result.sections[2].entries[0].kind).toBe('fallback')
  const paper = result.sections[4].entries[0]
  expect(paper.kind).toBe('fallback')
  expect(paper.blockIds).toEqual(['paper'])
  expect(paper.recordMap).toBe(post.blockMap)
  expect(paper.source.children[0].children[0].children.at(-1).id).toBe(
    'extra-table'
  )
  expect(result.sections.at(-1).entries[0].blockIds).toEqual(['unknown-block'])
})

test('accepts both Notion record wrappers and resolves compact page IDs', () => {
  const { post } = fixture()
  for (const [id, record] of Object.entries(post.blockMap.block)) {
    post.blockMap.block[id] =
      id === 'portrait' ? record.value : { value: record }
  }
  post.blockMap.block['ab-cd'] = post.blockMap.block.root
  delete post.blockMap.block.root
  post.id = 'abcd'
  const result = parseProfile(post)
  expect(result.id).toBe('ab-cd')
  expect(result.sections[0].entries[0].portrait.source).toBe(
    'https://example.test/portrait.png'
  )
  expect(result.sections[4].entries[0].kind).toBe('publication')
})

test('missing roots and cyclic content are safe and do not discard source IDs', () => {
  expect(parseProfile(null).sections).toEqual([])
  const { post } = fixture()
  post.blockMap.block['job-row-left'].value.content.push('job-row')
  post.blockMap.block.root.value.content.push('missing-top-level')
  const result = parseProfile(post)
  expect(result.sections[2].entries[0].kind).toBe('fallback')
  expect(result.sections.at(-1).entries.at(-1).blockIds).toEqual([
    'missing-top-level'
  ])
})
