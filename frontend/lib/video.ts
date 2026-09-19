/** Pulls the 11-character video ID out of any common YouTube link (or a bare ID). */
export function youtubeId(url: string) {
  const trimmed = url.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  return (
    trimmed.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/)?.[1] ??
    null
  );
}
