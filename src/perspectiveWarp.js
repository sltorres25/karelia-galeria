/**
 * Perspective Transform & Homography Rendering Module for HTML5 Canvas
 * Performs pure client-side 2D mesh triangulation and homographic warp
 * Karelia Galería - "Ver obra en tu espacio"
 */

/**
 * Interpolates a point inside a 4-vertex quadrilateral (TL, TR, BR, BL) using bilinear mapping.
 */
export function getQuadBilinearPoint(points, u, v) {
  const [p0, p1, p2, p3] = points;
  return {
    x: (1 - u) * (1 - v) * p0.x + u * (1 - v) * p1.x + u * v * p2.x + (1 - u) * v * p3.x,
    y: (1 - u) * (1 - v) * p0.y + u * (1 - v) * p1.y + u * v * p2.y + (1 - u) * v * p3.y
  };
}

/**
 * Solves and applies 2D affine transformation mapping source triangle (s0, s1, s2)
 * onto destination triangle (d0, d1, d2) and renders source image clipped to the triangle.
 */
function drawTriangleAffine(ctx, image, s0, s1, s2, d0, d1, d2) {
  const det = s0.x * (s1.y - s2.y) - s0.y * (s1.x - s2.x) + (s1.x * s2.y - s2.x * s1.y);
  if (Math.abs(det) < 0.00001) return;

  const invDet = 1.0 / det;

  const sInv00 = (s1.y - s2.y) * invDet;
  const sInv01 = (s2.x - s1.x) * invDet;
  const sInv02 = (s1.x * s2.y - s2.x * s1.y) * invDet;

  const sInv10 = (s2.y - s0.y) * invDet;
  const sInv11 = (s0.x - s2.x) * invDet;
  const sInv12 = (s2.x * s0.y - s0.x * s2.y) * invDet;

  const sInv20 = (s0.y - s1.y) * invDet;
  const sInv21 = (s1.x - s0.x) * invDet;
  const sInv22 = (s0.x * s1.y - s1.x * s0.y) * invDet;

  const a = d0.x * sInv00 + d1.x * sInv10 + d2.x * sInv20;
  const b = d0.y * sInv00 + d1.y * sInv10 + d2.y * sInv20;
  const c = d0.x * sInv01 + d1.x * sInv11 + d2.x * sInv21;
  const d = d0.y * sInv01 + d1.y * sInv11 + d2.y * sInv21;
  const e = d0.x * sInv02 + d1.x * sInv12 + d2.x * sInv22;
  const f = d0.y * sInv02 + d1.y * sInv12 + d2.y * sInv22;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(d0.x, d0.y);
  ctx.lineTo(d1.x, d1.y);
  ctx.lineTo(d2.x, d2.y);
  ctx.closePath();
  ctx.clip();

  ctx.transform(a, b, c, d, e, f);
  ctx.drawImage(image, 0, 0);
  ctx.restore();
}

/**
 * Renders high-quality drop shadow behind the wall artwork polygon.
 */
export function renderWallShadow(ctx, quadPoints, shadowConfig = {}) {
  const {
    opacity = 0.35,
    blur = 20,
    offsetX = 6,
    offsetY = 14
  } = shadowConfig;

  ctx.save();
  ctx.shadowColor = `rgba(0, 0, 0, ${opacity})`;
  ctx.shadowBlur = blur;
  ctx.shadowOffsetX = offsetX;
  ctx.shadowOffsetY = offsetY;

  ctx.fillStyle = `rgba(0, 0, 0, ${opacity * 0.8})`;
  ctx.beginPath();
  ctx.moveTo(quadPoints[0].x, quadPoints[0].y);
  ctx.lineTo(quadPoints[1].x, quadPoints[1].y);
  ctx.lineTo(quadPoints[2].x, quadPoints[2].y);
  ctx.lineTo(quadPoints[3].x, quadPoints[3].y);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * Computes outer quadrilateral for frame borders.
 */
function expandQuad(quadPoints, borderThickness) {
  // Center of quad
  const cx = (quadPoints[0].x + quadPoints[1].x + quadPoints[2].x + quadPoints[3].x) / 4;
  const cy = (quadPoints[0].y + quadPoints[1].y + quadPoints[2].y + quadPoints[3].y) / 4;

  return quadPoints.map(p => {
    const dx = p.x - cx;
    const dy = p.y - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < 0.001) return { ...p };
    const scale = (dist + borderThickness) / dist;
    return {
      x: cx + dx * scale,
      y: cy + dy * scale
    };
  });
}

/**
 * Renders perspective frame (Sin marco, Marco negro, Marco madera).
 */
