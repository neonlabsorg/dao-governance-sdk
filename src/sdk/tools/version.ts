export function parseVersion(version: string) {
  const arr = version.split('.');
  const major = parseInt(arr[0]) || 0;
  const minor = parseInt(arr[1]) || 0;
  const patch = parseInt(arr[2]) || 0;
  return { major, minor, patch };
}
