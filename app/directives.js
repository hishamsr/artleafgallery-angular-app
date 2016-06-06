app.directive("slider", ['$timeout', function ($timeout) {
   return {
      restrict: "E",
      scope: true,
      link: function (scope, elem, attrs) {

        //starting slider
        scope.onEnd = function(){
          $timeout(settings, 100);
        }

        //settings
        var settings = function(){

            //vars        // fadein     // fadeout
            var config = {'delay': 100, 'duration': 1200 };
            var elemSlider = elem;
            var elemSliderContent = elem.find('slide-content');
            var elemImgSrc = elemSliderContent.find('img');
            var elemPeaDesc = elem.find('pea-desc');
            var elemSlideSrc = elem.find('slide-img');
            var vectorSlide = elemSlideSrc.length;
            var num = 0;
            var pull = null;
            var rotate = 0;
            var rotateMin = 3999;
            var describeActive = false;

            prevAndNext(num);
            rotate          = elemSlider.attr('rotate');
            describeActive  = elemSlider.attr('describe');

            scope.sliderNext = function (){
                if (num+1 == vectorSlide){
                  num = 0;
                }else{
                  num++;
            	}
              	prevAndNext(num);
            }

            scope.sliderPrev = function (){
                if(num == 0){
                  num = vectorSlide-1;
                }else{
                  num--;
                }
                prevAndNext(num);
            }

            // func PREV AND NEXT
            function prevAndNext(num){
                var attrImgLink = elemSlideSrc.eq(num).attr('img-src');
                //var attrImgDesc = elemSlideSrc.eq(num).attr('img-desc');
                var attrImgName = elemSlideSrc.eq(num).attr('img-name');
                var timeFadeout = $timeout(function(){
                                      //add class
                                      elemSliderContent.addClass('fadeout');
                                      elemSlider.addClass('pea-slider-loading');
                                      //Cancela Timout
                                      $timeout.cancel(timeFadeout);
                                    }, config.delay);

                var timeFadein = $timeout(function(){                                      
                                      elemImgSrc.attr('src', attrImgLink);
                                      //scope.describe = attrImgDesc;
                                      scope.slider_product_name = attrImgName;
                                      elemImgSrc.bind('load', function() {
                                                     elemImgSrc.removeClass('is-hidden-img');
                                                     elemSliderContent.removeClass('fadeout');
                                                     elemSlider.removeClass('pea-slider-loading');
                                                     //descriptionVerify(describeActive, attrImgDesc);
                                                     $timeout.cancel(timeFadein);
                                                  });
                                  
                                    }, config.duration);
                rotateVerify();
            }
            rotateVerify();
            function rotateVerify(){
                if (rotate > rotateMin) {

                    if (pull != null) {
                        $timeout.cancel(pull);
                    }

                    pull = $timeout(scope.sliderNext, rotate);
                }
            }
            elemSlider.bind('mouseover', function() {
                 $timeout.cancel(pull);
            });
            elemSlider.bind('mouseout', function() {
                 rotateVerify();
            });
            function descriptionVerify(active, desc){
                if (active === "true" && desc != "") {

                  if (elemPeaDesc.length > 0 && desc != undefined) {
                    elemPeaDesc.removeClass('is-hidden-img');
                  }else if(desc == undefined){
                    alert('Falta o Atributo img-desc="{{value}}" na TAG slide-img !');
                  }else{
                    alert('Falta o Elemento: <pea-desc ng-bind="describe" class="is-hidden-img"></pea-desc> !');
                  }

                }else{
                  elemPeaDesc.addClass('is-hidden-img');
                }

            }

        }

      }

   };
}]);


app.directive("repeatEnd", [function(){
    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attrs) {

            if (scope.$last) {
                scope.$eval(attrs.repeatEnd);
            }

        }
    };
}]);