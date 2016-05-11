//page load

$(document).ready(function() {



	var categories = ['Naruto Shippuden','Initial D', 'Bleach','One Piece','Dragon Ball Z','Pokemon','Cowboy Bebop','Death Note','Attack on Titan','One-punch Man'];

	
	// function to create the buttons 
	function category() {

		// empty the div 
		$('.buttons').empty();

		// loop through the categories array to make buttons
		for (var i = 0; i < categories.length; i++){
		    
		    
		    var a = $('<button>')
		    a.addClass('category');
		    a.addClass('btn');
		    if (i % 2 == 0) {
		    	a.addClass('btn-success');
		    } else {
		    	a.addClass('btn-info');	
		    }
		    a.attr('data-name', categories[i]);
		    a.text(categories[i]);

		    
		    $('.buttons').append(a);
		}
		
		buttons('anime+');
	}

	
	function buttons(name) {
		
		
		$('.category').click(function(){
			
			
			var buttonText = $(this).data('name');
			var button = replaceAll(buttonText,' ','+');
			var anime = name;
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + anime + button + "&api_key=dc6zaTOxFJmzC&limit=10";
			
			// create ajax request to call API
			$.ajax({url: queryURL, method: 'GET'})

			
			.done(function(response) {
		    	
		    	// empty the results div 
		    	$('.results').empty();

		    	// loop through the 10 images 
		    	for (var i = 0; i < response.data.length; i++) {

		    		
		    		var still = response.data[i].images.fixed_width_still.url;
		    		var active = response.data[i].images.fixed_width.url;
		    		var alt = response.data[i].slug;
		    		var id = response.data[i].id;

		    		// create still image
		    		var a = $('<img/>');
		    		a.attr('src',still);
		    		a.addClass('stillImage');
		    		a.attr('alt', alt);
		    		a.attr('data-id', id);

		    		
		    		$('.results').append(a);
		    	}
		    	stills();
			});

		});
	}
	
	function stills() {
		$('.stillImage').click(function(){
			
			
			var id = $(this).data('id');

			
    		var queryURL = 'https://api.giphy.com/v1/gifs/'+id+'?api_key=dc6zaTOxFJmzC';

    		// create ajax request to call API
    		$.ajax({url: queryURL, method: 'GET'})

			
			.done(function(response) {
				
		    	var active = response.data.images.fixed_width.url;
		    	var still = response.data.images.fixed_width_still.url
		    	
		    	
		    	if ($("[data-id='"+id+"']").hasClass('stillImage')) {
		    		$("[data-id='"+id+"']").attr('src', active);
	    			$("[data-id='"+id+"']").removeClass('stillImage').addClass('gifImage');
		    	} else {
		    		$("[data-id='"+id+"']").attr('src', still);
	    			$("[data-id='"+id+"']").removeClass('gifImage').addClass('stillImage');
		    	}
	    		

			});

    	});
	}

	
	function escapeRegExp(str) {
	    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}
	
	function replaceAll(str, find, replace) {
	  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}

	category();

	$('#addCategory').on('click', function(){
		if ($( '#categoryInput' ).val() !== '') {
	var newCat = $( '#categoryInput' ).val().trim();
		categories.push(newCat);
	category();
		$( '#categoryInput' ).val('');
	} else {
		alert('Please enter some text in the box.');
	}

	
		return false; 
	});
	
});
