---
layout: base.liquid
permalink: "/"

---
## Hello, I'm Vito 👋
I am a Notre Dame Alumnus from St. Louis, Missouri. Currently, I'm a Software Developer at [AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html).

You can reach me at [vitolin1000@gmail.com](mailto:vitolin1000@gmail.com)!

### Posts
{% for post in collections.post reversed %}
{{ post.date | date: "%Y-%m-%d" }} - <a href="{{ post.url }}">{{ post.data.title }}</a>
{% endfor %}
