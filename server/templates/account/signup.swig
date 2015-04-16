{% extends '../layouts/default.swig' %}

{% block content %}

<h3>Sign up</h3>
<form id="signup-form" method="post" action="/user">
  <input type="hidden" name="_csrf" value="{{_csrf}}" />

  <p>
    <label for="username">Username:</label>
    <input type="username" name="username" id="username" placeholder="Username" />
  </p>
  
  <p>
    <label for="password">Password:</label>
    <input type="password" name="password" id="password" placeholder="Password" autocomplete="off"/>
  </p>
  
  <input type="submit" value="Signup">
</form>

{% endblock %}
