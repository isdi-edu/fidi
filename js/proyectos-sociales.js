$(function() {

  function isDesktop() {
    return $("html").hasClass("desktop");
  }

  $("[data-proyecto-social]").on("click", function(event) {
    event.preventDefault();
    entidadSocialClicked($(this));
  });

  if(isDesktop()) {
    $("[data-proyecto-social]").on("mouseenter", function(event) {
      event.preventDefault();
      entidadSocialClicked($(this));
    });
  }

  function entidadSocialClicked($enlaceEntidad) {
    var $seccionDelEnlace = $enlaceEntidad.parents(".js-seccion");
    
    var $target = $($enlaceEntidad.attr("href"));
    var $triangulo = $(".js-proyectos-triangulo");

    showSeccionProyectos();

    // Mostramos los proyectos de la entidad social
    if ($target.is(":hidden")) {
      $target.parent().children().hide();
      $target.fadeIn();
    }

    // Ajustamos la posición del triángulo
    var trianguloMarginLeft = ($(window).width() / 2) - $enlaceEntidad.offset().left - ($enlaceEntidad.width() / 2) + 15;
    $triangulo.css("margin-left", -trianguloMarginLeft);
  }

  function showSeccionProyectos() {
    var $seccionProyectos = $(".js-seccion-proyectos");

    // Mostramos la sección de proyectos
    if ($seccionProyectos.is(":hidden")) {
      if (isDesktop()) $seccionProyectos.fadeIn();
      else $seccionProyectos.show();
    }

    if (!isDesktop()) {
      $.scrollTo($seccionProyectos, 400, { offset: -100 });
    }
  }

  $(".js-proyectos-cerrar").on("click", function(event) {
    event.preventDefault();

    var $seccionProyectos = $(".js-seccion-proyectos");
    $seccionProyectos.hide();
  });

});