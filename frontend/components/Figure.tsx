import Image from 'next/image';

/**
 * A sized image with an optional caption, for Journal posts and the Film
 * page. Width and height are the file's real pixel dimensions: they let the
 * browser reserve the space before the image arrives, so text doesn't jump
 * on a slow connection. Lazy-loaded (next/image's default).
 */
export function Figure({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}) {
  return (
    <figure className="mt-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 768px) 672px, 100vw"
        className="h-auto w-full rounded-card"
      />
      {caption ? <figcaption className="mt-2 text-sm text-ink/60">{caption}</figcaption> : null}
    </figure>
  );
}
