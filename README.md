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


## API for Form Models

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

### Update a form

    HTTP POST /forms/:id
    
With the JSON as body:

    {
      name : 'Form name',
      model : {

      }
    }

The body should only contain fields to modify.
Returns HTTP status 201 if updated.

## API for Form Instances

Base URI for forms is at http://localhost:3000/instances

### Get Form Instancess

    HTTP GET /instances

Returns a JSON array of form instances.

### Get a form

#### From ID

    HTTP GET /instances/:id

Returns a form instance as JSON.

#### From the form model ID

    HTTP GET /instances?form_id=:form_id

Returns a JSON array if instances associated with the form ID were found.

### Create a form instance

    HTTP POST /instances

With the JSON as body:

    {
      name : 'Form Instance name',
      description : 'A description of the instance',
      form_id : 'the form model ID',
      model : {

      }
    }

Returns HTTP status 201 if created.
Notice that a newly created instance is considered as "open".

### Delete a form instance

    HTTP DELETE /instances/:id

Returns HTTP status 200 if a form instance with this id exists and has been deleted correctly.

### Update a form instance

    HTTP POST /instances/:id
    
With the JSON as body:

    {
      name : 'Form Instance name',
      description : 'A description of the instance',
      open : 'true or false',
      model : {

      }
    }

The body should only contain fields to modify.  
Although *form_id* can be modified, it should not make sense.  
*open* indicates the status of an instance, i.e. if people can fill-in this form instance. 

Returns HTTP status 201 if updated.


## Samples

### Create a new form

    node samples/post.js

### Delete a form

    node samples/delete.js

Prompts for the id of the form you want to delete and then performs the request.


