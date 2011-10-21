$(function() {
	_.each(Phonology.Phonemes.models, function(item) {
		var keycode = item.get('keycode');
		var ipa = item.get('ipa');
		var klatt = item.get('klatt');
		var str = "<tr><td>" + keycode + "</td><td>" + ipa + "</td><td>" + klatt + "</td></tr>";
		$("#app_phoneme_list").append(str);
	});
});
