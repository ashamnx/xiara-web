# @Xiara/Web
Express.js based Web Server Framework for typescript, a complete toolset, decorators for rest apis and web applications.

Checkout the
https://github.com/xiara-io/xiara-boilerplate
for a complete Test Application

## Installation
`npm install @xiara/core --save`
`npm install @xiara/web --save`

# App Structure
![app-strucutre](https://i.imgur.com/yYZ1tib.png)

### Components
- Components (Basic App components)
- Controller (MVC Controllers)
- Policy (Authenticaiton rules)
- Middlewares (Express Middlewards)
- Models (Database definitions)
- Responses (HTTP Response definitions & Exceptions)
- Service (Services)
- Views (ejs or other template engine views)

### A Controller

```typescript
@Controller({ path: "/todos" })
class TodosController
{
    @GET("/getTodos")
    getTodos(req, res)
    {
      res.json({
        success: true
      })
    }
}
```
The above route defines the following HTTP end point `GET /todos/getTodos`

### Policy
```typescript
@Policy()
class AuthPolicy
{
    resolve(req, res, next)
    {
      // If logged in continue
      if(req.user)
      {
          return next();
      }
      res.forbidden("Login required");
    }
}
```

### Responses
```typescript
@Response("forbidden")
class ForbiddenResponse
{
    // Dependency Injection
    constructor(public logger: LogService)
    {
    }
    
    send(req, res, message: string)
    {
      res.status(500);
      return res.json({
        success: false,
        message: message
      })
    }
}
```



### License
MIT

### Quesitons? Problems? Bugs?
Please open an issue.
