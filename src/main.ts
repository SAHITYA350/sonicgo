import k from "./kaplayCtx";
import { makeMotobug, makeRing, makeSonic } from "./entities";
import { isMobileDevice, isLandscape, isPortrait, getVolume, setVolume } from "./utils";
import type { GameObj, PosComp, AreaComp, SpriteComp, ScaleComp, BodyComp, TextComp, AnchorComp, ColorComp, RectComp, CircleComp, OutlineComp, ZComp } from "kaplay";

// Load all assets with correct paths
k.loadSprite("chemical-bg", "graphics/chemical-bg.png");
k.loadSprite("platforms", "graphics/platforms.png");
k.loadSprite("sonic", "graphics/sonic.png", {
  sliceX: 8,
  sliceY: 2,
  anims: {
    run: { from: 0, to: 7, loop: true, speed: 30 },
    jump: { from: 8, to: 15, loop: true, speed: 100 },
  },
});
k.loadSprite("sonic-boost", "graphics/sonic1.png");
k.loadSprite("ring", "graphics/ring.png", {
  sliceX: 16,
  sliceY: 1,
  anims: {
    spin: { from: 0, to: 15, loop: true, speed: 30 },
  },
});
k.loadSprite("motobug", "graphics/motobug.png", {
  sliceX: 5,
  sliceY: 1,
  anims: {
    run: { from: 0, to: 4, loop: true, speed: 8 },
  },
});
try {
  k.loadSprite("sonic-gif", "graphics/sonicgif.gif");
} catch (error) {
  console.log("GIF not available, using fallback");
}
k.loadFont("mania", "fonts/mania.ttf");
k.loadSound("destroy", "sounds/Destroy.wav");
k.loadSound("hurt", "sounds/Hurt.wav");
k.loadSound("hyper-ring", "sounds/HyperRing.wav");
k.loadSound("jump", "sounds/Jump.wav");
k.loadSound("ring", "sounds/Ring.wav");

