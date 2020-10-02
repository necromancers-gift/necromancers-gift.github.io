---
layout: bare
---

<div style="display:flex; flex-wrap:wrap">
  <img src="/assets/images/creatures/rabbit_anim_final.gif" alt="" style="height:150px; margin: 0 1rem;" onclick="openModal('rabbit')">
  <img src="/assets/images/creatures/hands_anim_final.gif" alt="" style="height:150px; margin: 0 1rem;" onclick="openModal('hands')">
</div>

<div class="modal modal-lg" id="bestiary-modal">
  <a href="" class="modal-overlay" aria-label="Close"  style="background: transparent; backdrop-filter: blur(5px);"  onclick="closeModal()"></a>
  <div class="modal-container">
    <div class="modal-header">
      <button class="btn btn-clear float-right" onclick="closeModal()"></button>
      <div class="modal-title h5">Creature Details</div>
    </div>
    <div class="modal-body">
      <div class="content">
      <p style="color:#2b2b2b">Use the sliders and color selectors to make intis(shinies) </p>
        <div id="example-container" style="width: 100%; height: 350px">
        <input class="slider" type="range" min="0" max="360" value="0" onchange="updateHue(this)">
        <input type="color" id="originalColor" name="head" value="#b3b097" onchange="replaceColor(this)">
        <input type="color" id="newColor" name="head" value="#ff0000" onchange="replaceColor(this)">
      </div>
    </div>
    <div class="modal-footer"></div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/pixi-filters@latest/dist/pixi-filters.js"></script>
<script src="/js/creature_animations.js"></script>

<script>
  const modal = document.getElementById("bestiary-modal");
  const container = document.getElementById("example-container");
  const {openModal, closeModal, updateHue, replaceColor}= api.helper(modal, container);

</script>
