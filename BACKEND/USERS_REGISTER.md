# POST /users/register — Register a new user

## 🔧 Installed packages (backend)

These packages are used by the backend. To install them (from the `BACKEND` folder):

```bash
npm install express mongoose bcrypt dotenv jsonwebtoken express-validator cors init
npm install --save-dev nodemon
```

> Tip: The project already has these packages in `package.json` — run the commands above if you need to recreate or install locally.

---

## Endpoint

- **URL:** /users/register
- **Method:** POST

### Description

Register a new user. The API validates the request body (email, fullname.firstname, password) and creates a user record in MongoDB. On success the server responds with an authentication token and the created user object.

### Request headers

- Content-Type: application/json

### Request body (JSON)

Required fields:

- fullname (object)
  - firstname (string) — required, min length 3
  - lastname (string) — required, min length 3
- email (string) — required, must be a valid email
- password (string) — required, min length 6

Example request body:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "s3cureP@ssw0rd"
}
```

### Validation rules (as implemented)

- `email` — must be a valid email
- `fullname.firstname` — minimum length 3
- `password` — minimum length 6

### Responses

- 201 Created

  - Description: User was created successfully.
  - Body: JSON containing `token` and `user` object.

  Example success response:

```json
HTTP/1.1 201 Created
{
  "token": "<jwt-token>",
  "user": {
    "_id": "64b8e1f7a0a6b2b44d1e231c",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

- 400 Bad Request

  - Description: Validation errors or missing required fields.
  - Body: { errors: [ ... ] }

  Example:

```json
HTTP/1.1 400 Bad Request
{
  "errors": [
    {
      "msg": "Password must have more than 6 characters",
      "param": "password",
      "location": "body"
    }
  ]
}
```

- 409 Conflict (possible)

  - Description: email already exists (Mongo duplicate key error). The current code does not explicitly transform this error so it may appear as a 500 if not caught.

- 500 Internal Server Error
  - Description: Unexpected server/database errors.

### Notes / Implementation details

- Passwords are hashed before being stored (a pre-save Mongoose hook is used in the model).
- The `password` field in the schema is set to `select: false`, so returned user objects will not include the hashed password by default.
- On successful registration a JWT token is created using user instance method and returned along with the user object.

---

If you'd like, I can also add an OpenAPI spec for this endpoint, or add an example curl command for testing.

### Quick example (curl)

Request (replace host/port as needed):

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"John","lastname":"Doe"},"email":"john.doe@example.com","password":"s3cureP@ssw0rd"}'
```

Example response (successful creation - 201):

```json
{
  "token": "eyJhbGciOiJI...",
  "user": {
    "_id": "64b8e1f7a0a6b2b44d1e231c",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```
