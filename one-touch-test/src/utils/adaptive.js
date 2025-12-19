const DESIGN_WIDTH = 1440;

export function updateAdaptiveVars() {
  const vw = window.innerWidth;
  const scale = vw / DESIGN_WIDTH;

  const root = document.documentElement;

  // баз ед
  root.style.setProperty("--scale", scale.toString());

  // общий отступ
  root.style.setProperty("--page-gutter", `${70 * scale}px`);
}