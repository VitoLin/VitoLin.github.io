---
layout: base.liquid
permalink: "/"

---

{% for post in collections.post %}
{{ post.date | date: "%Y-%m-%d" }} - <a href="{{ post.url }}">{{ post.data.title }}</a>
{% endfor %}
