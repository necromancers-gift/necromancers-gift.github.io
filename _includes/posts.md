<div class="panel">
  <div class="panel-body">
{% for post in site.posts %}

  <div class="tile">
    <div class="tile-content">
      <a href="{{ post.url | relative_url }}">
      <h3 class="blog-post-title tile-title">{{ post.title }}</h3>
      </a>
      <p style="color: lightgrey; font-style:italic">
      {{ post.date | date: "%Y/%m/%d"}}</p>
      {% for tag in post.tags %}
      <span class="label">{{ tag }}</span>
      {% endfor %}
      <!-- <p class="tile-subtitle">{{ post.excerpt }}</p> -->
    </div>

  </div>
{% endfor %}
  </div>
</div>
