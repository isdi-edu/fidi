$(function() {

  $("[data-proyecto-social]").on("click", function(event) {
    event.preventDefault();

    var $seccionDelEnlace = $(this).parents(".js-seccion");
    var $seccionProyectos = $(".js-seccion-proyectos");
    var $target = $($(this).attr("href"));
    var $triangulo = $seccionProyectos.find(".js-proyectos-triangulo");

    // Mostramos la sección de proyectos
    if ($seccionProyectos.is(":hidden")) {
      $seccionProyectos.fadeIn();
    }

    // Mostramos los proyectos de la entidad social
    if ($target.is(":hidden")) {
      $target.parent().children().hide();
      $target.fadeIn();
    }

    // Ajustamos la posición del triángulo
    var trianguloMarginLeft = ($(window).width() / 2) - $(this).offset().left - ($(this).width() / 2) + 15;
    $triangulo.css("margin-left", -trianguloMarginLeft);

  });

  $(".js-proyectos-cerrar").on("click", function(event) {
    event.preventDefault();

    var $seccionProyectos = $(".js-seccion-proyectos");
    $seccionProyectos.fadeOut('fast');
  });

});