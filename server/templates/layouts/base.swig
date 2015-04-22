{#
  Base template
  All other templates should extend from this
#}

{# [injector:swig] #}
{# [endinjector] #}

<!DOCTYPE html>
  <html lang="en" class="no-js">
  <head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <title>{{titel}} | ZigZag.space!</title>
    <meta name="description" content=""/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="csrf-token" content="{{_csrf}}" />
    <link rel="stylesheet" href="/styles/main.css">
    {% if user %}
      <meta name="loggedin" content="true" />
    {% else %}
      <meta name="loggedin" content="false" />
    {% endif %}
  </head>
  <body>
    <div class="body-wrapper">
      {% block layout %}
      {% block content %}{% endblock %}
      {% endblock %}

      {% include '../partials/footer.swig' %}
    </div>

    {% include '../modals/loading.swig' %}
    {% include '../modals/message.swig' %}
    {% include '../modals/post.swig' %}
    {% include '../modals/authenticate.swig' %}

    {% if env == 'development' %}
    <!-- build:js(client) scripts/global.js -->
    <!-- bower:js -->
    <script src="/scripts/vendor/zepto.js"></script>
    <script src="/bower_components/Cookies/dist/cookies.js"></script>
    <script src="/scripts/vendor/easymodal.js"></script>

    <script src="/scripts/modals/loading.js"></script>
    <script src="/scripts/modals/message.js"></script>
    <script src="/scripts/modals/auth.js"></script>
    <script src="/scripts/modals/post.js"></script>
    <script src="/scripts/misc/comment.js"></script>
    <script src="/scripts/misc/delete.js"></script>
    <script src="/scripts/misc/geocookies.js"></script>
    <script src="/scripts/misc/header.js"></script>
    <!-- endbower -->
    <!-- endbuild -->
    {% else %}
      <script src="/scripts/global.js"></script>
    {% endif %}
  </body>
</html>
