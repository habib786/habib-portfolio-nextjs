export default function imageLoader({ src }: { src: string }) {
  if (src.includes('supabase.co')) {
    return src;
  }
  return `/_next/image?url=${encodeURIComponent(src)}`;
}