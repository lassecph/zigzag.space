{% extends '../layouts/default.swig' %}

{% block content %}
  <main class="post-wrapper">
    <section class="post cf" id="post">
      {% if deletedAt %}
        <p>Sorry, post deleted.</p>
      {% else %}
        <div>
          {% if post.image && post.text %}
          <div class="image-text">
          {% elseif post.image %}
          <div class="image-only">
          {% elseif post.text %}
          <div class="text-only">
          {% endif %}
          <div class="post-text">
            <p>{{post.text|textToHTML}}</p>
          </div>
            <div>
              UP/DOWN
            </div>
            <footer class="post-meta">
              <p>
                <span class="post-timeago">{{post|timeAgo}}</span> - 
                <a href="/u/{{post.user.username}}" title="View {{post.user.username}}" class="post-user">{{post.user.username}}</a>
                <span class="post-geo">({{post.city.city}}, {{post.city.country}})</span>
                {% if post.user.id === user.id %}
                  <span class="post-crud">
                    <a href="/p" title="Edit post" data-type="post" data-id="{{post.id}}" class="delete-link">delete post</a>
                  </span>
                {% endif %}
              </p>
            </footer>
          </div>
        </div>
      {% endif %}
        <div>
          <div id="comments" class="comments cf">
            <p class="post-comment-count">Comments ({{post.commentCount}})</p>
            <div id="">
              <form action="/c" method="post" class="main-form">
                <input type="hidden" name="_csrf" value="{{_csrf}}" />
                <input type="hidden" name="postId" value="{{post.id}}" />
                <textarea name="text"></textarea>
                <input type="submit" value="Add comment"> 
              </form>
            </div>
          <div id="comments-roll" class="comments-roll">
            {% if comments %}
              {{comments|renderComment}}
            {% else %}
              <p>No comments yet!</p>
            {% endif %}
          </div>
        </div>
      </div>
    </section>
  </main>
{% endblock %}
