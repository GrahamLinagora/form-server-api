define([
	"jquery", "underscore", "backbone"
	, "text!templates/renderform.html"
	, "helper/snippetHelper"
], function(
  $, _, Backbone
  , _renderForm
	, snippetHelper
){
  return Backbone.View.extend({
    tagName: "fieldset"
    , initialize: function(){
      this.$build = $("#build");
      this.renderForm = _.template(_renderForm);
    }

    , render: function(){
      //Render Snippet Views
      this.$el.empty();
      var that = this;
      _.each(this.collection.renderAll(), function(snippet){
        that.$el.append(snippet);
      });
      $("#render").val(that.renderForm({
        text: _.map(this.collection.renderAll, function(e){return e.html()}).join("\n")
      }));
      this.$el.appendTo("#build form");
      this.delegateEvents();
    }

		//Builds and renders the collection of snippets from a form model
		, loadForm: function(model) {
			var fieldsToLoad = model;

			//first empty the collection
			this.collection.reset();

			//for each field model, build the corresponding snippet and add it to the collection
			var fieldCpt=0;
			while(fieldsToLoad['field'+fieldCpt]) {
				var snippet = snippetHelper.getSnippet(fieldsToLoad['field'+fieldCpt]);
				this.collection.add(snippet);
				fieldCpt++;
			}
			
			this.render();
		}

  })
});
