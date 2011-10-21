$(function() {
	Test = Backbone.Model.extend({
		
	});
	
	TestInstance = Backbone.Model.extend({
		defaults: {
			productions: []
		},
		addProduction: function(obj) {
			var prodArr = this.get('productions');
			prodArr.push(obj);
			this.set({ productions: prodArr });
		}
	});
	
});
