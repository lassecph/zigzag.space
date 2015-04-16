{% extends '../layouts/default.swig' %}

{% block content %}
  <main class="post-wrapper">
    <section class="post cf" id="post">
      <div>
        <header id="post-header" class="post-header">
          <p>{{post.text}}</p>
        </header>
        <footer>
          <p>By: {{post.username}} - {{post.createdAt|date('F jS, Y')}}</p>
        </footer>
        <p>{{post.text}}</p>
        <p>{{post.image}}</p>
        <p>{{post.city}}</p>
        <p>{{post.area}}</p>
        <p>{{post.country}}</p>
      </div>
    </section>
    <div id="comments" class="comments cf">
      {% include 'comment.swig' %}
    </div>
  </main>
{% endblock %}
