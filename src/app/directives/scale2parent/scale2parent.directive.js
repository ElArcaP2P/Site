angular.module('elArcaP2P')
.directive('scale2parent', function() {
  return {
    restrict: 'A',
    scope: {},
    link: function (scope, element) {
      function adjust(){
        element.height(element.parent().height());
      }
      $(window).on('resize',adjust);
      /* From Modernizr */
      function whichTransitionEvent(){
          var t;
          var el = document.createElement('fakeelement');
          var transitions = {
            'WebkitTransition':'webkitTransitionEnd',
            'transition':'transitionend',
            'OTransition':'oTransitionEnd',
            'MozTransition':'transitionend'
          }

          for(t in transitions){
              if( el.style[t] !== undefined ){
                  return transitions[t];
              }
          }
      }

      /* Listen for a transition! */
      var transitionEvent = whichTransitionEvent();
      transitionEvent && window.addEventListener(transitionEvent, function() {
        adjust();
      	console.log('Transition complete!  This is the callback, no library needed!');
      });

      /*
      	The "whichTransitionEvent" can be swapped for "animation" instead of "transition" texts, as can the usage :)
      */
    }
  };
});