// Main Menu Scene
k.scene("menu", () => {
  const isMobile = isMobileDevice();
  
  // Check if we need to show rotate screen
  if (isMobile && isPortrait()) {
    k.go("rotate-screen");
    return;
  }
  
  k.add([
    k.rect(k.width(), k.height()),
    k.color(10, 25, 47),
    k.z(-1),
  ]);

  // Animated background particles
  for (let i = 0; i < 30; i++) {
    const particle = k.add([
      k.circle(k.rand(2, 6)),
      k.pos(k.rand(0, k.width()), k.rand(0, k.height())),
      k.color(30, 144, 255),
      k.opacity(k.rand(0.1, 0.3)),
      k.z(0),
    ]);
    
    particle.onUpdate(() => {
      particle.pos.y -= k.rand(10, 30) * k.dt();
      if (particle.pos.y < -10) {
        particle.pos.y = k.height() + 10;
        particle.pos.x = k.rand(0, k.width());
      }
    });
  }

  const title = k.add([
    k.text("SONIC RUNNER", { 
      font: "mania", 
      size: isMobile ? 48 : 96,
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.height() * 0.2),
    k.z(1),
  ]);

  const subtitle = k.add([
    k.text("ULTIMATE EDITION", { 
      font: "mania", 
      size: isMobile ? 16 : 32,
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.height() * 0.28),
    k.color(255, 215, 0),
    k.z(1),
  ]);

  const playBtn = k.add([
    k.rect(isMobile ? 200 : 300, isMobile ? 60 : 80, { radius: 8 }),
    k.pos(k.center().x, k.height() * 0.5),
    k.anchor("center"),
    k.area(),
    k.color(0, 120, 215),
    k.outline(4, k.rgb(255, 255, 255)),
    k.z(1),
    "button",
  ]);

  k.add([
    k.text("PLAY", { font: "mania", size: isMobile ? 24 : 40 }),
    k.pos(k.center().x, k.height() * 0.5),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.z(2),
  ]);

  const videoBtn = k.add([
    k.rect(isMobile ? 200 : 300, isMobile ? 60 : 80, { radius: 8 }),
    k.pos(k.center().x, k.height() * 0.65),
    k.anchor("center"),
    k.area(),
    k.color(139, 0, 139),
    k.outline(4, k.rgb(255, 255, 255)),
    k.z(1),
    "button",
  ]);

  k.add([
    k.text("VIDEO", { font: "mania", size: isMobile ? 24 : 40 }),
    k.pos(k.center().x, k.height() * 0.65),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.z(2),
  ]);

  const settingsBtn = k.add([
    k.rect(isMobile ? 200 : 300, isMobile ? 60 : 80, { radius: 8 }),
    k.pos(k.center().x, k.height() * 0.8),
    k.anchor("center"),
    k.area(),
    k.color(50, 50, 50),
    k.outline(4, k.rgb(255, 255, 255)),
    k.z(1),
    "button",
  ]);

  k.add([
    k.text("SETTINGS", { font: "mania", size: isMobile ? 24 : 40 }),
    k.pos(k.center().x, k.height() * 0.8),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.z(2),
  ]);

  // Button hover effects
  k.onHover("button", (btn) => {
    btn.scale = k.vec2(1.1);
    k.setCursor("pointer");
  });

  k.onHoverEnd("button", (btn) => {
    btn.scale = k.vec2(1);
    k.setCursor("default");
  });

  // Button click handlers
  playBtn.onClick(() => {
    k.go("game");
  });

  videoBtn.onClick(() => {
    k.go("video");
  });

  settingsBtn.onClick(() => {
    k.go("settings");
  });
});

// Rotate Screen Warning for Mobile Portrait Mode
k.scene("rotate-screen", () => {
  k.add([
    k.rect(k.width(), k.height()),
    k.color(10, 10, 30),
  ]);

  // Pulsing background
  const bgPulse = k.add([
    k.rect(k.width(), k.height()),
    k.color(30, 60, 120),
    k.opacity(0),
  ]);

  bgPulse.onUpdate(() => {
    bgPulse.opacity = k.wave(0, 0.3, k.time() * 2);
  });

  // Animated phone icon
  const phoneIcon = k.add([
    k.text("📱", { size: 100 }),
    k.anchor("center"),
    k.pos(k.center().x, k.height() * 0.25),
  ]);

  phoneIcon.onUpdate(() => {
    phoneIcon.angle = k.wave(-15, 15, k.time() * 2);
  });

  // Rotation arrow
  const arrow = k.add([
    k.text("↻", { size: 80 }),
    k.anchor("center"),
    k.pos(k.center().x, k.height() * 0.4),
    k.color(255, 215, 0),
  ]);

  arrow.onUpdate(() => {
    arrow.angle += 100 * k.dt();
  });

  k.add([
    k.text("PLEASE ROTATE", { 
      font: "mania", 
      size: 36,
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.height() * 0.55),
    k.color(255, 255, 255),
  ]);

  k.add([
    k.text("YOUR DEVICE", { 
      font: "mania", 
      size: 36,
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.height() * 0.63),
    k.color(255, 255, 255),
  ]);

  const landscapeText = k.add([
    k.text("to Landscape Mode", { 
      font: "mania", 
      size: 24,
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.height() * 0.73),
    k.color(0, 255, 255),
  ]);

  landscapeText.onUpdate(() => {
    landscapeText.opacity = k.wave(0.5, 1, k.time() * 3);
  });

  k.add([
    k.text("🎮 FOR BEST GAMING EXPERIENCE! 🎮", { 
      font: "mania", 
      size: 18,
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.height() * 0.85),
    k.color(255, 100, 200),
  ]);

  const continueBtn = k.add([
    k.rect(250, 60, { radius: 8 }),
    k.pos(k.center().x, k.height() * 0.95),
    k.anchor("center"),
    k.area(),
    k.color(0, 200, 0),
    k.outline(4, k.rgb(255, 255, 255)),
    "button",
  ]);

  k.add([
    k.text("CONTINUE ANYWAY", { font: "mania", size: 20 }),
    k.pos(k.center().x, k.height() * 0.95),
    k.anchor("center"),
    k.color(255, 255, 255),
  ]);

  continueBtn.onClick(() => {
    k.go("game");
  });

  // Check orientation change
  k.onUpdate(() => {
    if (isLandscape()) {
      k.go("menu");
    }
  });
});

// Video Scene with Sonic GIF
k.scene("video", () => {
  const isMobile = isMobileDevice();
  
  k.add([
    k.rect(k.width(), k.height()),
    k.color(10, 25, 47),
  ]);

  // Animated stars background
  for (let i = 0; i < 50; i++) {
    const star = k.add([
      k.circle(k.rand(1, 3)),
      k.pos(k.rand(0, k.width()), k.rand(0, k.height())),
      k.color(255, 255, 255),
      k.opacity(k.rand(0.3, 0.8)),
      k.z(0),
    ]);
    
    star.onUpdate(() => {
      star.opacity = k.wave(0.3, 0.8, k.time() * k.rand(1, 3));
    });
  }

  k.add([
    k.text("🎬 SONIC VIDEO PLAYER 🎬", { 
      font: "mania", 
      size: isMobile ? 32 : 48,
    }),
    k.anchor("center"),
    k.pos(k.center().x, isMobile ? 60 : 80),
    k.color(255, 215, 0),
    k.z(1),
  ]);

  // GIF Display Area
  const gifFrame = k.add([
    k.rect(isMobile ? 300 : 600, isMobile ? 300 : 600, { radius: 16 }),
    k.pos(k.center().x, k.center().y - (isMobile ? 20 : 0)),
    k.anchor("center"),
    k.color(255, 100, 200),
    k.outline(8, k.rgb(255, 215, 0)),
    k.z(1),
  ]);

  // Sonic GIF
// WITH THIS:
if (k.getSprite("sonic-gif")) {
  const gif = k.add([
    k.sprite("sonic-gif"),
    k.pos(k.center().x, k.center().y - (isMobile ? 20 : 0)),
    k.anchor("center"),
    k.scale(isMobile ? 0.4 : 0.8),
    k.z(2),
    k.rotate(0), // ADD THIS LINE
  ]);

  gif.onUpdate(() => {
    gif.angle = k.wave(-5, 5, k.time() * 2);
  });
} else {
  // Fallback when GIF is not available
  k.add([
    k.text("🎬", { size: isMobile ? 100 : 150 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - (isMobile ? 20 : 0)),
    k.z(2),
  ]);
  
  k.add([
    k.text("SONIC ACTION!", { 
      font: "mania", 
      size: isMobile ? 24 : 32,
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + (isMobile ? 40 : 60)),
    k.color(255, 215, 0),
    k.z(2),
  ]);
}

  // Fun bouncing Sonic text
  const sonicText = k.add([
    k.text("💨 GOTTA GO FAST! 💨", { 
      font: "mania", 
      size: isMobile ? 16 : 24,
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + (isMobile ? 180 : 350)),
    k.color(0, 200, 255),
    k.z(2),
  ]);

  sonicText.onUpdate(() => {
    sonicText.pos.y = k.center().y + (isMobile ? 180 : 350) + k.wave(-10, 10, k.time() * 3);
  });

  const backBtn = k.add([
    k.rect(isMobile ? 200 : 250, isMobile ? 50 : 60, { radius: 8 }),
    k.pos(k.center().x, k.height() - (isMobile ? 50 : 60)),
    k.anchor("center"),
    k.area(),
    k.color(255, 50, 100),
    k.outline(4, k.rgb(255, 255, 255)),
    k.z(2),
    "button",
  ]);

  k.add([
    k.text("BACK TO MENU", { font: "mania", size: isMobile ? 20 : 28 }),
    k.pos(k.center().x, k.height() - (isMobile ? 50 : 60)),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.z(3),
  ]);

  // Floating rings animation
  for (let i = 0; i < 5; i++) {
    const floatingRing = k.add([
      k.circle(isMobile ? 8 : 12),
      k.pos(k.rand(50, k.width() - 50), k.rand(100, k.height() - 100)),
      k.color(255, 215, 0),
      k.outline(2, k.rgb(255, 165, 0)),
      k.opacity(0.6),
      k.z(0),
    ]);

    floatingRing.onUpdate(() => {
      floatingRing.pos.y += k.wave(-30, 30, k.time() * 2 + i) * k.dt();
      floatingRing.angle += 100 * k.dt();
    });
  }

  backBtn.onClick(() => k.go("menu"));
  
  k.onHover("button", (btn) => {
    btn.scale = k.vec2(1.1);
    k.setCursor("pointer");
  });

  k.onHoverEnd("button", (btn) => {
    btn.scale = k.vec2(1);
    k.setCursor("default");
  });
});

// Settings Scene with Volume Control
k.scene("settings", () => {
  const isMobile = isMobileDevice();
  
  k.add([
    k.rect(k.width(), k.height()),
    k.color(10, 25, 47),
  ]);

  k.add([
    k.text("SETTINGS", { 
      font: "mania", 
      size: isMobile ? 48 : 64,
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.height() * 0.15),
    k.color(255, 215, 0),
  ]);

  // Volume Control
  let volume = getVolume();
  const volumeText = k.add([
    k.text(`Volume: ${Math.floor(volume * 100)}%`, { 
      font: "mania", 
      size: isMobile ? 24 : 32,
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.height() * 0.35),
    k.color(255, 255, 255),
  ]);

  // Volume Slider
  const sliderWidth = isMobile ? 200 : 300;
  const slider = k.add([
    k.rect(sliderWidth, 20, { radius: 10 }),
    k.pos(k.center().x - sliderWidth/2, k.height() * 0.45),
    k.color(100, 100, 100),
    k.area(),
  ]);

  const sliderFill = k.add([
    k.rect(volume * sliderWidth, 20, { radius: 10 }),
    k.pos(k.center().x - sliderWidth/2, k.height() * 0.45),
    k.color(0, 150, 255),
  ]);

  const sliderHandle = k.add([
    k.circle(15),
    k.pos(k.center().x - sliderWidth/2 + volume * sliderWidth, k.height() * 0.45),
    k.color(255, 255, 255),
    k.area(),
    k.outline(2, k.rgb(0, 0, 0)),
    "slider-handle",
  ]);

  // Slider interaction
  let isDragging = false;
  
  sliderHandle.onClick(() => {
    isDragging = true;
  });

  k.onMouseRelease(() => {
    isDragging = false;
  });

  k.onUpdate(() => {
    if (isDragging && k.isMousePressed()) {
      const mouseX = k.mousePos().x;
      const sliderX = k.center().x - sliderWidth/2;
      const newX = Math.max(sliderX, Math.min(sliderX + sliderWidth, mouseX));
      volume = (newX - sliderX) / sliderWidth;
      
      sliderHandle.pos.x = newX;
      sliderFill.width = volume * sliderWidth;
      volumeText.text = `Volume: ${Math.floor(volume * 100)}%`;
      
      // Save and apply volume
      setVolume(volume);
    }
  });

  const backBtn = k.add([
    k.rect(isMobile ? 200 : 250, isMobile ? 50 : 60, { radius: 8 }),
    k.pos(k.center().x, k.height() * 0.85),
    k.anchor("center"),
    k.area(),
    k.color(255, 50, 100),
    k.outline(4, k.rgb(255, 255, 255)),
    "button",
  ]);

  k.add([
    k.text("BACK TO MENU", { font: "mania", size: isMobile ? 20 : 28 }),
    k.pos(k.center().x, k.height() * 0.85),
    k.anchor("center"),
    k.color(255, 255, 255),
  ]);

  backBtn.onClick(() => k.go("menu"));
  
  // Button hover effects
  k.onHover("button", (obj) => {
    obj.scale = k.vec2(1.1);
    k.setCursor("pointer");
  });

  k.onHoverEnd("button", (obj) => {
    obj.scale = k.vec2(1);
    k.setCursor("default");
  });

  // Slider handle hover effects
  sliderHandle.onHover(() => {
    sliderHandle.scale = k.vec2(1.2);
    k.setCursor("pointer");
  });

  sliderHandle.onHoverEnd(() => {
    sliderHandle.scale = k.vec2(1);
    k.setCursor("default");
  });
});

// Main Game Scene
k.scene("game", () => {
  const isMobile = isMobileDevice();
  k.setGravity(3100);

  let gameSpeed = 100;
  let speedBoostActive = false;
  let speedBoostDuration = 0;
  
  k.loop(1, () => {
    gameSpeed += 50;
  });
  
  let score = 0;
  let scoreMultiplier = 0;
  let doubleJumpAvailable = false;
  
  const scoreText = k.add([
    k.text("SCORE: 0", { font: "mania", size: isMobile ? 24 : 48 }),
    k.pos(20, 20),
    k.z(10),
    k.color(255, 215, 0),
  ]);

  const speedText = k.add([
    k.text("SPEED: 100", { font: "mania", size: isMobile ? 20 : 32 }),
    k.pos(20, isMobile ? 50 : 80),
    k.z(10),
    k.color(0, 255, 255),
  ]);

  // Mobile Controls
  if (isMobile) {
    const jumpBtnSize = 100;
    const jumpBtn = k.add([
      k.circle(jumpBtnSize / 2),
      k.pos(k.width() - 120, k.height() - 120),
      k.anchor("center"),
      k.area(),
      k.color(0, 150, 255),
      k.opacity(0.7),
      k.outline(6, k.rgb(255, 255, 255)),
      k.z(15),
      "mobile-jump-btn",
    ]);

    k.add([
      k.text("JUMP", { font: "mania", size: 20 }),
      k.pos(k.width() - 120, k.height() - 120),
      k.anchor("center"),
      k.color(255, 255, 255),
      k.z(16),
    ]);

    // Pulsing effect for mobile button
    jumpBtn.onUpdate(() => {
      const pulse = k.wave(0.7, 0.85, k.time() * 2);
      jumpBtn.opacity = pulse;
    });

    jumpBtn.onClick(() => {
      k.trigger("jump", 1);
    });
  }

  const gameControlsText = k.add([
    k.text(isMobile ? "Tap JUMP Button to Start!" : "Press Space/Click to Jump!", {
      font: "mania",
      size: isMobile ? 20 : 32,
    }),
    k.anchor("center"),
    k.pos(k.center()),
    k.z(10),
    k.color(255, 255, 255),
    k.opacity(1),
    "game-controls-text",
  ]);

  // Remove text on first action
  let firstAction = true;
  const removeControlsText = () => {
    if (firstAction && gameControlsText.exists()) {
      gameControlsText.opacity = 0;
      k.wait(0.3, () => {
        if (gameControlsText.exists()) k.destroy(gameControlsText);
      });
      firstAction = false;
    }
  };

  // Listen for all jump triggers
  k.onButtonPress("jump", () => {
    removeControlsText();
    k.trigger("jump", 1);
  });

  const bgPieceWidth = 2880;
  const bgPieces = [
    k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.opacity(0.8), k.scale(1.5)]),
    k.add([
      k.sprite("chemical-bg"),
      k.pos(bgPieceWidth, 0),
      k.opacity(0.8),
      k.scale(1.5),
    ]),
  ];

  const platformWidth = 2560;
  const platforms = [
    k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(2)]),
    k.add([k.sprite("platforms"), k.pos(2560, 450), k.scale(2)]),
  ];

  const sonic = makeSonic(k.vec2(100, 100));
  sonic.setControls();
  sonic.setEvents();

  const ringCollectUI = sonic.add([
    k.text("", { font: "mania", size: isMobile ? 14 : 18 }),
    k.color(255, 255, 0),
    k.anchor("center"),
    k.pos(30, -10),
  ]);

  // Boost indicator
  const boostIndicator = k.add([
    k.rect(200, 10, { radius: 5 }),
    k.pos(k.width() / 2 - 100, 20),
    k.color(255, 165, 0),
    k.opacity(0),
    k.z(10),
  ]);

  // Platform collider
  k.add([
    k.rect(1280, 200),
    k.opacity(0),
    k.pos(0, 641),
    k.area(),
    k.body({ isStatic: true }),
  ]);

  // Spawn Rings
  const spawnRing = () => {
    const ring = makeRing(k.vec2(1280, 610));
    ring.onUpdate(() => {
      ring.move(-gameSpeed, 0);
    });
    ring.onExitScreen(() => {
      if (ring.pos.x < 0) k.destroy(ring);
    });

    const waitTime = k.rand(0.5, 3);
    k.wait(waitTime, spawnRing);
  };

  spawnRing();

  // Spawn Motobugs
  const spawnMotoBug = () => {
    const motobug = makeMotobug(k.vec2(1280, 595));
    motobug.onUpdate(() => {
      if (gameSpeed < 3000) {
        motobug.move(-(gameSpeed + 300), 0);
        return;
      }
      motobug.move(-gameSpeed, 0);
    });

    motobug.onExitScreen(() => {
      if (motobug.pos.x < 0) k.destroy(motobug);
    });

    const waitTime = k.rand(0.5, 2.5);
    k.wait(waitTime, spawnMotoBug);
  };

  spawnMotoBug();


  // Spawn Speed Boost Power-up
  const spawnSpeedBoost = () => {
    const boost = k.add([
      k.sprite("sonic-boost"),
      k.area(),
      k.scale(0.15),
      k.anchor("center"),
      k.pos(1280, 580),
      k.offscreen(),
      k.rotate(0),
      "speed-boost",
    ]);

    boost.onUpdate(() => {
      boost.move(-gameSpeed, 0);
      boost.angle += 200 * k.dt();
    });

    boost.onExitScreen(() => {
      if (boost.pos.x < 0) k.destroy(boost);
    });

    const waitTime = k.rand(15, 25);
    k.wait(waitTime, spawnSpeedBoost);
  };

  k.wait(5, spawnSpeedBoost);

  // Ring Collection
  sonic.onCollide("ring", (ring: GameObj) => {
    k.play("ring", { volume: getVolume() });
    k.destroy(ring);
    score++;
    scoreText.text = `SCORE: ${score}`;
    ringCollectUI.text = "+1";
    k.wait(1, () => {
      ringCollectUI.text = "";
    });
  });

  // Speed Boost Collection
  sonic.onCollide("speed-boost", (boost: GameObj) => {
    k.play("hyper-ring", { volume: getVolume() });
    k.destroy(boost);
    speedBoostActive = true;
    speedBoostDuration = 5;
    boostIndicator.opacity = 1;
    gameSpeed += 500;
    
    // Visual effect
    sonic.use(k.color(255, 215, 0));
  });

  // Enemy Collision
  sonic.onCollide("enemy", (enemy) => {
    if (!sonic.isGrounded()) {
      k.play("destroy", { volume: getVolume() });
      k.play("hyper-ring", { volume: getVolume() });
      k.destroy(enemy);
      sonic.play("jump");
      sonic.jump();
      scoreMultiplier += 1;
      score += 10 * scoreMultiplier;
      scoreText.text = `SCORE: ${score}`;
      doubleJumpAvailable = true;
      
      if (scoreMultiplier === 1)
        ringCollectUI.text = `+${10 * scoreMultiplier}`;
      if (scoreMultiplier > 1) ringCollectUI.text = `x${scoreMultiplier}`;
      k.wait(1, () => {
        ringCollectUI.text = "";
      });
      return;
    }

    k.play("hurt", { volume: getVolume() });
    k.setData("current-score", score);
    k.go("game-over");
  });

  // Double Jump System
  k.on("jump", () => {
    removeControlsText();
    
    if (sonic.isGrounded()) {
      sonic.play("jump");
      sonic.jump();
      k.play("jump", { volume: getVolume() });
      doubleJumpAvailable = true;
    } else if (doubleJumpAvailable) {
      sonic.jump(900);
      k.play("jump", { volume: getVolume() * 1.2 });
      doubleJumpAvailable = false;
      
      // Visual feedback
      k.add([
        k.circle(20),
        k.pos(sonic.pos),
        k.color(255, 255, 0),
        k.opacity(0.7),
        k.lifespan(0.3),
        k.z(5),
      ]);
    }
  });

  sonic.onGround(() => {
    scoreMultiplier = 0;
    doubleJumpAvailable = false;
  });

  // Update loop
  k.onUpdate(() => {
    // Background scrolling
    if (bgPieces[1].pos.x < 0) {
      bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth, 0);
      const frontBgPiece = bgPieces.shift();
      if (frontBgPiece) bgPieces.push(frontBgPiece);
    }

    bgPieces[0].move(-100, 0);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth, 0);

    // Platform scrolling
    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(
        platforms[1].pos.x + platformWidth,
        platforms[1].pos.y
      );
      const frontPlatform = platforms.shift();
      if (frontPlatform) platforms.push(frontPlatform);
    }

    platforms[0].move(-gameSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + platformWidth, platforms[0].pos.y);

    // Speed boost duration
    if (speedBoostActive) {
      speedBoostDuration -= k.dt();
      boostIndicator.width = (speedBoostDuration / 5) * 200;
      
      if (speedBoostDuration <= 0) {
        speedBoostActive = false;
        boostIndicator.opacity = 0;
        sonic.use(k.color(255, 255, 255));
      }
    }

    // Update speed display
    speedText.text = `SPEED: ${Math.floor(gameSpeed)}`;
  });
});

// Game Over Scene
k.scene("game-over", () => {
  const isMobile = isMobileDevice();
  let bestScore: number = k.getData("best-score") || 0;
  const currentScore: number | null = k.getData("current-score");

  if (currentScore && bestScore < currentScore) {
    k.setData("best-score", currentScore);
    bestScore = currentScore;
  }

  k.add([
    k.rect(k.width(), k.height()),
    k.color(10, 10, 30),
  ]);

  k.add([
    k.text("GAME OVER", { font: "mania", size: isMobile ? 48 : 64 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 300),
    k.color(220, 20, 60),
  ]);
  
  k.add([
    k.text(`BEST SCORE: ${bestScore}`, {
      font: "mania",
      size: isMobile ? 24 : 32,
    }),
    k.anchor("center"),
    k.pos(k.center().x - (isMobile ? 0 : 400), k.center().y - 200),
    k.color(255, 215, 0),
  ]);
  
  k.add([
    k.text(`CURRENT SCORE: ${currentScore}`, {
      font: "mania",
      size: isMobile ? 24 : 32,
    }),
    k.anchor("center"),
    k.pos(k.center().x + (isMobile ? 0 : 400), k.center().y - (isMobile ? 150 : 200)),
    k.color(0, 255, 255),
  ]);

  k.wait(1, () => {
    const playAgainBtn = k.add([
      k.rect(isMobile ? 250 : 400, isMobile ? 60 : 80, { radius: 8 }),
      k.pos(k.center().x, k.center().y + 100),
      k.anchor("center"),
      k.area(),
      k.color(0, 200, 0),
      k.outline(4, k.rgb(255, 255, 255)),
      "button",
    ]);

    k.add([
      k.text("PLAY AGAIN", { font: "mania", size: isMobile ? 24 : 32 }),
      k.pos(k.center().x, k.center().y + 100),
      k.anchor("center"),
      k.color(255, 255, 255),
    ]);

    const menuBtn = k.add([
      k.rect(isMobile ? 250 : 400, isMobile ? 60 : 80, { radius: 8 }),
      k.pos(k.center().x, k.center().y + 200),
      k.anchor("center"),
      k.area(),
      k.color(50, 50, 200),
      k.outline(4, k.rgb(255, 255, 255)),
      "button",
    ]);

    k.add([
      k.text("MAIN MENU", { font: "mania", size: isMobile ? 24 : 32 }),
      k.pos(k.center().x, k.center().y + 200),
      k.anchor("center"),
      k.color(255, 255, 255),
    ]);

    playAgainBtn.onClick(() => k.go("game"));
    menuBtn.onClick(() => k.go("menu"));
  });
});

// Start with rotate screen check
const isMobile = isMobileDevice();
if (isMobile && isPortrait()) {
  k.go("rotate-screen");
} else {
  k.go("menu");
}