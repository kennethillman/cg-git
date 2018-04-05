//
// SCRIPTS - Interface
//


/* $(function() {
    $.ajaxSetup({
        error: function(jqXHR, exception) {
            if (jqXHR.status === 0) {
                console.log('Not connect.\n Verify Network.');
            } else if (jqXHR.status == 404) {
                console.log('Requested page not found. [404]');
            } else if (jqXHR.status == 500) {
                console.log('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                console.log('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                console.log('Time out error.');
            } else if (exception === 'abort') {
                console.log('Ajax request aborted.');
            } else {
                console.log('Uncaught Error.\n' + jqXHR.responseText);
            }
        }
    });
}); */

(function() {

    UI.interface = {
        truncate() {
            function getLineHeightInPx (lineHeight) {
                if (typeof lineHeight == 'string' && lineHeight.indexOf('px') > -1) {
                    lineHeight = parseFloat(lineHeight).toFixed(2);
                } else {
                    // rem -> px (http://tzi.fr/js/convert-em-in-px).
                    lineHeight = lineHeight * parseFloat(getComputedStyle(document.documentElement).fontSize);
                    lineHeight = lineHeight.toFixed(2);
                }
                return lineHeight;
            }
            if (jQuery && jQuery().dotdotdot) {
                $('.js-clamp').each(function () {
                    var $this = $(this);
                    $this.dotdotdot({
                        watch: true,
                        height: function () {
                            var rows = $this.data('clamp') || 5;
                            return Math.ceil(getLineHeightInPx($this.css('line-height'))*rows);
                        }
                    });
                });
            }
        },
        startLatestCase() {
          if(UI.helpers.isStartpage() /*&& !UI.helpers.isMobile()*/) {

            $(window).scroll(function() {

                if (UI.interface.scroll.isElementVisible('.o-case-latest')) {
                    const organizm = $('.o-case-latest'); 
                    const colorTarget = $('body'); 
                    const applyTarget = $('.o-case-latest .overlay'); 
                    const colorGet = colorTarget.css('backgroundColor'); 
                    const text = $('.o-case-latest h3'); 
                    const bgTarget = $('.o-case-latest .video-bg'); 
                    const bgTargetPos = $('.o-case-latest .bg').offset().top; 
                    const st = $(window).scrollTop();
                    const vp = $(window).height();
                    const bgPos = parseInt(st - bgTargetPos);  

                    // console.log('st ->' + st);
                    // console.log('vp ->' + vp);
                    // console.log('bgTargetPos ->' + bgTargetPos);

                    applyTarget.css('backgroundColor', colorGet);
               
                }
            
            });
          }
        },
        nextCase() {

            
            // console.log('cases ' + $('.case-content').length);

            // $('body').load( "/6-pages/case-viasatsport.html" );


            $(window).scroll(function() {

                let casesArray = $('.case-content');

                casesArray.each(function(i) {

                    let windowH = $(window).height();
                    let thisCase = $(this);
                    let thisCaseH = thisCase.height();
                    let thisCaseT = thisCase.offset().top;
                    let thisCaseN = thisCase.find('.o-case-next').attr('data-next-case');

                    let st = window.pageYOffset || document.documentElement.scrollTop;
                    let scrollPercent = (st - thisCaseT) / (thisCaseH - windowH);
                    let scrollPercentRounded = Math.round(scrollPercent*100);

                    //console.log('thisCaseN ->' + thisCaseN);
                    //console.log('thisCase ->' , thisCase);
                    //console.log(i + ' thisCaseH ->' + thisCaseH);
                    //console.log('windowH ->' + windowH);
                    //console.log(i + ' st ->' + st);
                    //console.log(i + ' thisCaseT ->' + thisCaseT);
                    //console.log(i + ' scrollPercent ->' + scrollPercent);

                    if (scrollPercentRounded > 0 && scrollPercentRounded < 101) {
                        console.log(i + ' scrollPercentRounded ->' + scrollPercentRounded);    
                    }


                    // LOAD NEXT
                    
                    if (scrollPercentRounded > 50 && !$(this).hasClass("-loaded-next")) {
                        console.log(i + ' load ->' + thisCaseN);
                        
                        let urlNextCase = '/cg/6-pages/' + thisCaseN + '.html#';

                        /* $.ajax({
                            url: urlNextCase,
                            dataType: 'html',
                            context:this,
                            success: function(response) {
                                
                                let caseContentNext = $(response).find("#case-content");
                                console.log('------------------------------');
                                console.log('------------------------------');
                                console.log('------------------------------');
                                console.log(caseContentNext);
                                console.log('------------------------------');
                                console.log('------------------------------');
                                console.log('------------------------------');
                                $(this).after(caseContentNext);
                                $(this).addClass('-loaded-next'); 
                            }
                        }); */

                    }

                   
                  
            
                });

                
            
            });
          
        }
 

    };

    UI.interface.scroll = {
        config: {
            els: [],
            elsBool: [],
        },
        init() {

            $(window).scroll(function() {
               // if (SEAGAL.ui.scrollTracker.trackScroll) {
                    // console.log('scrollTracker');
                    UI.interface.scroll.handle();
               // }
            });

        },
        handle() {
            const invertedArray = $('.-inverted');

            invertedArray.each(function() {
                const inverted = $(this);
                const postId = post.attr('id');

                const postObject = SEAGAL.ui.scrollTracker.data.posts[postId + ''] || {
                    id: '',
                    height: 0,
                    offset: 0,
                    currentScrollDepth: 0,
                    scrollDepthProgress: {
                        25: false,
                        50: false,
                        75: false,
                        100: false,
                    }
                };

                SEAGAL.ui.scrollTracker.data.posts[postId + ''] = postObject;

                const postOffset = SEAGAL.ui.scrollTracker.getPostOffsetTop(post);
                const currentScrollDepth = SEAGAL.ui.scrollTracker.calculateCurrentPostScrollDepth(post);

                postObject.id = postId;
                postObject.height = post.outerHeight();
                postObject.offset = postOffset;
                postObject.currentScrollDepth = currentScrollDepth;

                //console.log('postObject', postObject);

                if (SEAGAL.ui.scrollTracker.isPostVisible(post)) {
                    // console.log(SEAGAL.ui.scrollTracker.data);
                    // console.log('visible post', post);
                    // console.log(SEAGAL.ui.scrollTracker.data.posts[postId+''].scrollDepthProgress);

                   

                    SEAGAL.ui.scrollTracker.data.currentPost = postObject;
                }
            });


        },

        init(element) {
             
            // Adding unique class to each "inverted"
            UI.interface.scroll.overInvertedPopulate('.-inverted');

            $(window).scroll(function(element) {
                const elements = $('.-inverted');
                console.log(element);  

                for ( let i = 0, l = elements.length; i < l; i++ ) {

                    const el = elements[i]; //console.log(el);
                    const nr = i;
                        
                        if (UI.interface.scroll.isElementVisible(el)) {

                            console.log(i+' inView');

                            console.log(getElementPosAttributes(el));


                            //$('.test-inverted').addClass('-on-inverted');
                            //$('.test-inverted').removeClass('-on-inverted');

                        }
                           
                }

            });

            
        },
        overInvertedPopulate(element) {
            let el = $(element);
            el.each(function (i){
                  let classAsID = element + '-' + i;
                  $(this).addClass(classAsID);
                  UI.interface.scroll.config.els[i] = classAsID;
            });
        },
        getInvertedViewports(element) {
            let invertedViewport = {
                top: 0,
                bottom: 0,
                height: 0,
            };
            invertedViewport.top = $(element).scrollTop();
            invertedViewport.bottom = invertedViewport.top + $(element).height();
            invertedViewport.height = $(element).height();

           //console.log('CV -> ' , invertedViewport);

            return invertedViewport;
        },
        getWindowViewport() {
            let windowViewport = {
                top: 0,
                bottom: 0,
                height: 0,
            };
            windowViewport.top = $(window).scrollTop();
            windowViewport.bottom = windowViewport.top + $(window).height();
            windowViewport.height = $(window).height();
            return windowViewport;
        },
        isElementVisible(element) {
            
            let el = $(element);

        //    console.log('iEV element -> ' + element);

            const elementPosAttributes = UI.interface.scroll.getElementPosAttributes(element);
            const windowViewport = UI.interface.scroll.getWindowViewport();

            // console.log('ePA.start: '+elementPosAttributes.half+' < '+'cV.bottom: '+windowViewport.bottom+' && '+'ePA.end: '+elementPosAttributes.half+' > '+'cV.top '+windowViewport.top);

            // Put magic dynamic string here!!
            // if (getInvertedVeiwports) {
            if ((elementPosAttributes.start < windowViewport.bottom) && (elementPosAttributes.end > windowViewport.top)) {
                return true;
            }

            return false;
        },
        getElementPosAttributes(element) {

            const el = $(element);
            
         //console.log('gEPA element -> ' , el);

                const elementOffset = el.offset();
                const elementHeight = el.height();

                const elementPosAttributes = {
                    start:  elementOffset.top,
                    height: elementHeight,
                    half: (elementOffset.top + elementHeight) / 2,
                    end:   elementOffset.top + elementHeight,
                };

            return elementPosAttributes;


        },
        getInvertedViewport() {
            // Somthing "this"
            let invertedViewport = {
                top: 0,
                bottom: 0,
                height: 0,
            };
            invertedViewport.top = el.scrollTop();
            invertedViewport.bottom = invertedViewport.top + el.height();
            invertedViewport.height = el.height();

           console.log('CV -> ' , invertedViewport);

            return invertedViewport;
        },
        
        /*
        calculateCurrentPostScrollDepth(post) {
            const postPosAttributes = UI.scroll.getPostPosAttributes(post);
            const currentViewport = UI.scroll.getCurrentViewport();

            // console.log(currentViewport.bottom,postPosAttributes.end);

            const currentPostViewportInterim = currentViewport.bottom - postPosAttributes.start;
            const currentPostQuota = currentPostViewportInterim / postPosAttributes.height;

            // console.log(currentPostQuota);
            return currentPostQuota;
        }, 
        */

    };

  

}());

