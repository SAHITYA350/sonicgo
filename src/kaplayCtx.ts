import kaplay from "kaplay";

const k = kaplay({
  width: 1280,
  height: 720,
  background: [0, 0, 0],
  letterbox: true,
  global: false,
  buttons: {
    jump: {
      keyboard: ["space", "up", "w"],
      mouse: "left",
      gamepad: ["south"],
    },
  },
  touchToMouse: true,
  debug: false,
  pixelDensity: window.devicePixelRatio,
  stretch: true,
  crisp: true,
});

export default k;