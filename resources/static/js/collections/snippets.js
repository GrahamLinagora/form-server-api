define([
       "jquery" , "underscore" , "backbone"
       , "models/snippet"
       , "views/snippet"
], function(
  $, _, Backbone
  , SnippetModel
  , SnippetView
){
  return Backbone.Collection.extend({
    model: SnippetModel
    , renderAll: function(){
      return this.map(function(snippet){
        return new SnippetView({model: snippet}).render();
      });
    }
  });
});
