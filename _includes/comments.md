{% if page.github_comments_id and site.github_issues_repository %}

<script src="{{ site.baseurl }}/js/github-comments.js"> </script>

<noscript>Please enable JavaScript to view comments.</noscript>

<form 
  action="https://github.com/{{site.github_issues_repository}}/issues/{{page.github_comments_id}}#new_comment_field"
  rel="nofollow"
  target="_blank"
>
<button class="btn" style="margin: 1.5rem 0;">Add Comment</button>
<form>
<div id="blog-comments" >
</div>
<script type="text/javascript"> 
  createComments("{{ site.github_issues_repository }}", {{ page.github_comments_id }})
</script>

{% endif %}
