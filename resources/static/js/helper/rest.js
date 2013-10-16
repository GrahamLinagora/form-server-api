define([
	"jquery",
], function(
  $
){
  return {

		searchInstance: function(id, searchSuccess) {
			$.ajax({
				type: "GET",
				url: "/instances/"+id,
				dataType: "json",
				success: function (data)
				{
					searchSuccess(data);
				}
			});
		},

		searchForm: function(id, searchSuccess) {
			$.ajax({
				type: "GET",
				url: "/forms/"+id,
				dataType: "json",
				success: function (data)
				{
					searchSuccess(data);
				}
			});
		},

		createResult: function(resultModel, creationCallback) {
			//TODO
		}

	};
});
