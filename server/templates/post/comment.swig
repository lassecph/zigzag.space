{% for comment in comments %}
  <div class="comment-parent">
    <div class="comment">
      <div class="comment-likes">
        
      </div>
      <div class="comment-header">
        
      </div>
      <p>{{comment.text|textToHTML}}</p>
    </div>
    <b>{{comment.id}}</b>
    <div class="comment-child">
      {% if comment.children %}
        {% for comment in comment.children %}
           <b>{{comment.user.username}}</b>
          <div class="comment-child">
          {% if comment.children %}
            {% for comment in comment.children %}
            <b>{{comment.id}}</b>
            {% endfor %}
          {% endif %}
          </div>
        {% endfor %}
      {% endif %}
    </div>
  </div>
{% endfor %}