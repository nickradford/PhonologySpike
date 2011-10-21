$(function() {
	$('#add_subject_form').submit(function(e) {
		// e.preventDefault();
		var fname = $('#fname').val();
		var lname = $('#lname').val();
		var gender = $('#gender').val();
		var birthday = $('#birthday').val();
		var grade = $('#grade').val();
		var teacher = $('#teacher').val();
		var parent_name = $('#parent_name').val();
		var school = $('#school').val();
		var clinician_name = $('#clinician_name').val();
		
		var sql = "INSERT INTO subjects(fname, lname, gender, birthday, clinician_name, parent_name, school, teacher, grade) VALUES('"+ fname+"', '"+ lname +"', '"+ gender +"', '"+ birthday +"', '"+ clinician_name +"', '"+ parent_name +"', '"+ school +"', '"+ teacher +"', '"+ grade +"')";
		var results = Phonology.DB.execute(sql);

		// window.history.back();
	});
});
