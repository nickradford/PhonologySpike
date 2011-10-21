Ti = Titanium;
Resources = Ti.API.Application.getResourcesPath();
Data = Ti.API.Application.getDataPath();


$(function() {
	
	var tiPlatform = Ti.Platform.getName(),
		appVersion = Ti.App.getVersion();
		
	// Handlers
	$('#app_add_subject').click(function() {
		$.get('html/addSubject.html', function(data) {
			$('#main').html(data);
		});
	});
	
	$(".app_start_test").live('click', function() {
		$.get('html/testInstance.html', function(data) {
			$('#main').html(data);
		});
	});
	
	$(".app_phoneme_list").live('click', function() {
		$.get('html/testPhonemes.html', function(data) {
			$('#main').html(data);
		});
	});
	
	$("#app_header").click(function() {
		window.location = '../index.html';
	});
	
	$("#app_close").click(function() {
		window.close();
	});
	$(".pdf").click(function() {
		var doc = new pdf();
		doc.setFontSize(48);
		doc.text(20, 20, 'Phonology');
    	var fileName = "testFile"+new Date().getSeconds()+".pdf";
		var dataUri = doc.output('datauri', {"fileName":fileName});
    	//$('#pdfViewer').append('<object width="425" height="550" data="'+dataUri+'" type="application/pdf"></object>');
    	document.location = dataUri;

	})
	
	
	$('#ti_platform').html(tiPlatform);
	$('#app_version').html(appVersion);
	
	var subjects = new Subjects();	
	subjects.fetch();
		
	var subjectsCollectionView = new UpdatingCollectionView({
        collection           : subjects,
        childViewConstructor : UpdatingSubjectView,
        childViewTagName     : 'tr',
        el                   : $('tbody#app_subjects')[0]
    });
	subjectsCollectionView.render();
	
});