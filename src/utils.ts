import k from "./kaplayCtx";

export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768 || 'ontouchstart' in window;
}

export function isLandscape(): boolean {
  return window.innerWidth > window.innerHeight;
}

export function isPortrait(): boolean {
  return window.innerHeight > window.innerWidth;
}

export function isTablet(): boolean {
  const userAgent = navigator.userAgent.toLowerCase();
  return /ipad|tablet|playbook|silk|android(?!.*mobile)/.test(userAgent) || 
         (window.innerWidth >= 768 && window.innerWidth <= 1024);
}

export function getVolume(): number {
  const saved = k.getData("volume");
  return saved !== undefined ? saved : 0.5;
}

export function setVolume(vol: number): void {
  k.setData("volume", vol);
  // Kaplay doesn't have setMasterVolume, we'll handle volume per sound
}