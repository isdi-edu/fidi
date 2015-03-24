$(function() {
  $(".js-scroll-top").on("click", function(event) {
    event.preventDefault();
    $.scrollTo("body", 1000);
  });

  $(".js-scroll").on("click", function(event) {
    event.preventDefault();
    var duration = parseInt($(this).data("duration"));
    $.scrollTo("a[name='" + $(this).attr("href").substring(1) + "']", duration);
  });
});