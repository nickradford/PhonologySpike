$(function() {
	// $('#app_picture').attr('src', '../images/JoeChao.jpg');
	var testImageCollection = new TestImageCollection();

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
		counter += 1;
		if (counter > imageLimit) {
			counter -= 1;
			alert("You've reached the end!!!!1");
		}
		
		$("#app_word_input").val('');
		
		image = testImageCollection.at(counter);
	
		imageView.model = image;
		imageView.render();
	}
})
