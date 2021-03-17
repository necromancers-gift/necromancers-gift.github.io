---
layout: posts
---

  <ul class="breadcrumb">
    <li class="breadcrumb-item">
      <a href="{{ '/' | relative_url }}">Home</a>
    </li>
    {% if page.url != "/" %}
    <li class="breadcrumb-item">
      <a href="{{ page.url | relative_url }}">{{page.title}}</a>
    </li>
    {% endif %}
  </ul>

<div class="blog-post-header"></div>

<h3 class="blog-post-title">{{ page.title }}</h3>
{% assign post = page %}
{% include formatted_date.md %}

<div class="blog-post-content">
  {{ content }}
</div>
{% include comments.md %}
