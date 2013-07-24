# form-server-api

REST API to manipulate form models and instances.
Node.js based form server used to store and retrieve JSON serialized HTML forms.

## Usage

First be sure you have MongoDB and Node.js installed...

    git clone https://github.com/linagora-open-paas/form-server-api.git
    npm install
    node server.js

Check config.js for configuration options.

### Install

```sh
$ npm install
```

### Run

Start the API server with nodemon to restart app on code change:

```sh
$ npm start
```

or start the API server in standard mode:

```sh
$ node server.js
```

### Tests

```sh
$ npm test
```

## API

Base URI for forms is at http://localhost:3000/forms

### Get Forms

    HTTP GET /forms

Returns a JSON array of forms.

### Get a form

#### From ID

    HTTP GET /forms/:id

Returns a form as JSON.

#### From its name

    HTTP GET /forms?name=:name

Returns a JSON array if form with given name are found.

### Create a form

    HTTP POST /forms

With the JSON as body:

    {
      name : 'Form name',
      model : {

      }
    }

Returns HTTP status 201 if created.

### Delete a form

    HTTP DELETE /forms/:id

Returns HTTP status 200 if a form with this id exists and has been deleted correctly.

## Samples

### Create a new form

    node samples/post.js

### Delete a form

    node samples/delete.js

Prompts for the id of the form you want to delete and then performs the request.


