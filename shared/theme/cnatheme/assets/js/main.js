$(function () {
	/** SVG Fallback **/
	// can be removed when LE support for IE11 no longer required
	//    svg4everybody();

	/** Tooltips and Popovers **/
	$('.tooltips-link').tooltip();
	$('.popovers-link').popover({
		html: true
	}); // enable html in popover
	$('body').on('click', function (e) {
		$('[data-toggle="popover"]').each(function () {
			//the 'is' for buttons that trigger popups
			//the 'has' for icons within a button that triggers a popup
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
				$(this).popover('hide');
			}
		});
	});
	/** Graphic Tabs **/
	// Add/Remove active class from anchor in graphic tab
	// Used to set font color of active tab
	$('.tab-graphic a').click(function () {
		$('a.active').removeClass('active');
		$(this).addClass('active');
	});
	/** Button Disabled **/
	//$('.reveal').on('show.bs.collapse', function () {
	$('.btn-reveal').on('click', function () {
		var $_this = $(this);
		setTimeout(function () {
			$_this.attr('disabled', true);
		}, 500);
	});
});

/** Trigger Click on Focus + Enter **/
$(document).keydown(function (e) {
	var keyCode = (e.keyCode ? e.keyCode : e.which);
	if (keyCode === 13) {
		$(e.target).trigger('click');
	}
});
window.cardsRan = false;

$(document).ready(function () {
	/* Tooltip */
	$('.tooltips-link').tooltip();

	/* responsive image within full width wrapper */
	$('.fullwidth-wrapper img').addClass('img-responsive');
});

$(window).resize(function () {
	if (window.cardsRan === false) {
		$('.flip-cards').each(function () {
			getFlipCardHeightMax($(this));
		});
		window.cardsRan = true;
	}
});

/** Flip Tiles **/
$(window).load(function () {
	if (!window.frameElement) {
		$('.flip-cards').each(function () {
			getFlipCardHeightMax($(this));
		});
	}
	$('.card').click(function () {
		$(this).toggleClass('apply-flip');
	});
});

function getFlipCardHeightMax(el) {
	var maxHeight = 0;
	el.find('.card-front').each(function () {
		var currentFront = 0;
		var currentBack = 0;
		$(this).children().each(function () {
			currentFront += $(this).outerHeight(true);
		});
		$(this).next().children().each(function () {
			currentBack += $(this).outerHeight(true);
		});
		if (currentFront > maxHeight || currentBack > maxHeight) {
			maxHeight = Math.max(currentFront, currentBack);
		}
	});
	setFlipCardHeight(el, maxHeight);

	function setFlipCardHeight(el, height) {
		el.find('.content').css('height', height);
	}
}