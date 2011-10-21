Ti = Titanium;
Resources = Ti.API.Application.getResourcesPath();
Data = Ti.API.Application.getDataPath();


$(function() {
	
	var tiPlatform = Ti.Platform.getName(),
		appVersion = Ti.App.getVersion();
		
	// Handlers
	$('#app_add_subject').click(function(e) {
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