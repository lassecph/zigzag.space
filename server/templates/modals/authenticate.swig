<div id="auth-modal" class="auth-modal">
  <div class="signup animated">
    <form method="post" action="/user" class="signup">
      <input type="hidden" name="_csrf" value="{{_csrf}}" />

      <p>
        <input type="username" name="username" id="username" placeholder="Pick username" />
      </p>

      <p>
        <input type="password" name="password" id="password" placeholder="Password" autocomplete="off"/>
      </p>

      <input type="submit" value="Signup">
    </form>

    <div>
      <a href="/login" data-form="login">Login</a>
      <a href="/forgot" data-form="password">Forgot password?</a>
    </div>
  </div>

  <div class="login animated">
    <form method="post" action="/login" class="login">
      <input type="hidden" name="_csrf" value="{{_csrf}}" />

      <p>
        <input type="text" name="username" id="username" placeholder="Your username" />
      </p>

      <p>
        <input type="password" name="password" id="password" placeholder="Password" autocomplete="off"/>
      </p>

      <input type="submit" value="Login">
    </form>

    <div>
      <a href="/signup" data-form="signup">Signup</a>
      <a href="/forgot" data-form="password">Forgot password?</a>
    </div>
  </div>

  <div class="password animated">
    <form method="post" action="/forgot">
      <input type="hidden" name="_csrf" value="{{_csrf}}" />

      <p>Enter your Username or email address below and we will send you password reset instructions.</p>

      <p>
        <input type="username" name="username" id="username" placeholder="Enter your username or email" />
      </p>

      <input type="submit" value="Reset password">
    </form>

    <div>
      <a href="/signup" data-form="signup">Signup</a>
      <a href="/login" data-form="login">Login</a>
    </div>
  </div>
</div>