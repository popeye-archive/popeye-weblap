/*global $ PL */
$.rm({
    name: "PL.common.carousel",
    impl: function (config) {
        
        return {
                refreshControls: function($carouselElements, $controlContainer) {
                    $controlContainer.empty();
                    $carouselElements.each(function(){
                        $controlContainer.append($("<li>").addClass($(this).attr("id")).append($("<span>").addClass("l")).append($("<span>").addClass("r")));
                    });
                    PL.common.carousel.$currentlyActiveControl = $(".carousel .controls ul li:first");
                    $("li:first", $controlContainer).addClass("active");
                },
                
                $carouselElements: $(".carousel .content-cont li"),
                $currentlyActiveContent: $(".carousel .content-cont li:first"),
                $controlContainer: $(".carousel .controls ul"),
                $currentlyActiveControl: null,
                
                init: function () {
                
                    PL.common.carousel.refreshControls(PL.common.carousel.$carouselElements, PL.common.carousel.$controlContainer);
                
                    $("li", PL.common.carousel.$controlContainer).live("click", function(){
                        if (!$(this).hasClass("active")) {
                            var toActivate = $("#" + $(this).attr("class")),
                                c = PL.common.carousel;
                        
                            //Update carousel contents:
                            c.$currentlyActiveContent.removeClass("active");
                            c.$currentlyActiveContent = toActivate;
                            c.$currentlyActiveContent.addClass("active");
                        
                            //Update controls:
                            c.$currentlyActiveControl.removeClass("active");
                            c.$currentlyActiveControl = $(this);
                            c.$currentlyActiveControl.addClass("active");
                        }
                    });
                
                    $("div", $(".carousel .controls")).live("click", function(){
                        var c = PL.common.carousel;
                        if ($(this).hasClass("right")) {
                            if (c.$currentlyActiveControl !== $("li:last", c.$controlContainer)) {
                                c.$currentlyActiveControl.next().trigger("click");
                            }
                        } else {
                            if (c.$currentlyActiveControl !== $("li:first", c.$controlContainer)) {
                                c.$currentlyActiveControl.prev().trigger("click");
                            }
                        }
                    });
                }
        };
    }
});
