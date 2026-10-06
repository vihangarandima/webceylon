// Slow, glowing blue lines sweeping across the dark — drawn on a small 2D
// canvas and scaled up by CSS, which softens them for free.

const LINES = [
  // [vertical position (0–1), amplitude, wavelength (× width), speed, tilt, width]
  [0.18, 0.22, 1.3, 0.11, 0.35, 2.2],
  [0.42, 0.3, 1.8, -0.08, -0.25, 2.8],
  [0.6, 0.26, 1.1, 0.14, 0.5, 1.8],
  [0.78, 0.2, 1.6, -0.12, -0.4, 2.4],
  [0.3, 0.34, 2.2, 0.07, 0.15, 1.6],
  [0.9, 0.18, 1.4, 0.09, -0.6, 2],
];

export function drawLines(ctx, w, h, t) {
  ctx.clearRect(0, 0, w, h);
  ctx.lineCap = 'round';
  for (const [y0, amp, wave, speed, tilt, lw] of LINES) {
    const phase = t * speed;
    ctx.beginPath();
    for (let x = -20; x <= w + 20; x += 8) {
      const k = x / w;
      const y = h * (y0 + tilt * (k - 0.5) + amp * Math.sin((k / wave) * Math.PI * 2 + phase * Math.PI * 2) * 0.5);
      x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    // a wide faint halo, then the bright core
    ctx.strokeStyle = 'rgba(31, 107, 255, 0.18)';
    ctx.lineWidth = lw * 7;
    ctx.stroke();
    ctx.strokeStyle = 'rgba(70, 140, 255, 0.55)';
    ctx.lineWidth = lw;
    ctx.stroke();
  }
}
