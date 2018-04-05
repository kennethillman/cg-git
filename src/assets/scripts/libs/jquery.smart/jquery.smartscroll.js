

(function($,sr){
    // http://paulirish.com/2009/throttled-smartresize-jquery-event-handler/
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var throttle = function(func, threshold, execAsap) {
      var timeout;
   
      return function throttled () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          }
   
          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);
   
          timeout = setTimeout(delayed, threshold || 100);
      };
  };
  
    // smartresize
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('scroll', throttle(fn)) : this.trigger(sr); };

})(jQuery,'smartscroll');



// =========================
// Usage Example
// $(window).smartscroll(function(){
//     do something...
// })
// ==================