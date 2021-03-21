# ecommerce-server
API server untuk e-commerce website
It performs standard CRUD actions based on RESTful concept.

This app has :

RESTful endpoint for asset's CRUD operation
JSON formatted response
 

Tech Stack used to build this app :

Node JS
Express JS framework
PostgreSQL
Nodemon
Bycrypt
Cors
Jsonwebtoken
Sequelize
Super
Test
DoteEnv


Global Responses
These responses are applied globally on all endpoints

Response (400 - Bad Request)
{
  "message": "<error message for 400>"
}


Response (401 - Unauthorized)
{
  "message": "<error message for 401>"
}

Response (402 - Payment Required)
{
  "message": "<error message for 402>"
}

Response (403 - Forbiden)
{
  "message": "<your message for 403>"
}

Response (404 - Not found)
{
  "message": "<Invalid email or password>"
}

Response (500 - Internal Server Error)
{
  "message": "<Internal server error>"
}
 

RESTful endpoints
GET /products
Get all products

Request Header

{
  "access_token": "<your access token>"
}
Request Body

not needed
Response (200)

[
  {
    "id": 1,
    "name": "<asset name>",
    "imageUrl": "<asset imageUrl>",
    "price": "<price>",
    "stock": "<stock>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "name": "<asset name>",
    "imageUrl": "<asset imageUrl>",
    "price": "<price>",
    "stock": "<stock>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]

POST /products
Create new products

Request Header

{
  "access_token": "<your access token>"
}
Request Body

{
  "name": "<asset name>",
  "imageUrl": "<asset imageUrl>",
  "price": "<price>",
  "stock": "<stock>"
}
Response (201 - Created)

{
  "id": <given id by system>,
  "name": "<posted name>",
    "imageUrl": "<asset imageUrl>",
    "price": "<price>",
    "stock": "<stock>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}


PUT /products/:id
Update an product defined by the id provided

Request Header

{
  "access_token": "<your access token>"
}
Request Body
{
  "name": "<asset name>",
  "imageUrl": "<asset imageUrl>",
  "price": "<price>",
  "stock": "<stock>"
}

Response (200 - OK)

{
    "id": <given id by system>,
    "name": "<posted name>",
    "imageUrl": "<asset imageUrl>",
    "price": "<price>",
    "stock": "<stock>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}



DELETE /products/:id
Delete an products defined by the id provided

Request Header

{
  "access_token": "<your access token>"
}
Request Bodyls
not needed

{
  "message": "asset successfully deleted"
}