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

app.directive("loadmoredata", [function() {
        return {
            restrict: 'A',
            link: function($scope, element, attrs, ctrl) {
                var raw = element[0];
                var e = jQuery(element[0]);
                var doc = jQuery(document);
                angular.element(document).bind('scroll', function() {
                    if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight){
                        $scope.$apply("getArtImages()");
                    }
                });
            }
        }; 
}]);

app.directive('scrollTrigger', function($window) {
    return {
        link : function(scope, element, attrs) {
            var offset = parseInt(attrs.threshold) || 0;
            var e = jQuery(element[0]);
            var doc = jQuery(document);
            angular.element(document).bind('scroll', function() {
              console.log('scroll');
                if (doc.scrollTop() + $window.innerHeight + offset > e.offset().top) {
                    scope.$apply("getArtImages()");
                }
            });
        }
    };
});

app.directive('colorgrid', function() {
    return {
        scope: true,
        restrict: 'AE',
        templateUrl: 'colorgrid.html',
        controller: function($scope) {
            $scope.colors = {
  // "aliceblue": "#f0f8ff",
  // "antiquewhite": "#faebd7",
  // "aqua": "#00ffff",
  // "aquamarine": "#7fffd4",
  // "azure": "#f0ffff",
  // "beige": "#f5f5dc",
  // "bisque": "#ffe4c4",
  // "black": "#000000",
  // "blanchedalmond": "#ffebcd",
  // "blue": "#0000ff",
  // "blueviolet": "#8a2be2",
  // "brown": "#a52a2a",
  // "burlywood": "#deb887",
  // "cadetblue": "#5f9ea0",
  // "chartreuse": "#7fff00",
  // "chocolate": "#d2691e",
  // "coral": "#ff7f50",
  // "cornflowerblue": "#6495ed",
  // "cornsilk": "#fff8dc",
  // "crimson": "#dc143c",
  // "cyan": "#00ffff",
  // "darkblue": "#00008b",
  // "darkcyan": "#008b8b",
  // "darkgoldenrod": "#b8860b",
  // "darkgray": "#a9a9a9",
  // "darkgreen": "#006400",
  // "darkgrey": "#a9a9a9",
  // "darkkhaki": "#bdb76b",
  // "darkmagenta": "#8b008b",
  // "darkolivegreen": "#556b2f",
  // "darkorange": "#ff8c00",
  // "darkorchid": "#9932cc",
  // "darkred": "#8b0000",
  // "darksalmon": "#e9967a",
  // "darkseagreen": "#8fbc8f",
  // "darkslateblue": "#483d8b",
  // "darkslategray": "#2f4f4f",
  // "darkslategrey": "#2f4f4f",
  // "darkturquoise": "#00ced1",
  // "darkviolet": "#9400d3",
  // "deeppink": "#ff1493",
  // "deepskyblue": "#00bfff",
  // "dimgray": "#696969",
  // "dimgrey": "#696969",  
  // "firebrick": "#b22222",
  // "floralwhite": "#fffaf0",
  // "forestgreen": "#228b22",
  // "fuchsia": "#ff00ff",
  // "gainsboro": "#dcdcdc",
  // "ghostwhite": "#f8f8ff",
  // "gold": "#ffd700",
  // "goldenrod": "#daa520",
  // "gray": "#808080",
  // "green": "#008000",
  // "greenyellow": "#adff2f",
  // "grey": "#808080",
  // "honeydew": "#f0fff0",
  // "hotpink": "#ff69b4",
  // "indianred": "#cd5c5c",
  // "indigo": "#4b0082",
  // "ivory": "#fffff0",
  // "khaki": "#f0e68c",
  // "lavender": "#e6e6fa",
  // "lavenderblush": "#fff0f5",
  // "lawngreen": "#7cfc00",
  // "lemonchiffon": "#fffacd",
  // "lightblue": "#add8e6",
  // "lightcoral": "#f08080",
  // "lightcyan": "#e0ffff",
  // "lightgoldenrodyellow": "#fafad2",
  // "lightgray": "#d3d3d3",
  // "lightgreen": "#90ee90",
  // "lightgrey": "#d3d3d3",
  // "lightpink": "#ffb6c1",
  // "lightsalmon": "#ffa07a",
  // "lightseagreen": "#20b2aa",
  // "lightskyblue": "#87cefa",
  // "lightslategray": "#778899",
  // "lightslategrey": "#778899",
  // "lightsteelblue": "#b0c4de",
  // "lightyellow": "#ffffe0",
  // "lime": "#00ff00",
  // "limegreen": "#32cd32",
  // "linen": "#faf0e6",
  // "magenta": "#ff00ff",
  // "maroon": "#800000",
  // "mediumaquamarine": "#66cdaa",
  // "mediumblue": "#0000cd",
  // "mediumorchid": "#ba55d3",
  // "mediumpurple": "#9370db",
  // "mediumseagreen": "#3cb371",
  // "mediumslateblue": "#7b68ee",
  // "mediumspringgreen": "#00fa9a",
  // "mediumturquoise": "#48d1cc",
  // "mediumvioletred": "#c71585",
  // "midnightblue": "#191970",
  // "mintcream": "#f5fffa",
  // "mistyrose": "#ffe4e1",
  // "moccasin": "#ffe4b5",
  // "navajowhite": "#ffdead",
  // "navy": "#000080",
  // "oldlace": "#fdf5e6",
  // "olive": "#808000",
  // "olivedrab": "#6b8e23",
  // "orange": "#ffa500",
  // "orangered": "#ff4500",
  // "orchid": "#da70d6",
  // "palegoldenrod": "#eee8aa",
  // "palegreen": "#98fb98",
  // "paleturquoise": "#afeeee",
  // "palevioletred": "#db7093",
  // "papayawhip": "#ffefd5",
  // "peachpuff": "#ffdab9",
  // "peru": "#cd853f",
  // "pink": "#ffc0cb",
  // "plum": "#dda0dd",
  // "powderblue": "#b0e0e6",
  // "purple": "#800080",
  // "rebeccapurple": "#663399",  
  // "rosybrown": "#bc8f8f",
  // "royalblue": "#4169e1",
  // "saddlebrown": "#8b4513",
  // "salmon": "#fa8072",
  // "sandybrown": "#f4a460",
  // "seagreen": "#2e8b57",
  // "seashell": "#fff5ee",
  // "sienna": "#a0522d",
  // "silver": "#c0c0c0",
  
  // "slateblue": "#6a5acd",
  // "slategray": "#708090",
  // "slategrey": "#708090",
  // "snow": "#fffafa",
  // "springgreen": "#00ff7f",
  // "steelblue": "#4682b4",
  // "tan": "#d2b48c",
  // "teal": "#008080",
  // "thistle": "#d8bfd8",
  // "tomato": "#ff6347",
  
  // "violet": "#ee82ee",
  // "wheat": "#f5deb3",
  "White": "#ffffff",
  "Very Light Grey": "#CECECE",
  "Dim Gray": "#666666",
  "Golden Brown": "#9A6600",
  "Orange Peel": "#FE9901",
  "Peach Orange": "#FFCB99",
  // "whitesmoke": "#f5f5f5",
  "yellow": "#ffff00",
  "Electric Lime": "#CCFF00",
  "yellowgreen": "#9acd32",
  "Free Speech Green": "#01CC00",  
  "turquoise": "#40e0d0",
  "Skyblue": "#87ceeb",
  "dodgerblue": "#1e90ff",  
  "Electric Indigo": "#6601FF",
  "Electric Purple": "#CC00FF",
  "Hollywood Cerise": "#FF0198",
  "red": "#ff0000",
}
        }
    }
});
app.directive("loadmoredata", ['$document' ,function($document) {
  console.log('here');
        return {
            restrict: 'A',
            link: function($scope, element, attrs, ctrl) {
                var raw = element[0];
                console.log(raw, element);
                $document.bind('scroll', function() {
                    if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight){
                        $scope.$apply("getArtImages()");
                    }
                });
            }
        };
 
}])

