const api = (function () {
  // pixi settings for pixel art, animation
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
  PIXI.settings.ROUND_PIXELS = true;
  PIXI.settings.TARGET_FPMS = 0.01;

  const CREATURE_URL = "/assets/images/creatures/spritesheetA.json";
  PIXI.Loader.shared.add(CREATURE_URL).load(() => {});

  const colors = {
    default: [0xffffff],
    hands: [0x737450],
    rabbit: [0x78d9e8],
    turtle: [0xff0000],
    bat: [0xff0000],
    water_starter: [0x52b7cc, 0xb3b097],
  };

  function setupAnimatedCreature(app, name, frames = 1, scale = 1) {
    // create it
    const sheet = PIXI.Loader.shared.resources[CREATURE_URL].spritesheet;
    const textures = Array(frames)
      .fill(0)
      .map((_, i) => sheet.textures[`${name}${i}`]);
    const animatedCreature = new PIXI.AnimatedSprite(textures);
    animatedCreature.play();

    // reposition it
    animatedCreature.x = app.screen.width / 2;
    animatedCreature.y = app.screen.height;
    animatedCreature.scale.set(scale);
    animatedCreature.anchor.set(0, 1);

    // add it to the stage
    app.stage.addChild(animatedCreature);
    return animatedCreature;
  }

  // add filters
  function setupFilters(app, creatureName) {
    const colorReplaceFilter = new PIXI.filters.ColorReplaceFilter(
      (colors[creatureName] || colors.default)[0],
      0xff0000,
      0.01
    );
    const hueFilter = new PIXI.filters.ColorMatrixFilter();
    const filters = [colorReplaceFilter, hueFilter];
    app.stage.filters = filters;
    return filters;
  }

  // add to DOM
  function setupContainer(domContainer) {
    const app = new PIXI.Application({
      transparent: true,
      resizeTo: domContainer,
    });
    domContainer.appendChild(app.view);
    return app;
  }

  function addAnimation(app, creatureName, frames) {
    // make sure to clear the stage
    while (app.stage.children[0]) {
      app.stage.removeChild(app.stage.children[0]);
    }
    const isSmallScreen = window.innerWidth < 450;
    //  all 3 stages (A, B and C)
    let stages = ["A", "B", "C"];
    //  2 stages (A and B)
    if (frames.length === 2) stages = stages.slice(0, 2);
    //  1 stage (only B)
    else if (frames.length === 1) stages = stages.slice(1, 2);
    const offsets = [0, 128, 128 * 2.5];

    Array(stages.length)
      .fill(null)
      .forEach((_, i) => {
        const stage = stages[i];
        const offset = offsets[i];
        let creature = setupAnimatedCreature(
          app,
          `shadow_${creatureName}_${stage}`,
          frames[i],
          isSmallScreen ? 2 : 3
        );
        if (isSmallScreen) {
          creature.anchor.set(0.5, 0);
          creature.y = offset;
        } else creature.x = offset;
      });
  }

  function helper(modal, container) {
    let filters;

    const openModal = (rawCreatureInput) => {
      const [creatureName, ...frames] = rawCreatureInput.split(",");
      modal.classList.add("active");
      const app = api.setupContainer(container);
      addAnimation(app, creatureName, frames.map(Number));
      filters = api.setupFilters(app, creatureName);
      document.getElementById("originalColor").value =
        "#" + (colors[creatureName] || colors.default)[0].toString(16);
      document.body.classList.add("modal-open");
    };
    const closeModal = () => {
      modal.classList.remove("active");
      document.body.classList.remove("modal-open");
    };
    function updateHue(event) {
      filters[1].hue(event.value);
    }

    function replaceColor(event) {
      const color = +event.value.replace("#", "0x");
      filters[0][event.id] = color;
    }
    return { openModal, closeModal, updateHue, replaceColor };
  }

  return { setupContainer, setupFilters, helper };
})();
