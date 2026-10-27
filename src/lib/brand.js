// The Babylume logo, shared by everything that stamps it onto a canvas
// (keepsake cards, reels). Decoded once and cached.
export const LOGO_URL = `${import.meta.env.BASE_URL}logo.png`

let logoPromise = null

export function loadLogo() {
  if (!logoPromise) {
    logoPromise = new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => { logoPromise = null; reject(new Error('Could not load logo')) }
      img.src = LOGO_URL
    })
  }
  return logoPromise
}

/**
 * Draw the logo inside a soft white pill so it reads on any photo.
 * `x` is the left edge, the centre when align is 'center', or the right edge
 * when align is 'right'; `y` is the top.
 * Returns the pill's width so callers can lay out around it.
 */
export function drawLogoPill(ctx, logo, { x, y, height = 64, align = 'left', alpha = 1 }) {
  const pad = height * 0.3
  const lh = height - pad * 1.3
  const lw = lh * (logo.width / logo.height)
  const pw = lw + pad * 2
  const px = align === 'center' ? x - pw / 2 : align === 'right' ? x - pw : x
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.fillStyle = 'rgba(255,255,255,0.9)'
  ctx.beginPath()
  if (ctx.roundRect) ctx.roundRect(px, y, pw, height, height / 2)
  else ctx.rect(px, y, pw, height)
  ctx.fill()
  ctx.drawImage(logo, px + pad, y + (height - lh) / 2, lw, lh)
  ctx.restore()
  return pw
}