export function renderPerspectiveFrame(ctx, quadPoints, frameType = 'none') {
  if (frameType === 'none') return;

  const borderPx = 16;
  const outerQuad = expandQuad(quadPoints, borderPx);

  ctx.save();

  // Outer frame polygon
  ctx.beginPath();
  ctx.moveTo(outerQuad[0].x, outerQuad[0].y);
  ctx.lineTo(outerQuad[1].x, outerQuad[1].y);
  ctx.lineTo(outerQuad[2].x, outerQuad[2].y);
  ctx.lineTo(outerQuad[3].x, outerQuad[3].y);
  ctx.closePath();

  // Frame colors
  if (frameType === 'black') {
    ctx.fillStyle = '#1c1917'; // Matte museum black
    ctx.fill();
    ctx.strokeStyle = '#38322e';
    ctx.lineWidth = 2;
    ctx.stroke();
  } else if (frameType === 'wood') {
    // Warm natural oak wood tone
    ctx.fillStyle = '#6b4423';
    ctx.fill();
    ctx.strokeStyle = '#8c5930';
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }

  // Inner bevel edge line
  ctx.beginPath();
  ctx.moveTo(quadPoints[0].x, quadPoints[0].y);
  ctx.lineTo(quadPoints[1].x, quadPoints[1].y);
  ctx.lineTo(quadPoints[2].x, quadPoints[2].y);
  ctx.lineTo(quadPoints[3].x, quadPoints[3].y);
  ctx.closePath();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.restore();
}

/**
 * Core function: Renders the artwork image warped into the 4 quadPoints quadrilateral
 * using a subdivision mesh grid (N x M).
 */
export function renderWarpedArtwork(ctx, artworkImg, quadPoints, options = {}) {
  const {
    gridSize = 16,
    frame = 'none',
    shadow = { opacity: 0.35, blur: 20, offsetX: 6, offsetY: 14 }
  } = options;

  if (!artworkImg || !artworkImg.complete || artworkImg.naturalWidth === 0) return;

  // 1. Draw Drop Shadow
  renderWallShadow(ctx, quadPoints, shadow);

  // 2. Draw Frame (if selected)
  renderPerspectiveFrame(ctx, quadPoints, frame);

  // 3. Render Artwork Triangulated Mesh
  const imgW = artworkImg.naturalWidth || artworkImg.width;
  const imgH = artworkImg.naturalHeight || artworkImg.height;

  const N = gridSize;
  const M = gridSize;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const u0 = i / N;
      const u1 = (i + 1) / N;
      const v0 = j / M;
      const v1 = (j + 1) / M;

      // Source points
      const s0 = { x: u0 * imgW, y: v0 * imgH };
      const s1 = { x: u1 * imgW, y: v0 * imgH };
      const s2 = { x: u1 * imgW, y: v1 * imgH };
      const s3 = { x: u0 * imgW, y: v1 * imgH };

      // Destination points
      const d0 = getQuadBilinearPoint(quadPoints, u0, v0);
      const d1 = getQuadBilinearPoint(quadPoints, u1, v0);
      const d2 = getQuadBilinearPoint(quadPoints, u1, v1);
      const d3 = getQuadBilinearPoint(quadPoints, u0, v1);

      // Triangle 1 (Top-Left)
      drawTriangleAffine(ctx, artworkImg, s0, s1, s3, d0, d1, d3);
      // Triangle 2 (Bottom-Right)
      drawTriangleAffine(ctx, artworkImg, s1, s2, s3, d1, d2, d3);
    }
  }
}

/**
 * Draws interactive corner handles and guideline box over the editor canvas.
 */
export function drawEditorHandles(ctx, quadPoints, activeIndex = -1, hoveredIndex = -1) {
  const labels = ['Sup. Izq', 'Sup. Der', 'Inf. Der', 'Inf. Izq'];

  ctx.save();

  // Guideline Quad
  ctx.beginPath();
  ctx.moveTo(quadPoints[0].x, quadPoints[0].y);
  ctx.lineTo(quadPoints[1].x, quadPoints[1].y);
  ctx.lineTo(quadPoints[2].x, quadPoints[2].y);
  ctx.lineTo(quadPoints[3].x, quadPoints[3].y);
  ctx.closePath();

  ctx.strokeStyle = '#A95F4A'; // Arcilla accent
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Handles
  quadPoints.forEach((p, idx) => {
    const isActive = idx === activeIndex;
    const isHovered = idx === hoveredIndex;

    const outerRadius = isActive ? 16 : isHovered ? 14 : 12;
    const innerRadius = isActive ? 6 : 5;

    // Pulse ring when active
    if (isActive) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, outerRadius + 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(169, 95, 74, 0.25)';
      ctx.fill();
    }

    // Outer circle handle
    ctx.beginPath();
    ctx.arc(p.x, p.y, outerRadius, 0, Math.PI * 2);
    ctx.fillStyle = isActive ? '#A95F4A' : '#ffffff';
    ctx.strokeStyle = '#A95F4A';
    ctx.lineWidth = 2.5;
    ctx.fill();
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, innerRadius, 0, Math.PI * 2);
    ctx.fillStyle = isActive ? '#ffffff' : '#A95F4A';
    ctx.fill();

    // Corner Label badge above handle
    ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    const labelY = idx < 2 ? p.y - 18 : p.y + 26;

    // Label background pill
    const textWidth = ctx.measureText(labels[idx]).width;
    ctx.fillStyle = 'rgba(44, 31, 26, 0.85)';
    ctx.fillRect(p.x - textWidth / 2 - 6, labelY - 11, textWidth + 12, 16);

    ctx.fillStyle = '#ffffff';
    ctx.fillText(labels[idx], p.x, labelY);
  });

  ctx.restore();
}
