// Sections are measured in viewport coordinates; gaps intentionally have no active link.
export function currentSection(sections, marker) {
  return sections.find(section => section.top <= marker && section.bottom > marker)?.id || ''
}
export function readingProgress(scrollY, scrollHeight, viewportHeight) {
  const travel = scrollHeight - viewportHeight
  return travel > 0 ? Math.max(0, Math.min(1, scrollY / travel)) : 0
}
