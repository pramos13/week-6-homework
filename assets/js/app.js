//page load function
$(document).ready(function())

//Variables
var categories = ['Naruto', 'Bleach', 'Dragonball'];

//functions

function category() {

	$('#buttons').empty;

for (var i = 0; i < categories.length; i++) {

	var a = $('<button>');
	a.addClass('btn');
	a.addClass('category');
	if (i % 2 == 0) {
		a.addClass('btn-success');
	} else
		a.addClass('btn-info');

	}

	a.attr('data-name', categories[i]);
	a.text(categories[i]);

	buttons('anime');

	}




	}
