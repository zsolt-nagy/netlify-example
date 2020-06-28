// Import express
var express = require('express');
var serverless = require('serverless-http');

// Create an express app
var app = express();
var port = 8000;

// Launch the express app on a port
app.listen( port, () => console.log(`Listening on ${port}`));


// Same request handler as in case of an HTTP server
var requestHandler = function( request, response ) {
    console.log( request.url );
    const responseObject = {
        status: true, 
        version: '1.1'
    }
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.end(JSON.stringify(responseObject));
}

// These are the routes (first arg: path, second: callback function)
app.get( '/', requestHandler );

app.get( '/pets/:owner', function(request, response) {
    console.log( request.url ); 
    const responseObject = [
        {
            name: 'Bini',
            type: 'Bunny',
            owner: request.params.owner 
        },
        {
            name: 'Siku',
            type: 'Polar bear',
            owner: request.params.owner
        }
    ]
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.end(JSON.stringify(responseObject));    
});

module.exports.handler = serverless(app);







