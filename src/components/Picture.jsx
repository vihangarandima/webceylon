export const host = (url) => {
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return '';
  }
};

// `src` has no extension: the WebP pair made by `npm run images` is offered
// first, with the original PNG as the fallback.
export default function Picture({ src, alt = '', sizes = '100vw', className = '', eager = false, draggable }) {
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={`${src}-800.webp 800w, ${src}.webp 1600w`} sizes={sizes} />
      <img
        src={`${src}.png`}
        alt={alt}
        width="1024"
        height="464"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={draggable}
        {...(eager ? { fetchpriority: 'high' } : {})}
      />
    </picture>
  );
}
