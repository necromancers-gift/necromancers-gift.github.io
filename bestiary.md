---
layout: bare
---

<style>
  img{
    object-fit: cover;
    width: 450px;
    height: 210px;
    margin: 1rem;
  }
  #bestiary-modal > .modal-overlay{
    background: transparent;
    backdrop-filter: blur(5px);
  }
  #bestiary-modal p{
    color: #2b2b2b;
  }
  #example-container{
    width: 100%;
    height: 280px;
  }
  body{
    overflow-x: hidden;
  }
  body.modal-open{
    overflow: hidden;
    position: fixed;
  }

  @media screen and (max-width: 1072px ) {
    body, .container{
      padding: 0 0.6rem;
      margin: 0;
    }
    .container > .columns {
      flex-direction: column;
    }
    img{
      width: 85vw;
      height: 18vh;
      margin: 0rem;
    }
    #example-container{
      width: 100%;
      height: 600px;
    }
  }
</style>

<div class="container bestiary-summary">
  <h1>starters</h1>
  <div class="columns">
  {% for creature in site.data.creatures.starters %}
    <div class="column col-mx-auto">
      <img src="/assets/images/creatures/{{ creature | first }}_anim_final.gif" alt="" onclick="openModal('{{ creature | join: ',' }}')">
    </div>
  {% endfor %}
  </div>
  <h1>revealed creatures</h1>
  <div class="columns">
  {% for creature in site.data.creatures.bestiary %}
    <div class="column col-mx-auto">
    {% assign key = creature[0] %}
      <h4>{{ site.data.creatures.names[key] | join: ' > '  }}</h4>
      <img src="/assets/images/creatures/{{ creature | first }}_anim_final.gif" alt="" onclick="openModal('{{ creature | join: ',' }}')">
    </div>
  {% endfor %}
  </div>

<div class="modal modal-lg" id="bestiary-modal">
  <a href="" class="modal-overlay" aria-label="Close" onclick="closeModal()"></a>
  <div class="modal-container">
    <div class="modal-header">
      <button class="btn btn-clear float-right" onclick="closeModal()"></button>
      <div class="modal-title h5">Creature Details</div>
    </div>
    <div class="modal-body">
      <div class="content">
      <p style="color:#2b2b2b">Use the sliders and color selectors to make intis(shinies) </p>
        <div id="example-container">
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
