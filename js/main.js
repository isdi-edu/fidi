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

  $('[data-toggle="tooltip"]').tooltip({
    trigger: 'hover click'
  });

  var lang = navigator.language || navigator.userLanguage;
  var options;
  if (lang.toLowerCase().startsWith("es")) {
    options = {
      message: "Utilizamos cookies para conocer cómo te mueves por la web. Si aceptas o continuas navegando, entendemos que estás de acuerdo con su uso.",
      acceptText: "Acepto",
      policyText: "Política de cookies"
    }
  } else {
    options = {
      message: "We use cookies to understand how you move through the web. If you accept or continuous browsing, we understand that you agree with its use.",
      acceptText: "Accept",
      policyText: "Cookies policy"
    }
  }
  $.cookieBar(options);
});
