# @Xiara/Web
Express.js based Web Server Framework, toolset, decorators for Xiara applications.


## Requirements
`npm install @xiara/core --save`

## How to install?
`npm install @xiara/http --save`

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

### A simple Controllers Example

```typescript
@Controller("/route")
class TestAPIController
{
    @GET("/getData")
    getData(req, res)
    {
      res.json({
        success: true
      })
    }
}
```
The above route defines the following HTTP end point
```GET /route/getData```

### Policy

```typescript
@Policy("Auth")
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
    constructor(public message: string)
    {
    }
    
    send(req, res, next)
    {
      return res.json({
        success: false,
        message: this.message
      })
    }
}
```



### License
MIT

### Quesiton? Problem? Bug?
Please open an issue.
