const api = (function () {
  // pixi settings for pixel art, animation
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
  PIXI.settings.ROUND_PIXELS = true;
  PIXI.settings.TARGET_FPMS = 0.01;

  const CREATURE_URL = "/assets/images/creatures/spritesheet.json";
  PIXI.Loader.shared.add(CREATURE_URL).load(() => {});

  const colors = {
    hands: [0x737450],
    rabbit: [0x78d9e8],
    water_starter: [0x52b7cc, 0xb3b097],
  };

  function setupAnimatedCreature(app, name, scale = 1) {
    // create it
    const sheet = PIXI.Loader.shared.resources[CREATURE_URL].spritesheet;
    const textures = Array(8)
      .fill(0)
      .map((_, i) => sheet.textures[`${name}_${i}`]);
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
      colors[creatureName][0],
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

  function addAnimation(app, creatureName) {
    // make sure to clear the stage
    while (app.stage.children[0]) {
      app.stage.removeChild(app.stage.children[0]);
    }
    const isSmallScreen = window.innerWidth < 450;
    const stages = ["A", "B", "C"];
    const offsets = [0, 128, 128 * 2.5];

    Array(3)
      .fill(null)
      .forEach((_, i) => {
        const stage = stages[i];
        const offset = offsets[i];
        let creature = setupAnimatedCreature(
          app,
          `${creatureName}_${stage}`,
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

    const openModal = (creatureName) => {
      modal.classList.add("active");
      const app = api.setupContainer(container);
      addAnimation(app, creatureName);
      filters = api.setupFilters(app, creatureName);
      document.getElementById("originalColor").value =
        "#" + colors[creatureName][0].toString(16);
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
