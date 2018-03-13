/*global $ PL */
$.rm({
    name: "PL.gallery.galleryListHandler",
    impl: function (config) {

        function populateCarousel(jsonResponse) {
            var json = $.parseJSON(jsonResponse),
                $galleryCarouselContentContainer = $(".carousel.gallery_page ul.content-cont"),
                $controlContainer = $(".carousel.gallery_page .controls ul"),
                $carouselElements;

            $galleryCarouselContentContainer.empty();

            $.each(json.imageList, function(i, v) {
                $galleryCarouselContentContainer.append($("<li>").addClass("cf").attr("id", "car-" + i).append($("<img>").attr("src", "/imageDisplay.html?id=" + v.id)));
            });
            $("li:first", $galleryCarouselContentContainer).addClass("active");
            $carouselElements = $(".carousel.gallery_page .content-cont li");
            PL.common.carousel.$currentlyActiveContent = $("li:first", $galleryCarouselContentContainer);
            PL.common.carousel.$currentlyActiveControl = $("li:first", $controlContainer);
            PL.common.carousel.refreshControls($carouselElements, $controlContainer);

        }

        return {
                init: function () {

                var $galleryLinks = $("a",".gallery_list");

                $galleryLinks.click(function(e){

                    $.ajax({
                        url: "/turaKepek.html",
                        type: "POST",
                        data: ({
                          tripId: $(this).attr("id")
                        }),
                        success: function(response) {
                          populateCarousel(response);
                        },
                        error: function(response) {
                          alert("Technikai okokból a képlista letöltése nem lehetséges.\nKérjük próbálja újra később.");
                        }
                      });

                    $.each($galleryLinks, function() {
                        $(this).removeClass("active");
                    });
                    $(this).addClass("active");
                    e.preventDefault();
                });
                $($galleryLinks[0]).trigger("click");
            }
        };
    }
});
