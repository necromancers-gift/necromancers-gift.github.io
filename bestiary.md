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
  .container > .columns > .column {
    min-width: calc(450px + 2rem);
    margin: 0;
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
    {% assign key = creature[0] %}
      <h4>{{ site.data.creatures.names[key] | join: ' > ' | default : "???" }}</h4>
      <img src="/assets/images/creatures/{{ creature | first }}_anim_final.gif" loading="lazy" alt="">
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
      <img src="/assets/images/creatures/{{ creature | first }}_anim_final.gif" loading="lazy" alt="">
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
      <img src="/assets/images/creatures/{{ creature | first }}_anim_final.gif" loading="lazy" alt="">
    </div>
  {% endfor %}
  </div>
</div>
