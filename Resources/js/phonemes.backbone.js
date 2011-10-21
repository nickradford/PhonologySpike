$(function(){
	Phoneme = Backbone.Model.extend({
		
	});
	PhonemeCollection = Backbone.Collection.extend({
		model: Phoneme,
		findByKeycode: function(keycode) {
			return _.detect(this.models, function(item) { return item.get('keycode') === keycode });
		}
	});
	
	
	var sql = "SELECT * FROM phonemes;";
	
	var res = Phonology.DB.execute(sql);
	var ipa, klatt, keycode;
	
	Phonology.Phonemes = new PhonemeCollection();
	
	while (res.isValidRow()) {
		ipa = res.fieldByName('ipa');
		klatt = res.fieldByName('klattese');
		keycode = res.fieldByName('keycode');
			
		Phonology.Phonemes.add({ipa: ipa, klatt:klatt, keycode:keycode});
			
		res.next();
	}
});
