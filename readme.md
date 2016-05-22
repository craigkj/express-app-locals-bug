## Potential bug with express request object.

NOTE: https://github.com/expressjs/express/issues/3004 Issue confirmed as not a bug, not really a feature either but necessary implementation detail for providing details of app to the response.

The request object has a value at `req.app.locals` which contains the values of `app.locals` which is typically used for app wide config/settings and is set up when the server is started. It seems that this value is in fact a `reference` to the app.locals object rather than a clone, meaning that changes to `req.app.locals.x` will change that value at source and thus for the entire application, rather than just for the request in question as you might expect.

**Example:**

For an example, clone this repo and:
```
npm install
npm start
```

Then :

- Hit http://localhost:3000/ (See `Hello World` - expected)
- Hit http://localhost:3000/break (See `Hello Everyone` - expected)
- Hit http://localhost:3000/ (See `Hello Everyone` - NOT EXPECTED)


After one request is made to the `/break` endpoint the app.locals value is changed for all users.

Is this expected behaviour? If so I think the docs could be clearer on this to avoid people being caught out. Obviously this is a trivial example, but as your app gets larger there is more scope for something like this to sneak in and cause problems.

The correct behaviour would be to set the new values on `res.locals` and have them override the app.locals on `res.render`.
