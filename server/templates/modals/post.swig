<div id="create-post" class="create-post">
  <form method="post" action="/p" class="create" enctype="multipart/form-data">
    <input type="hidden" name="_csrf" value="{{_csrf}}" />
    <p>
      <textarea name="text" placeholder="Text"></textarea>
    </p>

    <p>
     <input type="file" name="images" />
    </p>

    <input type="submit" value="Add post">
  </form>
</div>