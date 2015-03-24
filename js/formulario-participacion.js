$(function() {

  var formulario = $("#participacionForm");

  $('#participarModal')
    .on('show.bs.modal', function (event) {
      var $button = $(event.relatedTarget);
      var nombreProyecto = $button.data('proyecto');
      var $modal = $(this);

      // borrando formulario
      $modal.find("input").val("");
      $modal.find("select").val("");

      // especificando nombre del proyecto
      $modal.find('.js-nombre-proyecto').text(nombreProyecto);
      $modal.find(".js-hidden-proyecto").val(nombreProyecto);
    })
    .on('shown.bs.modal', function(event) {
      var $modal = $(this);
      $modal.find("#nombre").focus();
    });

  $("#apuntarse-proyecto").on("click", function(event) {
      event.preventDefault();

      var $msgFormularioError = $(".js-formulario-error"),
          $msgFormularioOk = $(".js-formulario-ok"),
          $modalHeader = $(".js-modal-header"),
          $loading = $(".js-frm-loading"),
          $formulario = $("#participacionForm");

      if (!$formulario.valid()) return;

      $loading.fadeIn();

      send(buildEmailBody(), function() {
        $loading.hide();
        $formulario.hide();
        $modalHeader.hide();
        $msgFormularioOk.fadeIn();
      }, function() {
        $loading.hide();
        $msgFormularioError.fadeIn();
      });
  });

  function buildEmailBody() {
    var nombre = $("#nombre"),
        apellidos = $("#apellidos"),
        email = $("#email"),
        edicionMib = $("#edicionMib"),
        proyecto = $("#proyecto");

    return "Se ha rellenado una petición de participación:\n\n" +
           "Proyecto: " + proyecto.val() + "\n" +
           "Nombre: " + nombre.val() + "\n" +
           "Apellidos: " + apellidos.val() + "\n" +
           "Email: " + email.val() + "\n" +
           "Edición MIB: " + edicionMib.val() + "\n";
  }

  function send(body, successCallback, errorCallback) {
    var m = new mandrill.Mandrill('IoRuZOqhBJlrgrf2BCyfag');
    var params = {
      "message": {
        "from_email":"biko.isdi@gmail.com",
        "to":[{"email":"biko.isdi@gmail.com"}],
        "subject": "Landing ISDI, petición de participación en proyecto",
        "text": body
      }
    };
    m.messages.send(params, successCallback, errorCallback);
  }
});