$(document).ready(function() {
	var base_url = document.URL;
	var para = [];
	para = base_url.split("?");
	var value = [];
	value = para[1].split("=");
	var img_url = value[1];
	$('#image_detail').append('<center><img src="'+ img_url +'"></center>');

});