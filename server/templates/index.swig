{# Homepage Markup #}
{% extends './layouts/default.swig' %}

{% block content %}
<div class="main-container">
  <div class="yeogurt-info">
    <h1>Welcome to YEOGURT.space!</h1>
    <h2>Anonymous social media app: Give a man a mask and you will see his real face.</h2>
    <h3>Loose conversation with people in your city about anything. Rules:</h2>

    <p>1. All content that isn't popular is deleted.</p>
    <p>2. All content that isn't current is deleted.</p>
    <p>3. All comments that isn't popular is deleted.</p>

    <p>Start the conversation and enjoy.</p>

    <p>
      <img src="/images/yeogurt-swirl.png" width="75px" class="logo" />
    </p>

    {% if !geo %}
      <h2>NO GEO</h2>
    {% else %}
      <h2>Velkommen GEO</h2>
      <p>{{geo.city}}</p>
    {% endif %}
  </div>
</div>
<code class="version">v0.14.3</code>
{% endblock %}
