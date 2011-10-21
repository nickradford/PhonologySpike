$(function() {
	// $('#app_picture').attr('src', '../images/JoeChao.jpg');
	var testImageCollection = new TestImageCollection();
	
	var test = new TestInstance({ subject: {name: "Joe Chao"}});

	var sql = "SELECT * from words";
	var res = Phonology.DB.execute(sql);

	while (res.isValidRow()) {
		var name = res.fieldByName('name');
		
		testImageCollection.add({ name : name });
		res.next()
	}
	imageLimit = testImageCollection.length;
		
	counter = 0;
	image = testImageCollection.at(counter);
	
	imageView = new TestImageView({
		model: image
	});
	
	imageView.render()

	$("#app_previous").click(function() {
		counter -= 1;
		if (counter < 0) {
			counter += 1;
		}
		
		image = testImageCollection.at(counter);

		var name = image.get('name');
		var production = test.getProduction(name);
		
		$("#app_word_input").val(production.production)
		
		imageView.model = image;
		imageView.render()
	});
	
	$("#app_next").click(nextPicture);
	
	$('body').keypress(function(e) {
		e.preventDefault();
		var str, phoneme;
		// alert(e.keyCode);
		if (e.keyCode === 8) {
			str = $("#app_word_input").val();
			str = str.substr(0, str.length -1);
			$("#app_word_input").val(str);
		}
		else if (e.keyCode === 13){
			nextPicture();
		}
		else {
			phoneme = Phonology.Phonemes.findByKeycode(e.keyCode);
			str = $("#app_word_input").val();
			str += phoneme.get('ipa');
			$("#app_word_input").val(str);
		}
	});
	
	function nextPicture() {
		var production = $("#app_word_input").val();
		
		if (production.length === 0)
			return;
			
		counter += 1;
		test.addProduction({name: image.get('name'), production: production});
		
		if (counter === imageLimit) {
			alert('test finished');
			test.finish();
		}
		
		image = testImageCollection.at(counter);

		var name = image.get('name');
		var production = test.getProduction(name);
		
		$("#app_word_input").val('')
		if (production && production.production)
			$("#app_word_input").val(production.production);		
	
		imageView.model = image;
		imageView.render();
	}
})
