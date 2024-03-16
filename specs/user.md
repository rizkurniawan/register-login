# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body : 

```json
{
  "first_name" : "Rizky",
  "last_name" : "Kurniawan",
  "gender" : "m",
  "date_of_birth" : "2001-02-07",
  "phone" : "0811111",
  "email" : "rizky@gmail.com",
  "password" : "rahasia"
}
```

Response Body Success :

```json
{
  "data" : {
    "email" : "rizky@gmail.com",
    "name" : "Rizky Kurniawan"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Email already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "email" : "rizky@gmail.com",
  "password" : "rahasia"
}
```

Response Body Success : 

```json
{
  "data" : {
    "token" : "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Email or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers:
- Authorization : token

Request Body :

```json
{
  "first_name" : "Rizky",
  "last_name" : "Kurniawan",
  "gender" : "m",
  "date_of_birth" : "2001-02-07",
  "phone" : "0811111",
  "email" : "rizky@gmail.com",
  "password" : "rahasia",
}
```

Response Body Success :

```json
{
  "data" : {
    "email" : "rizky123@gmail.com",
    "name" : "Rizky Kurniawan"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :
- Authorization : token

Response Body Success : 

```json
{
  "data" : {
    "name" : "Rizky Kurniawan",
    "gender" : "m",
    "date_of_birth" : "2001-02-07",
    "phone" : "0811111",
    "email" : "rizky@gmail.com",
  }
}
```

Response Body Error :

```json
{
  "errors" : "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors" : "Unauthorized"
}
```