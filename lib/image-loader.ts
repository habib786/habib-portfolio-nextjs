export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.includes('supabase.co')) {
    // Basic Supabase image transformation support
    // Use ?v=... to ensure we don't conflict with existing queries if any
    const separator = src.includes('?') ? '&' : '?';
    return `${src}${separator}width=${width}&quality=${quality || 75}`;
  }
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}