### POST http://34.116.214.228:8080/auth/register

#### request 

```
{
    "username": "adzia4",
    "password": "adzia14",
    "name": "adzia14",
    "surname": "adzia14",
    "email": "adzia@adzia3.pl",
    "roles": "ADMIN",
    "companyName": null,
    "nip": null
}
```
#### response

```
{
    "id": 1,
    "name": "adzia4",
    "username": "adzia@adzia3.pl",
    "surname": "adzia14",
    "email": "adzia@adzia3.pl",
    "companyName": null,
    "nip": null,
    "roles": [
        {
            "id": 2,
            "name": "USER"
        }
    ],
    "description": null,
    "company": false
}
```

POST http://34.116.214.228:8080/auth/login
#### request
```
{
    "username": "adzia@adzia3.pl",
    "password": "adzia14"
}
```
#### response
```
{
    "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZHppYUBhZHppYTMucGwiLCJpYXQiOjE3MDg0NDk5NzYsImp0aSI6IjEiLCJleHAiOjE3MDg1MzYzNzYsInVzZXJEZXRhaWxzIjoie1wiaWRcIjoxLFwibmFtZVwiOlwiYWR6aWE0XCIsXCJzdXJuYW1lXCI6XCJhZHppYTE0XCIsXCJlbWFpbFwiOlwiYWR6aWFAYWR6aWEzLnBsXCIsXCJhdXRob3JpdGllc1wiOlt7XCJhdXRob3JpdHlcIjpcIlVTRVJcIn1dLFwiY29tcGFueU5hbWVcIjpudWxsLFwibmlwXCI6bnVsbCxcImVuYWJsZWRcIjp0cnVlLFwidXNlcm5hbWVcIjpcImFkemlhQGFkemlhMy5wbFwiLFwiY29tcGFueVwiOmZhbHNlLFwiYWNjb3VudE5vbkV4cGlyZWRcIjp0cnVlLFwiYWNjb3VudE5vbkxvY2tlZFwiOnRydWUsXCJjcmVkZW50aWFsc05vbkV4cGlyZWRcIjp0cnVlfSJ9.D3A_jghI-UIaimjfM8H0vji1PkqJcg4TzvQS9JhWZaEa3q6A8Qyfh150YFYIbwpfGJQW0fATvFiaC33z6PtqBQ",
    "type": "Bearer",
    "id": 1,
    "username": "adzia@adzia3.pl",
    "email": "adzia@adzia3.pl",
    "roles": [
        "USER"
    ]
}
```

GET http://34.116.214.228:8080/user/details/loggedUser
```
{
    "id": 1,
    "name": "adzia4",
    "username": "adzia@adzia3.pl",
    "surname": "adzia14",
    "email": "adzia@adzia3.pl",
    "companyName": null,
    "nip": null,
    "roles": [
        {
            "id": 2,
            "name": "USER"
        }
    ],
    "description": null,
    "company": false
}

```