waitUntilElementLoaded('#msg-row-template', 5000).then(function (element) {
	// element found and available
	let template = document.getElementById('msg-row-template').innerHTML;
	let container = document.querySelector('#ticker01');

	try {
		let data = JSON.parse(messagesJson);
		data.forEach(entry => {
			let jParsed = template;
			for (attr in entry) {
				jParsed = jParsed.replaceAll('{{' + attr + '}}', entry[attr]);
			}

			let newRow = document.createElement('li');
			newRow.innerHTML = jParsed;
			container.appendChild(newRow);
		});

		// start scrolling the ticker
		jQuery.fn.liScroll = function (settings) {
			settings = jQuery.extend({
				travelocity: 0.02
			}, settings);
			return this.each(function () {
				var $strip = jQuery(this);
				$strip.addClass("newsticker")
				var stripHeight = 1;
				$strip.find("li").each(function (i) {
					stripHeight += 20; //jQuery(this, i).outerHeight(true); // thanks to Michael Haszprunar and Fabien Volpi
				});
				var $mask = $strip.wrap("<div class='mask'></div>");
				var $tickercontainer = $strip.parent().wrap("<div class='tickercontainer'></div>");
				var containerHeight = $strip.parent().parent().height();	//a.k.a. 'mask' width 	
				$strip.height(stripHeight);
				var totalTravel = stripHeight;
				var defTiming = totalTravel / settings.travelocity;	// thanks to Scott Waye		
				function scrollnews(spazio, tempo) {
					$strip.animate({ top: '-=' + spazio }, tempo, "linear", function () { $strip.css("top", containerHeight); scrollnews(totalTravel, defTiming); });
				}
				scrollnews(totalTravel, defTiming);
				$strip.hover(function () {
					console.log("Stopped");
					jQuery(this).stop();
				},
					function () {
						var offset = jQuery(this).offset();
						var residualSpace = offset.top + stripHeight;
						var residualTime = residualSpace / settings.travelocity;
						scrollnews(residualSpace, residualTime);
					});
			});
		};

		$(function () {
			$("ul#ticker01").liScroll();
		});
	}
	catch (err) {
		// error occurred
		console.log("Failed to create task row due to: " + err);
	}
}).catch(function () {
	// element not found within 5000 milliseconds
	console.log("Failed to find #row-template for 5 sec");
});
