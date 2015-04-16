<div class="navbar">
  <div class="nav">
    <div class="nav__logo pull-left">
      <a href="/">
        <img src="/images/yeogurt-swirl.png" width="30px" class="nav__logo-image" />
        Yeogurt!
      </a>
    </div>
    <ul class="nav-list pull-right">
       {% if !user %}
        <li class="nav-item">
          <a href='/signup' id="auth-modal-link">Signup or login</a>
        </li>
      {% else %}
        <li class="nav-item">
          <a href='/settings' class="create-post-link">Add post</a>
        </li>
        <li class="nav-item">
          Hello {{user.username}} ({{user.city}}, {{user.country}})
        </li>
        <li class="nav-item">
          <a href='/settings'>My Account</a>
        </li>
        <li class="nav-item">
          <a href='/logout'>Logout</a>
        </li>
      {% endif %}
    </ul>
  </div>
</div>
