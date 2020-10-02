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

  function setupAnimatedCreature(app, name) {
    // create it
    const sheet = PIXI.Loader.shared.resources[CREATURE_URL].spritesheet;
    const textures = Array(8)
      .fill(0)
      .map((_, i) => sheet.textures[`${name}_${i}`]);
    const animatedCreature = new PIXI.AnimatedSprite(textures);
    animatedCreature.play();

    // reposition it
    animatedCreature.y = app.screen.height;
    animatedCreature.scale.set(3);
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
    let creature = setupAnimatedCreature(app, `${creatureName}_A`);
    creature.x = 0;
    creature = setupAnimatedCreature(app, `${creatureName}_B`);
    creature.x = 128;
    creature = setupAnimatedCreature(app, `${creatureName}_C`);
    creature.x = 128 * 2.5;
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
    };
    const closeModal = () => modal.classList.remove("active");

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
