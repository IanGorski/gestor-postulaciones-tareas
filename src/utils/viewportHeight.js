// Ajusta una variable CSS --app-vh considerando el viewport visual (reduce saltos al abrir teclado móvil)
export function initDynamicViewportHeight() {
  const setVH = () => {
    const vh = (window.visualViewport ? window.visualViewport.height : window.innerHeight) * 0.01;
    document.documentElement.style.setProperty('--app-vh', `${vh * 100}px`);
  };
  setVH();
  window.addEventListener('resize', setVH);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', setVH);
  }
  return () => {
    window.removeEventListener('resize', setVH);
    if (window.visualViewport) window.visualViewport.removeEventListener('resize', setVH);
  };
}
