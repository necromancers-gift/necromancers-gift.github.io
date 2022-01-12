{% if page.github_comments_id and site.github_issues_repository %}

<noscript><i>Please enable JavaScript to view comments.</i></noscript>

<div style="display: flex; gap: 1rem;">
  <button
    class="btn"
    type="button"
    style="margin: 1.5rem 0;"
    onclick="loadScript('/js/github-comments.js', function(){
    createComments('{{ site.github_issues_repository }}', {{ page.github_comments_id }})
    })">
    Load Comments <span style="font-size: 14px">(uses cookies)</span>
  </button>
  <form
    action="https://github.com/{{site.github_issues_repository}}/issues/{{page.github_comments_id}}#new_comment_field"
    rel="nofollow"
    target="_blank"
  >
  <button class="btn" type="submit" style="margin: 1.5rem 0;">Add Comment</button>
  </form>
</div>
<div id="blog-comments" >
</div>

<script async>
  function loadScript(fileName, callback){
    var scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.onload = callback;
    scriptElement.src = fileName;
    document.head.appendChild(scriptElement);
  }
</script>

{% endif %}
