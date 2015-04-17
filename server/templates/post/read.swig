{% extends '../layouts/default.swig' %}

{% block content %}
  <main class="post-wrapper">
    <section class="post cf" id="post">
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
      <div id="comments" class="comments cf">
        {% include 'comment.swig' %}
      </div>
    </section>
  </main>
{% endblock %}
