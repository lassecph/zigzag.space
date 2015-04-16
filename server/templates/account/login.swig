{% extends '../layouts/default.swig' %}

{% block content %}

<h3>Sign in</h3>
<form method="post" action="/login">
  <input type="hidden" name="_csrf" value="{{_csrf}}" />

  <p>
    <label for="username">Username:</label>
    {{username}}lll
    <input type="text" name="username" id="username" placeholder="Enter your username" />
  </p>

  <p>
    <label for="password">Password:</label>
    <input type="password" name="password" id="password" placeholder="Password" autocomplete="off"/>
  </p>

  <button>Login</button>
  <p><a href="/forgot">Forgot your password?</a></p>
</form>
{% endblock %}
