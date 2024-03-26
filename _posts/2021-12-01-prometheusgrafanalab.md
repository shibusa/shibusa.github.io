---
title: "Prometheus + Grafana Lab"
header:
  overlay_image: /assets/images/grafana.png
  overlay_filter: 0.80
excerpt: >
  Prometheus + Grafana monitoring via Docker
  <br>
  <br>
  <br>
categories:
  - blog
tags:
  - dockercompose
  - grafana
  - prometheus
  - homelab
---

Here we are, another year into shelter in place.  Maybe it might be a good idea to build a new rig when GPU prices are at an all time high.  Maybe it'd be great to build out prometheus + grafana cluster to collect my system stats as I run benchmarks against it.  Surprisingly, the latter was a bit more sane and overall a fun learning experience.

After a couple revisions, ended up with this:
```
services:
  prometheus:
    container_name: prometheus
    image: prom/prometheus:latest
    volumes:
      - ./configs:/etc/prometheus
      - prometheus-data:/prometheus
    entrypoint: [
      '/bin/prometheus',
      '--config.file=/etc/prometheus/prometheus.yml',
      '--storage.tsdb.path=/prometheus',
      '--storage.tsdb.retention.time=1y',
      '--storage.tsdb.wal-compression',
      '--web.console.libraries=/usr/share/prometheus/console_libraries',
      '--web.console.templates=/usr/share/prometheus/consoles',
      # curl -X POST $(docker inspect prometheus | jq -r ".[].NetworkSettings.Networks.monitoring_default.IPAddress"):9090/-/reload
      '--web.enable-lifecycle'
    ]
    restart: always

  grafana:
    container_name: grafana
    image: grafana/grafana:main-ubuntu
    volumes:
      - ./configs/grafana.yaml:/etc/grafana/provisioning/datasources/grafana.yaml
      - ./dashboards:/etc/grafana/provisioning/dashboards
      - grafana-data:/var/lib/grafana
    environment:
      GF_DEFAULT_INSTANCE_NAME: grafana
      GF_ANALYTICS_FEEDBACKLINKS_ENABLED: false
      GF_ANALYTICS_REPORTING_ENABLED: false
      GF_AUTH_ANONYMOUS_ORG_NAME: ${ORG_NAME}
      GF_PUBLIC_DASHBOARDS_ENABLED: false
      GF_REPORTING_ENABLED: false
      GF_SECURITY_ADMIN_EMAIL: ${ADMIN_EMAIL}
      GF_SECURITY_ADMIN_USER: ${USERNAME}
      GF_SECURITY_ADMIN_PASSWORD: ${PASSWORD}
    restart: always
    depends_on:
      - prometheus

volumes:
  prometheus-data:
    driver_opts:
      type: cifs
      o: 'addr=${STORAGE_ADDR},username=${USERNAME},password=${PASSWORD},file_mode=0600,dir_mode=0600'
      device: '//${STORAGE_ADDR}/${PROMETHEUS_STORAGE_PATH}'
  grafana-data:
    driver_opts:
      type: cifs
      o: 'addr=${STORAGE_ADDR},username=${USERNAME},password=${PASSWORD},file_mode=0600,dir_mode=0600'
      device: '//${STORAGE_ADDR}/${GRAFANA_STORAGE_PATH}'
```

Some takeaways:
- [Secrets](https://docs.docker.com/compose/use-secrets/) are definitely the better way to handle senstive info, but for what I'm trying to do, [.env](https://docs.docker.com/compose/environment-variables/env-file/) is sufficient.
- Considering I'm already running a samba server for backups, I was able to leverage that via [volumes](https://docs.docker.com/storage/volumes/) and persist my container data that way. Made it super easy to restore if my docker host were to experience downtime.
