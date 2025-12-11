---
title: "Sample Post"
date: 2025-12-05
tags: post
permalink: "/sample-post/"
---

# Sample Post
Published: {{ page.date | date: "%Y-%m-%d" }}
[[toc]]

## Overview

This is a sample post to demonstrate a basic Liquid template and the site's layout.

### Content


{% dice %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac sapien enim. Donec dapibus ex a quam iaculis, ac venenatis sem mollis. In sed erat eget orci placerat dapibus imperdiet quis elit. Mauris turpis eros, placerat in nisl ac, placerat sollicitudin lorem. Vestibulum et hendrerit diam. Nunc ultrices lacinia magna, at fermentum urna varius sed. Duis eget placerat ex. Fusce mollis, ligula ut consectetur maximus, neque tortor iaculis nulla, non imperdiet mi neque vel erat. Aenean dignissim magna quam, ut varius dui varius scelerisque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam accumsan, diam quis tincidunt vestibulum, dolor justo iaculis mauris, eu consectetur risus nunc id sem. Aliquam pharetra non elit nec iaculis. Vestibulum et ante vel libero tempor malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent sagittis non eros sed semper.

{% scroll %}

Curabitur tincidunt dolor leo, id auctor turpis egestas eu. Sed nec libero ante. Morbi ac erat a massa semper convallis. Aenean a nisi in leo feugiat tristique. Vivamus dapibus erat lorem, volutpat efficitur turpis suscipit ac. Suspendisse nec nulla bibendum, congue tellus eu, vulputate nisi. Mauris vitae leo eu diam hendrerit eleifend pretium cursus lacus. Praesent a arcu ultricies, eleifend lorem nec, molestie ligula. Suspendisse vulputate sem non fringilla rhoncus. Vivamus sem sem, dictum at porttitor ac, tincidunt ac metus.

Donec iaculis consectetur gravida. Nam id elementum elit. Donec vehicula magna sed lorem porta scelerisque. In vestibulum orci a pulvinar tempus. Ut pretium, mauris vitae volutpat ultrices, magna nulla porta lectus, at varius arcu nibh ut nibh. Phasellus tincidunt, turpis sed dictum tincidunt, ex est ullamcorper ipsum, ac fringilla purus ante vitae sapien. Aliquam in neque non nunc hendrerit efficitur. Ut scelerisque efficitur est sed vehicula. Quisque in finibus nisl, ac efficitur massa. Quisque vehicula tincidunt dui, eget auctor elit ornare a. Vestibulum sollicitudin ut mauris eu pellentesque. Aenean vel maximus odio, vel pretium augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet viverra mollis. Quisque laoreet commodo dui, semper dignissim ex mattis fringilla.

Donec tincidunt est sed elit sodales fringilla. Morbi vel urna commodo, rhoncus lorem tincidunt, laoreet ligula. Etiam ac leo sollicitudin, suscipit turpis at, tincidunt odio. Vestibulum eget neque nisi. Praesent pulvinar ut arcu sit amet pulvinar. Praesent dignissim nisi et pellentesque placerat. Donec egestas tortor nec aliquam rutrum. Maecenas posuere sodales velit dapibus tristique. Nunc in ullamcorper odio.

Nulla commodo purus ut eros luctus mattis. Integer id ultrices eros. Fusce ipsum lorem, elementum eu elementum sit amet, pellentesque id libero. Pellentesque a rutrum ligula. Pellentesque in ipsum nulla. Suspendisse ipsum arcu, blandit ut hendrerit a, posuere eget eros. Aliquam dictum magna eget tincidunt consequat. 

{% cube %}

## Conclusion
This is a test

```
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        d = dict()

        for i, n in enumerate(nums):
            diff = target - n
            if diff in d:
                return i, d[diff]
            d[n] = i
```
