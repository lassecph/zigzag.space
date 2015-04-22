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
          <a href="/signup" id="auth-modal-link">Signup or login</a>
        </li>
      {% else %}
        <li class="nav-item">
          <a href="/settings" class="create-post-link">Add post</a>
        </li>
        <li class="nav-item">
          <a href="/" id="header-userdropdown-link">{{user.username}}</a>
          <div id="header-userdropdown" class="hidden animated">
            <ul>
              <li class="nav-item">
                <a href="/u/{{user.username}}">Profile</a>
              </li>
              <li class="nav-item">
                <a href="/settings">Settings</a>
              </li>
              <li class="nav-item">
                <a href="/logout">Logout</a>
              </li>
            </ul>
          </div>
        </li>
      {% endif %}
    </ul>
  </div>
</div>
