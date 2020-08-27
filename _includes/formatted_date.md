<h6 class="blog-post-subtitle">
<!-- Show the date -->
  {% assign day = post.date | date: "%-d" %}
  {% assign ending = "th" %}
  {% case day %}
    {% when '1' or '21' or '31' %}{% assign ending = "st" %}
    {% when '2' or '22' %}{% assign ending = "nd" %}
    {% when '3' or '23' %}{% assign ending = "rd" %}
    {% endcase %}
  {% assign date_end = post.date | date: ", %Y" %}
  {{ post.date | date: "Posted on %B %-d" | append: ending  | append: date_end }}
</h6>
