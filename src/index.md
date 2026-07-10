---
layout: base.liquid
permalink: "/"
templateEngineOverride: liquid
---
<h2>Hello, I'm Vito 👋</h2>
<p>I am a Notre Dame Alumnus from St. Louis, Missouri. Currently, I'm a Software Developer at <a href="https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html">AWS Organizations</a>.</p>
<p>You can reach me at <a href="mailto:vitolin1000@gmail.com">vitolin1000@gmail.com</a>!</p>

<h3>Posts</h3>
<ul class="post-list">
{% for post in collections.post reversed %}
  <li>
    <div class="post-preview">
      {% postPreview post %}
      <div class="post-preview-content">
        <h3 class="post-preview-title"><a href="{{ post.url }}">{{ post.data.title }}</a></h3>
        <p class="post-preview-date">{{ post.date | date: "%Y-%m-%d" }}</p>
        {% if post.data.description %}
          <p class="post-preview-description">{{ post.data.description }}</p>
        {% endif %}
      </div>
    </div>
  </li>
{% endfor %}
</ul>
