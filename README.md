# form-server-api

[![Build Status](https://travis-ci.org/linagora-open-paas/form-server-api.png?branch=master)](https://travis-ci.org/linagora-open-paas/form-server-api)
[![Dependency Status](https://david-dm.org/linagora-open-paas/form-server-api.png)](https://david-dm.org/linagora-open-paas/form-server-api)

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

Base URI for forms is http://localhost:3000/forms

<table>
<tr>
	<th>Method</th>
	<th>URL</th>
	<th>Description</th>
</tr>
<tr>
	<td>GET</td>
	<td>/forms</td>
	<td>Returns a JSON array of forms.</td>
</tr>
<tr>
	<td>GET</td>
	<td>/forms/:id</td>
	<td>Finds a form by ID and returns it as JSON.</td>
</tr>
<tr>
	<td>GET</td>
	<td>/forms?name=:name</td>
	<td>Returns a JSON array of forms with the given name.</td>
</tr>
<tr>
	<td>POST</td>
	<td>/forms</td>
	<td>
		Creates a form. Returns HTTP status 201 if created.<br />
		JSON body:
		
		<pre>
	    {
	      name : 'Form name',
	      model : {}
	    }
	    </pre>
	</td>
</tr>
<tr>
	<td>DELETE</td>
	<td>/forms/:id</td>
	<td>
		Deletes a form. Returns HTTP status 200 if an existing form with this id was deleted.
	</td>
</tr>
<tr>
	<td>POST</td>
	<td>/forms/:id</td>
	<td>
		Updates an existing form.<br />
		JSON body:
		<pre>
    	{
      		name : 'Form name',
      		model : {}
    	}
		</pre>
		
		The body should only contain fields to modify.<br />
		Returns HTTP status 201 if updated.
	</td>
</tr>
</table>


## API for Form Instances

Base URI for form instances is http://localhost:3000/instances

<table>
<tr>
	<th>Method</th>
	<th>URL</th>
	<th>Description</th>
</tr>
<tr>
	<td>GET</td>
	<td>/instances</td>
	<td>Returns a JSON array of form instances.</td>
</tr>
<tr>
	<td>GET</td>
	<td>/instances/:id</td>
	<td>Finds a form instance by ID and returns it as JSON.</td>
</tr>
<tr>
	<td>GET</td>
	<td>/instances?form_id=:form_id</td>
	<td>Returns a JSON array if instances associated with the form ID were found.</td>
</tr>
<tr>
	<td>POST</td>
	<td>/instances</td>
	<td>
		Creates a form instance.<br />
		JSON body:
		<pre>
    	{
      		name : 'Form Instance name',
      		description : 'Instance Description',
      		form_id : 'the form model ID',
      		model : {}
    	}
		</pre>
		
		Returns HTTP status 201 if created.<br />
		Notice that a newly created instance is considered as "open".
	</td>
</tr>
<tr>
	<td>DELETE</td>
	<td>/instances/:id</td>
	<td>
		Deletes a form instance. Returns HTTP status 200 if an existing instance with this ID was deleted.
	</td>
</tr>
<tr>
	<td>POST</td>
	<td>/instances/:id</td>
	<td>
		Updates an existing instance.<br />
		JSON body:
		<pre>
    	{
      		name : 'Form Instance name',
      		description : 'Instance Description',
      		open : 'true or false',
      		model : {}
    	}
    	</pre>

		The body should only contain fields to modify.<br />  
		Although 'form_id' can be modified, it should not make sense.<br />  
		'open' indicates the status of an instance, i.e. if people can fill-in this form instance.
	
		<br /><br />
		Returns HTTP status 201 if updated.
	</td>
</tr>
</table>

## API for Form Results

Note : Results are linked to instances.

Base URI for form instances is http://localhost:3000/results

<table>
<tr>
	<th>Method</th>
	<th>URL</th>
	<th>Description</th>
</tr>
<tr>
	<td>GET</td>
	<td>/results</td>
	<td>Returns a JSON array of form results.</td>
</tr>
<tr>
	<td>GET</td>
	<td>/results/:id</td>
	<td>Finds a form result by ID and returns it as JSON.</td>
</tr>
<tr>
	<td>GET</td>
	<td>/results?instance_id=:instance_id</td>
	<td>Returns a JSON array if results for the given form instance.</td>
</tr>
<tr>
	<td>POST</td>
	<td>/results</td>
	<td>
		Creates a form result.<br />
		JSON body:
		<pre>
    	{
      		instance_id : 'the instance model ID',
      		paramA : 'valueA',
      		paramB : 'valueB'
    	}
		</pre>

		Returns HTTP status 201 if created.<br />
	</td>
</tr>
<tr>
	<td>DELETE</td>
	<td>/results/:id</td>
	<td>
		Deletes a form result. Returns HTTP status 200 if an existing result with this ID was deleted.
	</td>
</tr>
<tr>
	<td>POST</td>
	<td>/results/:id</td>
	<td>
		Updates an existing result.<br />
		JSON body:
		<pre>
    	{
    	    paramC : 'valueC'
    	}
    	</pre>

		The body should only contain fields to modify or to add.<br />
		Although 'instance_id' can be modified, it should not make sense.<br />
		<br /><br />
		Returns HTTP status 201 if updated.
	</td>
</tr>
</table>


## Samples

### Create a new form

    node samples/post.js

### Delete a form

    node samples/delete.js

Prompts for the id of the form you want to delete and then performs the request.


