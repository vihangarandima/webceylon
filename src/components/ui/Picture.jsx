import { forwardRef } from 'react';

// `src` has no extension: the WebP pair made by `npm run images` is offered
// first, with the original PNG/JPG as the fallback.
const Picture = forwardRef(function Picture(
  { src, alt, ext = 'png', sizes = '100vw', className = '', imgClassName = '', eager = false, ...rest },
  ref
) {
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={`${src}-800.webp 800w, ${src}.webp 1600w`} sizes={sizes} />
      <img
        ref={ref}
        src={`${src}.${ext}`}
        alt={alt}
        className={imgClassName}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        {...(eager ? { fetchpriority: 'high' } : {})}
        {...rest}
      />
    </picture>
  );
});

export default Picture;
