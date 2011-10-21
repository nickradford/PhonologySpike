$(function() {
	TestImage = Backbone.Model.extend({
		
	});
	
	TestImageView = Backbone.View.extend({
		tagName: 'img',
		className: 'app_test_image',
		render: function() {
			var name = this.model.get('name') ;
			$("img#app_picture").attr('src', '../test-images/' + name + '.jpg');
			$("div#app_word").html(name);
		}
	});
	
	TestImageCollection = Backbone.Collection.extend({
		model: TestImage
	});
	
	
	
});
