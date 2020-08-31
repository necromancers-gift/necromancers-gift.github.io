---
layout: default
---

<h2 style="color: lightgrey">{{ site.data.info.video[page.lang] }}</h2>
<div class="embed-container">
  <iframe
    width="88%"
    height="200%"
    src="https://www.youtube-nocookie.com/embed/_XZnipQivmM?controls=0"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe> 
</div>

<h2 style="color: lightgrey; margin-top: 2rem">{{ site.data.info.info[page.lang].title }}</h2>
{{ site.data.info.info[page.lang].text }}
