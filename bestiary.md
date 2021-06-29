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
      <img src="/assets/images/creatures/{{ creature | first }}_anim_final.gif"
       loading="lazy"
       alt="" onclick="openModal('{{ creature | join: ',' }}')"
       >
    </div>
  {% endfor %}
  </div>
  <h1>revealed creatures</h1>
  <div class="columns">
  {% for creature in site.data.creatures.bestiary %}
    <div class="column col-mx-auto">
    {% assign key = creature[0] %}
      <h4>{{ site.data.creatures.names[key] | join: ' > '  }}</h4>
    {% if creature[1][0] %}
      <img src="/assets/images/creatures/{{ creature | first }}_anim_final.gif" loading="lazy" alt="" onclick="openModal('{{ creature | join: ',' }}')">
    {% endif %}
    </div>
  {% endfor %}
  </div>
  <h1>legendaries</h1>
  <div class="columns">
  {% for creature in site.data.creatures.legendaries %}
    <div class="column col-mx-auto">
    {% assign key = creature[0] %}
      <h4>{{ site.data.creatures.names[key] | join: ' > '  }}</h4>
      <img src="/assets/images/creatures/{{ creature | first }}_anim_final.gif"
       loading="lazy"
       alt="" onclick="openModal('{{ creature | join: ',' }}')">
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

<script async src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js"></script>

<script async>
  function loadScript(fileName, callback){
    var scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.onload = callback;
    scriptElement.src = fileName;
    document.head.appendChild(scriptElement);
  }
  window.onload = function(){
    loadScript("https://cdn.jsdelivr.net/npm/pixi-filters@latest/dist/pixi-filters.js");
    loadScript("/js/creature_animations.js", function(){
      var modal = document.getElementById("bestiary-modal");
      var container = document.getElementById("example-container");
      var helpers = api.helper(modal, container);
      var props = ["openModal", "closeModal", "updateHue", "replaceColor"];
      for(i=0; i < props.length; i+=1){
        var prop = props[i];
        window[prop] = helpers[prop];
      }
    });
  }
</script>
