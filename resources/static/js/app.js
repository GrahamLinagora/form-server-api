define([
	"collections/snippets"
  ,"views/my-form"
	,"helper/rest"
	,"views/submitDiv"
], function(
	SnippetsCollection
	,MyFormView
	,restHelper
	,SubmitButtonDiv
){
  return {
    initialize: function(){
			this.getInstance();
    },

		getInstance: function() {
			var that = this;
			restHelper.searchInstance(this.getInstanceId(), function(instance) {
				that.getFormById(instance.form)
			});
		},

		getFormById: function(formId) {
			var that = this;
			restHelper.searchForm(formId,function(form) {
				that.initDisplay(form);
			});
		},

		initDisplay: function(form) {
			var snippetCollection = new SnippetsCollection();
			var formView = new MyFormView({
        title: "Original"
        , collection: snippetCollection
      });

			//add the logic for the submit button
			new SubmitButtonDiv({
				el: $('#submitDiv')
				, collection: snippetCollection
			});

			formView.loadForm(form.model);
			$('#nameH2').text(form.name);
			$('#descH4').text(form.description);
		},

		getInstanceId: function() {
			//get instance id from the url
			//TODO improve this : it is not a very clean way to do this : maybe use a generated json file 
			var pathArray = window.location.pathname.split('/');
			if(pathArray[pathArray.length-1] === '' ) {
				//check if the url ends with a '/'
				return pathArray[pathArray.length-2];
			}
			else {
				return pathArray[pathArray.length-1];
			}
		}
  }
});
