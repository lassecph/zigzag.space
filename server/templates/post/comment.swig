<div>
  <h3>Comments form</h3>
  <form action="/comment" method="post" class="main-form">
    <input type="hidden" name="_csrf" value="{{_csrf}}" />
    <input type="hidden" name="postId" value="{{post.id}}" />
    {# <input type="hidden" name="parentId" value="552e5645443d34db09be62e4" /> #}

    <textarea name="text"></textarea>
    <input type="submit" value="Add comment"> 
  </form>

  <div id="comment-roll" class="comment-roll">
  {% if comments %}
    {% for comment in comments %}
      <p>{{comment.path}} -- {{comment.parentId}}</p>
    {% endfor %}
  {% else %}
    <p>No comment!</p>
  {% endif %}
  </div>
</div>