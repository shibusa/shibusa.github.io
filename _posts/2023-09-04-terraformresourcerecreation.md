---
title: "Terraform Resource Creation `count` vs `for_each`"
categories:
  - blog
tags:
  - terraform
---

# [`count`](https://developer.hashicorp.com/terraform/language/meta-arguments/count)
I can only really see this being used to create resources for a given provider with no concerns of destructive behavior against given resources.

HCL syntax of:
```
resource "google_compute_instance" "default" {
  count        = 3
  name         = "my-instance-${count.index}"
  ...
}
```
Translates to state:
```
terraform state list
...
resource.google_compute_instance.default[0]
resource.google_compute_instance.default[1]
resource.google_compute_instance.default[2]
```

In the scenario where you want to retain `default[0]` and `default[2]`, but scale down your instances in code, there's no easy way to do so.

# [`for_each`](https://developer.hashicorp.com/terraform/language/meta-arguments/for_each)
Instead with `for each`  you can iterate through a map or a set of strings.

HCL syntax of:
```
resource "google_compute_instance" "default" {
  for_each     = toset(['0', '1', '2'])
  name         = "my-instance-${each.key}"
  ...
}
```
or
```
resource "google_compute_instance" "default" {
  for_each     = tomap({
    '0' = {}
    '1' = {}
    '2' = {}
  })
  name         = "my-instance-${each.key}"
  ...
}
```
Still translates to the same name in state:
```
terraform state list
...
resource.google_compute_instance.default[0]
resource.google_compute_instance.default[1]
resource.google_compute_instance.default[2]
```

The cherry on top with the latter is you can use the map values to pin the parameters you want for each of the given resources.
