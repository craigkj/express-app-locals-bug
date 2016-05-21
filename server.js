var express = require('express');
var app = express();

// Set some aributrary app locals to share throughout application
app.locals = {
    name: 'World'
};

/*
Greeting function wants to use the value from app.locals but does not have a
direct reference to `app` so uses req.app.locals instead...
*/
function getGreeting() {
    return 'Hello ' + req.app.locals.name;
}

// Calls the above Greeting Function to render output
app.get('/', function (req, res) {
    res.send(getGreeting());
});

/*
This route needs to append a slightly different message. We know the Greeting
function reads `req.app.locals.name` for the value, so we set the value there
to be picked up when its called.

It seems surprising that `req.app.locals` is actually a reference to the app.locals
object rather than a clone, as it allows middleware to change the app behaviour
for every call by mistake when they expect it to only last for the duration of
that request.

If you hit `/` after hitting `/break` then you will see `Hello Everyone` instead
of the expected `Hello World`.
*/
app.get('/break', function(req, res) {
    req.app.locals.name = 'Everyone';
    res.send(getGreeting());
});

app.listen(3000, function () {
  console.log('Server running on port 3000');
});
