## Description
````
A simple nodejs api, using framework express
````

## Installation

```bash
$ npm install
```

## Example requests
## Examples for REST CLIENT in vsCode

```bash
GET http://localhost:3333/products

GET http://localhost:3333/products/:id

POST http://localhost:3333/products
Content-Type: application/json

{
  "name": "mouse2",
  "price": 90.00
}

PUT http://localhost:3333/products/:id
Content-Type: application/json

{
  "name": "keyboard",
  "price": 120.00
}

DELETE http://localhost:3333/products/:id
```