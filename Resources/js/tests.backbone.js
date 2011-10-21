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
		},
		getProduction: function(word) {
			var prodArr = this.get('productions');
			
			var production = _.detect(prodArr, function(item) { return item.name === word });
			return production;
		},
		finish: function() {
			this.save();
			window.location = '../index.html';
		},
		save: function() {
			//saves this test to the database
		}
	});
	
});
