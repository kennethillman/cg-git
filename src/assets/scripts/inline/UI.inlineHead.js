
//////////////////////////////////////////////////////
//
// SCRIPTS - Inline Head
//
//////////////////////////////////////////////////////




(function () {

	var 	win 			= window,
			doc 			= document,
			docElement 		= doc.documentElement,
			toast 			= win.toast;


	/*///////////////////////////////////////////////////////////////////////////////////////////////////////
		Global Namespaces
	*////////////////////////////////////////////////////////////////////////////////////////////////////////


	UI = win.UI || {};

	UI.fn = UI.fn || {};
	UI.interface = UI.interface || {};
	UI.helpers = UI.helpers || {};
	UI.initial = UI.initial || {};
	UI.wcag = UI.wcag || {};

	/* TRELLO - A1.1 
	
	UI.commonground = UI.commonground || {};

	UI.atoms = UI.atoms || {};
	UI.molecules = UI.molecules || {};
	UI.organizma = UI.organizma || {};
	UI.templates = UI.templates || {};
	UI.pages= UI.pages|| {};

	*/


	/*///////////////////////////////////////////////////////////////////////////////////////////////////////
		UI functions
	*////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*
		Custom Event: eventListener
		UI.fn.listen('somethingLoad', function() {
			console.log('somethingLoad');
		});
	*/

	UI.fn.listen = function(eventName, callback) {
		if (doc.addEventListener) {
			doc.addEventListener(eventName, callback, false);
		} else {
			docElement.attachEvent('onpropertychange', function(e) {
				if (e.propertyName == eventName) {
					callback();
				}
			});
		}
	};

	/*
		Custom Event: eventTrigger
		-> UI.fn.trigger('somethingLoad');
	*/

	UI.fn.trigger = function(eventName) {
		if (doc.createEvent) {
			var event = doc.createEvent('Event');
			event.initEvent(eventName, true, true);
			doc.dispatchEvent(event);
		} else {
			docElement[eventName] ++;
		}
	};


	/*///////////////////////////////////////////////////////////////////////////////////////////////////////
		UI HELPERS
	*////////////////////////////////////////////////////////////////////////////////////////////////////////


	UI.helpers.noJS = function () {
		var	docClass = docElement.className; // HTML tag
		docElement.className = docClass.replace(/\bno-js\b/g, 'js');
	}();

	/*
		Has touch support
		https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
	*/

	UI.helpers.isTouch = function () {
		var docTouch = win.DocumentTouch;
		return ('ontouchstart' in win) || docTouch && doc instanceof docTouch || false;
	};

	if (UI.helpers.isTouch()) {
		var	docClass = docElement.className; // HTML tag
		docElement.className = docClass.replace(/\bno-touch\b/g, 'touch');
	};


	UI.helpers.getCookie = function (name) {
		var nameEQ = name + "=";
        var ca = document.cookie.split(';');

        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }

        return null;
	}	


	/*///////////////////////////////////////////////////////////////////////////////////////////////////////
		UI INITIAL
	*////////////////////////////////////////////////////////////////////////////////////////////////////////


	UI.initial.loadSvgSprites = function (svg,text) {
		var ajax = new XMLHttpRequest();
		ajax.open("GET", svg, true);
		ajax.send();
		ajax.onload = function(e) {
		  var el = document.createElement("figure");
		  el.innerHTML = '<img src="'+svg+'" alt="'+text+'" title="'+text+'">';
		  el.className += " cache-svg-sprite";
		  document.body.insertBefore(el, document.body.childNodes[0]);
		}
	};


	UI.initial.loadASSET = function (name) {
			assetURL = name;
			toast(assetURL);
	};

	UI.initial.loadCSS = function (name) {
			assetURL = name;
			console.log('[css]'+assetURL);
			toast('[css]'+assetURL);
	};


	UI.initial.loadGoogleFONTS = function () {
			var fonta = win.getComputedStyle(document.body, ':after').getPropertyValue('content').replace(/"/g,"");
			var fontb = win.getComputedStyle(document.body, ':before').getPropertyValue('content').replace(/"/g,"");
			if (fonta.indexOf('https') !== -1) {
			   UI.initial.loadCSS(fonta);
			}
			if (fontb.indexOf('https') !== -1) {
			   UI.initial.loadCSS(fontb);
			}
	};

	UI.initial.loadJS = function (name,fn) {
			assetURL = name;
			
			toast(
				'[js]'+assetURL+'',
				function() {
					if (fn) {
						// fn();   :(
					}
				}
			);
	};

	UI.initial.loadCoreJS = function (name) {
			assetURL = name;
			toast(
				assetURL,
				function() {
					UI.fn.trigger('onAfterCoreJS');
				}
			);
	};

	UI.initial.loadASSET(UI_PRESET.path.styles.ui);
	UI.initial.loadASSET(UI_PRESET.path.styles.at);
	
	UI.fn.listen('onUiReady', function() {
		UI.initial.loadCoreJS(UI_PRESET.path.scripts.ui);
    });



})();



// Demo custom event

UI.fn.listen('onAfterCoreJS', function() {
	console.log('UI -> onAfterCoreJS');
});

UI.fn.listen('onUiReady', function() {
	console.log('UI -> onUIReady');
});


