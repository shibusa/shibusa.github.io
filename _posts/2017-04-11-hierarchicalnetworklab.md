---
title: "Hierarchical Network Lab"
layout: splash
header:
  overlay_image: /assets/images/networktopology.png
  overlay_filter: 0.80
  actions:
    - label: "<i class='fab fa-fw fa-github'></i> Repo"
      url: "https://github.com/shibusa/networklab"
excerpt: >
    Topology designed in GNS3 using c3725 images and deployed with [cluster](https://github.com/shibusa/cluster)
categories:
  - blog
tags:
  - cisco
  - freshbootcampgrad
  - networking
---

Main topology (excluding management network) designed with redundancy across all layers.  Access layer requires bonded interfaces set on host level and secondary access switch pair for full redundancy.  Distribution layer acts as VRRP gateway for access layer and connects to core layer with OSPF.  Distribution node x0 acts as RSTP primary root bridge with node x1 as secondary root bridge.  Each distribution node has OSPF multipath enabled with paths to each core node on a seperate network range.  Each core node acts as a designated router for the respective network range.