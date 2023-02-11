## API Endpoints
#### Products
- Index
    * HTTP method: get
    * EndPoint: /api/products
    * Body: empty
    * Response Type: json array of product
    * Sample Response:[
            {
                "id": 1,
                "productName": "Mango",
                "productPrice": "25.00",
                "productCategory": "fruit"
            },
            {
                "id": 2,
                "productName": "Orange",
                "productPrice": "20.20",
                "productCategory": "fruit"
            }
        ]
- Show
    * HTTP method: get
    * EndPoint: /api/products/:id
    * Body: empty
    * Response Type: json object of product
    * Sample Response:{
            "id": 1,
            "productName": "Mango",
            "productPrice": "25.00",
            "productCategory": "fruit"
        }

- Create [token required]
    * HTTP method: post
    * EndPoint: /api/products
    * Body: json Object of product
        - sample: {
                "productName": "Orange",
                "productPrice": "20.2",
                "productCategory": "fruit"
            }
    * Response Type: json Object of product updatrd with id 
    * Sample Response:
            {
                "id": 2,
                "productName": "Orange",
                "productPrice": "20.20",
                "productCategory": "fruit"
            }

- Products by category (args: category)
    * HTTP method: get
    * EndPoint: /api/products
    * params: productCategory
        - sample param: productCategory=fruit
    * Body: empty
    * Response Type: json array of product in the selected category
    * Sample Response:[
            {
                "id": 1,
                "productName": "Mango",
                "productPrice": "25.00",
                "productCategory": "fruit"
            },
            {
                "id": 2,
                "productName": "Orange",
                "productPrice": "20.20",
                "productCategory": "fruit"
            }
        ]

#### Users
- Index [token required]
* HTTP method: get
    * EndPoint: /api/users
    * Body: empty
    * Response Type: json array of users
    * Sample Response:[
            {
                "id": 3,
                "firstName": "Hossam",
                "lastName": "Moussa",
                "userName": "hmoussa"
            },
            {
                "id": 4,
                "firstName": "Omar",
                "lastName": "Moussa",
                "userName": "omoussa"
            },
            {
                "id": 8,
                "firstName": "Youssef",
                "lastName": "Moussa",
                "userName": "ymoussa"
            }
        ]
- Show [token required]
    * HTTP method: get
    * EndPoint: /api/users/:id
    * Body: empty
    * Response Type: json object of user
    * Sample Response:{"id":8,"firstName":"Youssef","lastName":"Moussa","userName":"ymoussa"}

- login
    * HTTP method: get
    * EndPoint: /api/login
    * Body: {
            "userName": "ymoussa",
            "password": ""
        }
    * Response Type: json object of loggedin user with the token valid for 30 minutes
    * Sample Response:{
        "user": {
            "id": 1,
            "firstName": "Youssef",
            "lastName": "Moussa",
            "userName": "ymoussa"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiWW91c3NlZiIsImxhc3ROYW1lIjoiTW91c3NhIiwidXNlck5hbWUiOiJ5bW91c3NhIiwiaWF0IjoxNjc0MjQwNTAxLCJleHAiOjE2NzQyNDIzMDF9.IRyixKXAmJ35rOjA5gWNeS1DdHHFEmilG0vmB9D_I9Y"
    }


- Create N[token required]
    * HTTP method: post
    * EndPoint: /api/users
    * Body: json Object of user
        - sample: {
                "firstName": "Youssef",
                "lastName": "Moussa",
                "userName": "ymoussa",
                "password": "Your Provided password"
            }
    * Response Type: json Object of created user with id, and token
    * Sample Response:
            {
                "user": {
                    "id": 8,
                    "firstName": "Youssef",
                    "lastName": "Moussa",
                    "userName": "ymoussa"
                },
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiWW91c3NlZiIsImxhc3ROYW1lIjoiTW91c3NhIiwidXNlck5hbWUiOiJ5bW91c3NhIiwiaWF0IjoxNjc0MjI0OTkwLCJleHAiOjE2NzQyMjU1OTB9.Rs1mfZJv7epQ5I4Yaza_GeJB1Ee-6c32pSSCyN1b2yw"
            }

#### Orders
- Order by user (args: user id)[token required]
    * HTTP method: get
    * EndPoint: /api/orders
    * params: userId
        - sample param: userId=1
    * Body: empty
    * Response Type: json array of user orders
    * Sample Response:[    
            {
                "id": 7,
                "products": [
                    {
                        "productId": 1,
                        "productName": "Mango",
                        "quantity": 2,
                        "totalPrice": 50
                    },
                    {
                        "productId": 2,
                        "productName": "Orange",
                        "quantity": 5,
                        "totalPrice": 101
                    }
                ],
                "oderStatus": "Active",
                "totalPrice": 151
            }
        ]

- CREATE Order [token required]
* HTTP method: post
    * EndPoint: /api/orders
    * Body: json Object of order
        - sample: {
            "userId": 1,
            "oderStatus": "Active",
            "totalPrice": 151,
            "products" : [
                {
                    "productId": 1,
                    "quantity": 2,
                    "totalPrice": 50
                },
                {
                    "productId": 2,
                    "quantity": 5,
                    "totalPrice": 101
                }
            ]
        }
    * Response Type: json Object of order updatrd with id 
    
## Database Schema
users Table
```sql
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    user_name varchar(20) NOT NULL,
    password varchar(255) NOT NULL
);
```

product Table
```sql
CREATE TABLE product(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(250) NOT NULL,
    product_price NUMERIC(6, 2) NOT NULL,
    product_category VARCHAR(50)
);
```
user_order Table
```sql
CREATE TABLE user_order(
    id SERIAL PRIMARY KEY,
    order_status VARCHAR(50),
    u_id INT REFERENCES users(id) NOT Null,
    total_price INT NOT NULL
);
```

order_product Table
```sql
CREATE TABLE order_product(
    id SERIAL PRIMARY KEY,
    o_id INT REFERENCES user_order(id) NOT NULL,
    p_id INT REFERENCES product(id) NOT NULL,
    quantity INT NOT NULL,
    total_price INT NOT NULL
);
```

## Data Shapes
#### Product
- id?: number 
- name: string
- price: number
- category: string

#### User
- id?: number
- firstName: string
- lastName: string
- userName: string
- password?: string

#### Orders
- id: number
- products: OrderProducts
- userId: string
- status: string

### OrderProducts
- productId: number
- productName: string
- quantity: number
- totalPrice: number