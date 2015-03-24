$(function() {
  $(".js-scroll-top").on("click", function(event) {
    event.preventDefault();
    $.scrollTo("body", 1000);
  });
});