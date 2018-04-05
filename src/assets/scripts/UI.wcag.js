
// SCRIPTS - WCAG

(function() {

    // .clicked - Adds "-clicked" class on all clicked links to be able to seperate tab och and clicked focus styles.
    // .triggerClick - Makes a container clickable, triggers first link or wrapper with classname js-wcag-trigger-this.

    UI.wcag = {
        clicked() {
            var el =  $('a, .btn, .js-wcag-trigger-click', 'button');
            el.on('mousedown', function() {
                    el.removeClass('-clicked');
                    $(this).addClass('-clicked');
                    return true;
                });
        },
        triggerClick() {
            $('body').on('click', '.js-wcag-trigger-click', function() {
                    let url = $(this).find('.js-wcag-trigger-this').attr('href');
                    if (!url || url && '' === url.trim()){
                        url = $('a', $(this)).first().attr('href');
                    }
                    if (url && '' !== url.trim()) {
                        window.location.assign(url);
                    }
            });
        },
    };

}());
