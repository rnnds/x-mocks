# x-mocks

Dynamic multiple mock server

[![NPM](https://nodei.co/npm/x-mocks.png?compact=true)](https://nodei.co/npm/x-mocks/)

[![Build Status](https://travis-ci.org/rnnds/x-mocks.svg?branch=master)](https://travis-ci.org/rnnds/x-mocks)

# Basic usage

Install the package:

    npm install -g x-mocks

Create a new directory:

    mkdir x-mocks-example && cd x-mocks-example

Create a JSON file (e.g. first-example.json) containing:

    {  
      "uri":"/v1/example",
      "method":"get",
      "response":{  
        "status":200,
        "body":"It works!"
      }
    }

Run:

    x-mocks .
    
It's done: 

Access `http://localhost:3000/routes` to list all registered routes, 

and `http://localhost:3000/v1/example` to see our first example.
