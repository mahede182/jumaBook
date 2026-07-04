/**
 * Removes all newlines (\n or \r) from a string and replaces them with a space.
 */
export function removeNewlines(str: string): string {
  if (!str) return '';
  return str.replace(/\r?\n|\r/g, ' ');
}
