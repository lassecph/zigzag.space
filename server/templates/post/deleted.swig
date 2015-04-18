{% extends '../layouts/default.swig' %}

{% block content %}
  <main class="post-wrapper">
    <section class="post cf" id="post">
      <div class="post-deleted">
        <p>Sorry, post deleted {{post.deletedAt|timeAgo}}.</p>
      </div>
      <div id="comments" class="comments cf">
        {% include 'comment.swig' %}
      </div>
    </section>
  </main>
{% endblock %}
