# CMS Api Demo

## How to run this Demo
### 1. Clone this repository

### 2. Create a `.env` file in the root directory of the project
The content of the `.env` file should look like this
    
    DB_URI_LOCAL=<POSTGRES DATABASE URI>

    ACCESS_TOKEN_SECRET=391e90533f521b626487833ea10955e52b7d33a391bfbc0de1a31b600ca7aa27
    REFRESH_TOKEN_SECRET=1edbb1ee70f91e00921b4f00553ae2712eac81bc3ce62043700c9dbd36711ce7

    ACCESS_TOKEN_EXPIRE_TIME=21600s
    REFRESH_TOKEN_EXPIRE_TIME=604800s
    
Where the `<POSTGRES DATABASE URI>` should be replaced with a working postgres database uri. 

(example: `postgres://user:password@localhost:5432/cms_demo`)

These variables are just for demonstration and shouldn't be used in production since they're public.

### 3. Run `npm run install` in the root directory of the project

### 4. Run `npm run start` in the root directory of the project

### Note
> Everytime the demo is run `sequelize` will drop the existing table and create a new one, this is avoid writing `CREATE TABLE` queries and can be disabled easily in production


## Endpoints
### POST /auth/register
Request Body

    {
          "email": "johndoe@gmail.com",
          "password": "john@123"
    }
    
Response Sample 

    {
    "user": {
        "id": 1,
        "email": "johndoe@gmail.com"
    },
    "accessToken": "eyJhb....as60Ps8",
    "refreshToken": "eyJhb....GcrkUX4"
    }
    
### POST /auth/login
Request Body

    {
          "email": "johndoe@gmail.com",
          "password": "john@123"
    }
    
Response Sample 

    {
    "user": {
        "id": 1,
        "email": "johndoe@gmail.com"
    },
    "accessToken": "eyJhb....as60Ps8",
    "refreshToken": "eyJhb....GcrkUX4"
    }
 
### GET /user/profile
Request Headers

    "Authorization": "Bearer eyJhb....as60Ps8"
    
Response Sample 

    {
        "id": 1,
        "email": "johndoe@gmail.com",
        "createdAt": "2022-10-08T16:22:15.493Z",
        "updatedAt": "2022-10-08T16:22:15.493Z"
    }

### Note
> Currently the passwords are accepted in plaint text format and hashed on the backend before being saved for the sake of demonstration. In a production environment they should be hashed on the front end and the generated hash should be sent to the backend.