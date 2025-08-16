export default function imageUrlFormatter(imagePath: string) {
  return `https://firebasestorage.googleapis.com/v0/b/next-homes-99ccb.firebasestorage.app/o/${encodeURIComponent(
    imagePath
  )}?alt=media`;
}
