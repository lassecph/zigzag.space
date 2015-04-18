<div id="comment-{{comment.id}}" class="comment">
  <div class="comment-likes">
    
  </div>
  <div class="comment-header">
    <span class="post-timeago">{{comment|timeAgo}}</span> - 
    <a href="/u/{{comment.user.username}}" title="View {{comment.user.username}}" class="comment-user">{{comment.user.username}}</a> -
    <a href="#comment-{{comment.id}}" title="Permalink to comment">link</a>
  </div>
  <p><b>{{comment.hierarchyLevel}}: </b>{{comment.text|textToHTML}}</p>
  <div class="comment-reply">
    <a href="/c" class="comment-reply-link" title="Leave a reply" data-parentId="{{comment.id}}" data-postId="{{comment.postId}}">Reply</a>
  </div>
</div>