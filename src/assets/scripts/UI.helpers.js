//
// SCRIPTS - Helpers
//


(function() {

    UI.helpers.setCookie = function(name, value, days = 356) {
        const d = new Date();

        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${d.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    };

    UI.helpers.isMobile = function() {
        if (window.matchMedia('only screen and (max-width:767px)').matches) {
            return true;
        }
        return false;
    };

    UI.helpers.isStartpage = function() {
        if ($('body').hasClass('page-startpage')) {
            return true;
        }
        return false;
    };

}());
