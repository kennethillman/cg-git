//
// SCRIPTS - Commonground
//


(function() {

/**
 * Scroll direction
 */

UI.scroll = {
  winheight: window.innerHeight || (document.documentElement || document.body).clientHeight,
  lastScrollTop: 0,
  lastScrollLengthUp: 0,
  lastScrollLengthDown: 0,
  newScrollStartPos: 0,
  fireUpOnce: false,
  fireDownOnce: false,
};

window.addEventListener("scroll", function(){ 

   let body = $('body');
   let dw = body.width();
   let dh = body.height();
   let st = window.pageYOffset || document.documentElement.scrollTop;
   let sab = dh - UI.scroll.winheight;

   // console.log('st' + st);

   
  var docHeight = (function(){
      return Math.max(
          $(document).height(),
          $(window).height(),
          /* For opera: */
          document.documentElement.clientHeight
      );
  })();

   if (st < 81 ) {
      body.addClass('-at-scroll--top');
      body.addClass('-at-show-header');
   } else {
      body.removeClass('-at-scroll--top');
   }
  
   if (st > UI.scroll.lastScrollTop){

      if (!UI.scroll.fireDownOnce) {
          UI.scroll.fireDownOnce = true;
          UI.scroll.fireUpOnce = false;
          UI.scroll.newScrollStartPos = window.pageYOffset || document.documentElement.scrollTop;
      }

      UI.scroll.lastScrollLengthUp = 0;
      UI.scroll.lastScrollLengthDown =  st - UI.scroll.newScrollStartPos;

      body.addClass('at-scroll-down');
      body.removeClass('at-scroll-up');
      

      if ( UI.scroll.lastScrollLengthDown > 80) {
          body.removeClass('-at-show-header');
      }

      // At bottom
      /*
      if ( st === sab ) {
          body.addClass('-at-show-extras');
      }
      */

   } else {

      if (!UI.scroll.fireUpOnce) {
          UI.scroll.fireDownOnce = false;
          UI.scroll.fireUpOnce = true;
          UI.scroll.newScrollStartPos = window.pageYOffset || document.documentElement.scrollTop;
      }

      UI.scroll.lastScrollLengthDown = 0;
      UI.scroll.lastScrollLengthUp =   UI.scroll.newScrollStartPos - st;

      // upscroll code
      body.addClass('at-scroll-up');
      body.removeClass('at-scroll-down');


      if ( UI.scroll.lastScrollLengthUp > 180 || st === 0) {
          body.addClass('-at-show-header');
      }

   }

   UI.scroll.lastScrollTop = st;








}, false);



  UI.commonground.bgFade = function() {

      !function(o){"use strict";"function"==typeof define&&define.amd?define(["jquery"],o):o("object"==typeof exports?require("jquery"):jQuery)}(function(o){"use strict";function t(t,e){this.element=t,this.$element=o(t),this.options=o.extend({},l,e),this._defaults=l,this._name=s,this.init()}var s="colorScroll",e=window.document,r=o(e),i=o(window),n={UPDATE:"update.colorScroll"},l={colors:[{color:"#FFFFFF",position:"0%"},{color:"#000000",position:"100%"}],scrollElement:r,fauxScroll:!1},c=function(){var o=e.createElement("div"),t=o.style;return t.cssText="background-color:rgba(150,255,150,.5)",(""+t.backgroundColor).indexOf("rgba")>-1}(),a=function(o){return function(t,s){return t[o]<s[o]?-1:t[o]>s[o]?1:0}},h=function(o,t,s){var e="rgb"+(c?"a":"")+"("+parseInt(o[0]+s*(t[0]-o[0]),10)+","+parseInt(o[1]+s*(t[1]-o[1]),10)+","+parseInt(o[2]+s*(t[2]-o[2]),10);return c&&(e+=","+(o&&t?parseFloat(o[3]+s*(t[3]-o[3])):1)),e+=")"},u=function(o){var t,s;return(t=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(o))?s=[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16),1]:(t=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(o))?s=[17*parseInt(t[1],16),17*parseInt(t[2],16),17*parseInt(t[3],16),1]:(t=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(o))?s=[parseInt(t[1],10),parseInt(t[2],10),parseInt(t[3],10),1]:(t=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(o))&&(s=[parseInt(t[1],10),parseInt(t[2],10),parseInt(t[3],10),parseFloat(t[4])]),s};t.prototype={colors:[],init:function(){this.setPositions(),this.currentColor=this.$element.css("background-color"),this.updateColor(),this.addListeners()},addListeners:function(){var t=this;this.options.scrollElement.on("scroll",o.proxy(this.updateColor,this)),i.on("debouncedresize",function(){t.setPositions(),t.updateColor()})},setPositions:function(){for(var o=r.height()-i.height(),t=[],s=0;s<this.options.colors.length;s++){var e={},n=this.options.colors[s].position;e.color=this.options.colors[s].color,e.position="string"==typeof n?"%"===n.charAt(n.length-1)?Math.floor(parseFloat(n)*o/100):parseFloat(n):n,t.push(e)}t.sort(a("position")),this.colors=t},updateColor:function(){var o,t,s,e,i=r.scrollTop();if(i<=this.colors[0].position)this.setColor(this.colors[0].color);else if(i>=this.colors[this.colors.length-1].position)this.setColor(this.colors[this.colors.length-1].color);else{for(var n=0;n<this.colors.length;n++){if(!(i>=this.colors[n].position)){t=this.colors[n].position,e=this.colors[n].color;break}o=this.colors[n].position,s=this.colors[n].color}var l=(i-o)/(t-o),c=h(u(s),u(e),l);this.setColor(c)}},setColor:function(o){o!==this.currentColor&&(this.$element.css("background-color",o),this.currentColor=o,this.$element.trigger(n.UPDATE,{color:o}))}},o.fn[s]=function(e){return this.each(function(){o.data(this,"plugin_"+s)||o.data(this,"plugin_"+s,new t(this,e))})}}),function(o){"use strict";var t,s,e=o.event;t=e.special.debouncedresize={setup:function(){o(this).on("resize",t.handler)},teardown:function(){o(this).off("resize",t.handler)},handler:function(o,r){var i=this,n=arguments,l=function(){o.type="debouncedresize",e.dispatch.apply(i,n)};s&&clearTimeout(s),r?l():s=setTimeout(l,t.threshold)},threshold:150}}(jQuery);

      /*
          25% / 30% 
          start margin for color fade. 
      */

      var $element = $('[data-inview-bg]');
      var element = {}; 
      var _dynamic = [];

          
      $element.each(function(i) {

          var $this = $(this);
          var fadeOffset = 0.5;
          var eOffsetFade = Math.round($this.outerHeight() * ( fadeOffset -1));
          var eBgColor = $this.attr('data-inview-bg');
          var eHeight= $this.outerHeight();
          var eOffsetTop = Math.round($this.offset().top);
          var eOffsetBottom = Math.round($this.offset().top + $this.outerHeight());
          
          element.color = eBgColor;
          element.position = eOffsetTop;
          element.position2 = eOffsetTop - eOffsetFade;
          _dynamic.push({color: element.color, position: element.position});
          _dynamic.push({color: element.color, position: element.position2});

          /*
          // console.log('- - - - - - - - ');
          // console.log('Number i-> ' + i);
          // console.log('bg-> ' + eBgColor)
          // console.log('oTop -> ' + eOffsetTop + ' oBot -> ' + eOffsetBottom + '   (' + eOffsetFade + ' ' + eHeight +' -> ' + (eHeight - eOffsetFade) +')');
          */

      });

      $('body').colorScroll({
          colors: _dynamic
      });
  };
    

}());





