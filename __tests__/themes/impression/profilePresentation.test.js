import { splitPaperBibliography } from '@/themes/impression/profilePresentation'

const descriptor = (id, type, richText, children = []) => ({
  id,
  block: { id, type, properties: { title: richText } },
  richText,
  children
})

test('separates the paper title while preserving author equations and styled venue links', () => {
  const authors = descriptor('authors', 'bulleted_list', [
    ['Author'],
    ['⁍', [['e', '^*']]]
  ])
  const title = [['A Research Paper.', [['b']]]]
  const metadata = [
    [' In: '],
    ['Conference 2026', [['b'], ['h', 'orange']]],
    [' [Paper]', [['a', 'https://example.com/paper']]]
  ]
  const bibliography = [
    authors,
    descriptor('citation', 'text', [...title, ...metadata])
  ]
  const before = JSON.stringify(bibliography)
  const result = splitPaperBibliography(bibliography)
  expect(result.title.richText).toEqual(title)
  expect(result.authors).toEqual([authors])
  expect(result.metadata[0].richText).toEqual(metadata)
  expect(JSON.stringify(bibliography)).toBe(before)
})

test('unformatted citations and extra bibliography blocks remain readable', () => {
  const citation = descriptor('citation', 'text', [
    ['Unformatted title and venue [Code]', [['a', 'https://example.com/code']]]
  ])
  const note = descriptor('note', 'text', [['Additional contribution']])
  const result = splitPaperBibliography([citation, note])
  expect(result.title).toBe(citation)
  expect(result.metadata).toEqual([note])
})

test('nested notes survive when the citation consists only of a title', () => {
  const note = descriptor('nested', 'text', [['More details']])
  const result = splitPaperBibliography([
    descriptor('citation', 'text', [['Title', [['b']]]], [note])
  ])
  expect(result.title.children).toEqual([])
  expect(result.metadata[0].children).toEqual([note])
})
