# Alembics-TASK
Technology Used:

Node.js
Express.js
MongoDB

***How to run code***
(set your local db URL in .env file)

step 1: npm i

step 2 : npm start

## API Reference

### AUTH

1. register user

  * url : {{url}}/client/auth/register
  * request type : POST
  * request body: {
                    "email": "tarparaajay+1@gmail.com",
                    "password": "Ajay@1234567",
                    "firstName": "Test",
                    "lastName": "User",
                    "phoneNo": "1123456789"
                }
  * response : {
                    "status": "SUCCESS",
                    "message": "Your request is successfully executed",
                    "data": {
                        "_id": "622d1f236e7d77807fa4f9b1",
                        "email": "tarparaajay+1@gmail.com",
                        "password": "$2b$08$z.Ffp03ziSEnNH6e2u2Ac.kt6M1ifLE1FfyMhdqoRT0qMUcjtOi8S",
                        "firstName": "Test",
                        "lastName": "User",
                        "phoneNo": "1123456789",
                        "isDeleted": false,
                        "isActive": true,
                        "id": "622d1f236e7d77807fa4f9b1"
                    }
                } 

2. login

  * url : {{url}}/client/auth/login
  * request type : POST
  * request body: {
                    "username": "tarparaajay+1@gmail.com",
                    "password": "Ajay@1234567"
                }
  * response : {
                    "status": "SUCCESS",
                    "message": "Login Successful",
                    "data": {
                        "_id": "622d1f236e7d77807fa4f9b1",
                        "email": "tarparaajay+1@gmail.com",
                        "firstName": "Test",
                        "lastName": "User",
                        "phoneNo": "1123456789",
                        "isDeleted": false,
                        "isActive": true,
                        "id": "622d1f236e7d77807fa4f9b1",
                        "token": {
                            "access": {
                                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDcxMjQyNjUsImV4cCI6MTY0NzEyNzg2NSwiZGF0YSI6eyJ1c2VySWQiOiI2MjJkMWYyMzZlN2Q3NzgwN2ZhNGY5YjEifX0.gV3nSE7dSoygJFrqyXReTNjDKLfHtB87tCkeD12owJ8",
                                "expires": "2022-03-12T23:31:05.931Z"
                            },
                            "refresh": {
                                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDcxMjQyNjUsImV4cCI6MTY0NzEzMTQ2NSwiZGF0YSI6eyJ1c2VySWQiOiI2MjJkMWYyMzZlN2Q3NzgwN2ZhNGY5YjEifX0.kx8dafbWCzG96EdqVn5NbmoF5f_hUPJYOYMIcp7bRWU",
                                "expires": "2022-03-13T00:31:05.933Z"
                            }
                        }
                    }
                }

### DREAM TOKEN

1. entry of dream Token

  * url : {{url}}/client/api/v1/token/create
  * request type : POST
  * auth Token : Bearer {{token}}
  * request body: {
                    "tokenAmount": 0.00000000000001133232323
                  }
  * response : {
                "status": "SUCCESS",
                "message": "Your request is successfully executed",
                "data": {
                    "_id": "622deded8d2edb4a3e851196",
                    "tokenAmount": {
                        "$numberDecimal": "1.133232323E-14"
                    },
                    "user": "622cfb1e27ab1a496b767ba9",
                    "tokenInUsd": {
                        "$numberDecimal": "1.6998484845E-15"
                    },
                    "createdAt": "2022-03-13T13:13:17.691Z",
                    "updatedAt": "2022-03-13T13:13:17.691Z",
                    "__v": 0
                }
            }


### USER CONTROL

1. win of the day history (***POINT 2***)
  * url : {{url}}/client/api/v1/user/win_of_the_day
  * request type : GET
  * auth Token : Bearer {{token}}
  * response : {
                "status": "SUCCESS",
                "message": "Your request is successfully executed",
                "data": {
                    "tokenWinTodayHistory": [
                        {
                            "_id": "2022-03-13T12:13:55.655Z",
                            "totalAmount": {
                                "$numberDecimal": "1.0000000000043525"
                            }
                        },
                        {
                            "_id": "2022-03-13T12:13:58.985Z",
                            "totalAmount": {
                                "$numberDecimal": "2.0000000000043525"
                            }
                        },
                        {
                            "_id": "2022-03-13T12:15:07.316Z",
                            "totalAmount": {
                                "$numberDecimal": "1"
                            }
                        }
                    ]
                }
            }

2. earning history in USD (***POINT 3***)
  * url : {{url}}/client/api/v1/user/earning_history_usd
  * request type : GET
  * auth Token : Bearer {{token}}
  * response : {
                    "status": "SUCCESS",
                    "message": "Your request is successfully executed",
                    "data": {
                        "dayWiseEarnInUsd": [
                            {
                                "totalAmount": {
                                    "$numberDecimal": "0.15"
                                },
                                "date": "2022-03-11T12:15:07.316Z"
                            },
                            {
                                "totalAmount": {
                                    "$numberDecimal": "0.45000000000130572"
                                },
                                "date": "2022-03-13T12:13:55.655Z"
                            }
                        ]
                    }
                }

3. account earning Status (***POINT 4***)
  * url : {{url}}/client/api/v1/user/account_earning_status
  * request type : GET
  * auth Token : Bearer {{token}}
  * response : {
                    "status": "SUCCESS",
                    "message": "Your request is successfully executed",
                    "data": {
                        "todayWinAmount": 3.000000000008705,
                        "totalEarningInUsd": 0.15
                    }
                }