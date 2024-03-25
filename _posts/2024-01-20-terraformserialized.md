---
title: "Terraform and parameter serialization"
categories:
  - blog
tags:
  - terraform
  - json
  - yaml
---

While terraform is a great for managing infrastructure, programatically maintaining HCL can be quite cumbersome. Hence, I'd like to opt for serialized formats instead.

# JSON configuration syntax
- [JSON configuration syntax](https://developer.hashicorp.com/terraform/language/syntax/json)

The JSON syntax provides a bit nicer way of abstracting the HCL syntax, but can still be a bit cumbersome to read and design around.

# *decode built-in function
- [`jsondecode`](https://developer.hashicorp.com/terraform/language/functions/jsondecode)
- [`yamldecode`](https://developer.hashicorp.com/terraform/language/functions/yamldecode)

I've found this to be a decent middleground. You utilize the HCL native syntax to define how resources are created and have it ingest a separate serialized format which stores the resource parameters instead. This allows for flexibility in just updating the TF business logic and maintaining resource names.