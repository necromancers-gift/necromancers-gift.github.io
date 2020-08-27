// Original code taken with permission from : https://github.com/dwilliamson/donw.io/blob/master/public/js/github-comments.js

// use of ajax vs getJSON for headers use to get markdown (body vs body_html)
async function getComments(repo, id) {
  const response = await fetch(
    `https://api.github.com/repos/${repo}/issues/${id}/comments`,
    {
      headers: { Accept: "application/vnd.github.v3.html+json" }
    }
  );
  const data = await response.json();
  return data;
}

function parseComments(comments) {
  if (!Array.isArray(comments)) return [];
  return comments.map(({ created_at, body_html, user }) => {
    const date = new Date(created_at).toUTCString();
    return `
    <div class="tile-icon">
      <div class="example-tile-icon">
        <img src="${user.avatar_url}" class="icon icon-file centered" width="24px"/>
      </div>
    </div>
    <div class="tile-content">
      <p class="tile-title">
      <a href="${user.html_url}">${user.login}</a>
      </p>
      <p class="tile-subtitle">
      ${body_html}
      </p>
    </div>    
    `;
  });
}

async function createComments(repo, id) {
  const container = document.getElementById("blog-comments");
  const comments = await getComments(repo, id);
  const htmlComments = parseComments(comments);
  if (htmlComments.length === 0)
    container.innerHTML = "<i>No comments. Be the first!</i>";
  else {
    htmlComments.forEach(comment => {
      const domComment = document.createElement("div");
      domComment.classList.add("tile");
      domComment.innerHTML = comment;
      container.append(domComment);
    });
  }
}
