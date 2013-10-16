define([
  "jquery", "underscore", "backbone"
], function(
  $, _, Backbone
){
  return Backbone.View.extend({
    tagName: "div",

		events: {
			//Button click event
			"click .submit": "handleSubmit"
		},

		handleSubmit: function() {
			var resultModel = this.buildResultModel();
			//TODO remove trace
//			this.collection.each(function(snippet) {
//console.log(JSON.stringify(snippet));
//console.log(JSON.stringify(snippet.get("title")));
//console.log(JSON.stringify(snippet.get("fields").id));
//if(snippet.get("fields").id) {
//	var el = $('#'+snippet.get("fields").id.value);
//	console.log(el);
//}
//console.log('********');
//			});

			//TODO send result to the server
			
			//TODO leave the page
		},

		buildResultModel: function() {
			var fieldTitles = this.collection.map(function(snippet) {
				return snippet.get("title");
			});

			var fieldComponents = $('#build .component');
			for(var i=0; i<fieldComponents.length; i++) {
				fieldComponent = fieldComponents[i];
				console.log(fieldComponent);
			}
		},

		getFieldValue: function(fieldDiv) {
			//find the label

			//read its 'for attribute'

			//find the designated elements
			
			//get the value form these elements
			return getValueFormElements(elements);
		}

  });
});
