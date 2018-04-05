//
// SCRIPTS - INIT
//

//////////////////////////////////////////////////////



// UI imports - all JS

// include('UI.libs.js');

// include('UI.helpers.js');
// include('UI.ui.js');
// include('UI.polyfills.js');


// Patterns


// Components


// Partials
// nclude('../../partials/teaser/teaser.js');



//////////////////////////////////////////////////////
// DOCUMENT READY
//////////////////////////////////////////////////////

const onReady = function() {

    console.log('JQUERY -> onReady');


	if (UI.helpers.isHome && !UI.helpers.isBlog) {
		// UI.partials.newsletter.init();
        // UI.templates.home.blogCarousel.init();
    }

    // Common ground
    UI.commonground.bgFade();

    // Interface
    UI.interface.truncate();
    UI.interface.startLatestCase();
    //UI.interface.nextCase();

    //UI.interface.scroll.init('.test-inverted');

    //UI.interface.overInverted.debug();
    //UI.interface.overInverted.scroll();


 
    // WCAG
    UI.wcag.clicked();
    UI.wcag.triggerClick();

};

//////////////////////////////////////////////////////
// WINDOW LOAD
//////////////////////////////////////////////////////

const onLoad = function() {

    console.log('JQUERY -> onLoad');

};


//////////////////////////////////////////////////////
// INIT
//////////////////////////////////////////////////////

// READY
$(document).ready(function() {onReady()});

// LOAD
$(window).on('load', onLoad);
