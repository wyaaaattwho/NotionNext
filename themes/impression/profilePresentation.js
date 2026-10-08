// The maintained schema marks a paper's title as the first bold run. Retain
// every other tuple, including styled venues, links and nested content.
export function splitPaperBibliography(bibliography) {
  const index = bibliography.findIndex(item => item.block?.type === 'text')
  const descriptor = bibliography[index]
  if (!descriptor) return { title: null, authors: bibliography, metadata: [] }
  const title = []
  const remaining = []
  let readingTitle = true
  for (const tuple of descriptor.richText) {
    const bold = tuple[1]?.some(decoration => decoration[0] === 'b')
    if (readingTitle && (bold || (!title.length && !tuple[0].trim()))) {
      title.push(tuple)
    } else {
      readingTitle = false
      remaining.push(tuple)
    }
  }
  if (!title.length) {
    return {
      title: descriptor,
      authors: bibliography.filter((_, i) => i < index),
      metadata: bibliography.filter((_, i) => i > index)
    }
  }
  return {
    title: { ...descriptor, richText: title, children: [] },
    authors: bibliography.filter((_, i) => i < index),
    metadata: [
      ...(remaining.length || descriptor.children.length
        ? [{ ...descriptor, richText: remaining }]
        : []),
      ...bibliography.filter((_, i) => i > index)
    ]
  }
}
