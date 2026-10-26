/* ==========================================================================
   FORMULARIO DE SUGERENCIAS — validación, contador y confirmación
   Requiere: datos.js (window.BERSERK) y bootstrap.bundle.min.js
   ========================================================================== */
(function () {
  "use strict";

  var DATOS = window.BERSERK;

  function escapar(texto) {
    return String(texto)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var formulario = document.getElementById("formularioSugerencia");
    if (!formulario) { return; }

    var nombre = document.getElementById("nombre");
    var correo = document.getElementById("correo");
    var tipo = document.getElementById("tipo");
    var personaje = document.getElementById("personaje");
    var arco = document.getElementById("arco");
    var mensaje = document.getElementById("mensaje");
    var autorizacion = document.getElementById("autorizacion");
    var contador = document.getElementById("contadorMensaje");
    var resumen = document.getElementById("resumenErrores");
    var listaErrores = document.getElementById("listaErrores");
    var estadoEnvio = document.getElementById("estadoEnvio");
    var valoracionTexto = document.getElementById("valoracionTexto");
    var estrellas = formulario.querySelectorAll('input[name="valoracion"]');

    var MAX_MENSAJE = 600;
    var MIN_MENSAJE = 20;

    /* Opciones dependientes de los datos ---------------------------------- */

    if (DATOS) {
      if (personaje) {
        DATOS.personajes
          .slice()
          .sort(function (a, b) { return a.nombre.localeCompare(b.nombre, "es"); })
          .forEach(function (item) {
            personaje.insertAdjacentHTML("beforeend",
              '<option value="' + escapar(item.id) + '">' + escapar(item.nombre) + " · " +
              escapar(item.epiteto) + "</option>");
          });
      }

      if (arco) {
        DATOS.arcos.forEach(function (item) {
          arco.insertAdjacentHTML("beforeend",
            '<option value="' + escapar(item.id) + '">' + escapar(item.numero + ". " + item.titulo) +
            "</option>");
        });
      }
    }

    /* Contador de caracteres ---------------------------------------------- */

    function actualizarContador() {
      if (!mensaje || !contador) { return; }
      var usados = mensaje.value.length;
      contador.textContent = usados + " / " + MAX_MENSAJE;
      contador.dataset.limite = usados > MAX_MENSAJE ? "excedido"
        : usados > MAX_MENSAJE * 0.9 ? "cerca" : "normal";
    }

    if (mensaje) {
      mensaje.addEventListener("input", function () {
        actualizarContador();
        if (mensaje.value.trim().length >= MIN_MENSAJE) {
          mensaje.setCustomValidity("");
        }
      });
      actualizarContador();
    }

    /* Valoración con estrellas -------------------------------------------- */

    var etiquetas = ["Sin valorar", "Muy flojo", "Flojo", "Correcto", "Notable", "Imprescindible"];

    estrellas.forEach(function (radio) {
      radio.addEventListener("change", function () {
        if (valoracionTexto) {
          valoracionTexto.textContent = etiquetas[Number(radio.value)] || "";
        }
        var grupo = document.getElementById("grupoValoracion");
        if (grupo) { grupo.classList.remove("is-invalid"); }
      });
    });

    /* Errores -------------------------------------------------------------- */

    function limpiarResumen() {
      if (!resumen) { return; }
      resumen.hidden = true;
      if (listaErrores) { listaErrores.innerHTML = ""; }
    }

    function mostrarResumen(mensajes) {
      if (!resumen || !listaErrores) { return; }
      listaErrores.innerHTML = mensajes.map(function (texto) {
        return "<li>" + escapar(texto) + "</li>";
      }).join("");
      resumen.hidden = false;
      resumen.focus();
    }

    function validar() {
      var problemas = [];

      if (mensaje) {
        if (mensaje.value.trim().length < MIN_MENSAJE) {
          mensaje.setCustomValidity(
            "Escribe al menos " + MIN_MENSAJE + " caracteres para explicar tu sugerencia."
          );
        } else {
          mensaje.setCustomValidity("");
        }
      }

      var seleccion = formulario.querySelector('input[name="valoracion"]:checked');
      var grupo = document.getElementById("grupoValoracion");
      if (grupo) { grupo.classList.toggle("is-invalid", !seleccion); }

      if (!nombre.checkValidity()) {
        problemas.push("El nombre debe tener al menos 3 caracteres.");
      }
      if (!correo.checkValidity()) {
        problemas.push("El correo electrónico no tiene un formato válido.");
      }
      if (!tipo.checkValidity()) {
        problemas.push("Selecciona el tipo de sugerencia.");
      }
      if (mensaje && !mensaje.checkValidity()) {
        problemas.push("La sugerencia debe tener entre " + MIN_MENSAJE + " y " + MAX_MENSAJE + " caracteres.");
      }
      if (!seleccion) {
        problemas.push("Valora la obra con una puntuación de 1 a 5 estrellas.");
      }
      if (!autorizacion.checked) {
        problemas.push("Debes autorizar el uso educativo de tu aporte.");
      }

      return problemas;
    }

    /* Envío ---------------------------------------------------------------- */

    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();
      limpiarResumen();

      var problemas = validar();
      formulario.classList.add("was-validated");

      if (problemas.length > 0) {
        mostrarResumen(problemas);
        var primerInvalido = formulario.querySelector(":invalid");
        if (primerInvalido) {
          primerInvalido.focus({ preventScroll: false });
        }
        return;
      }

      /* Confirmación: se muestra el resumen en el modal. */
      var modalNodo = document.getElementById("modalEnvio");
      if (modalNodo && window.bootstrap) {
        var seleccion = formulario.querySelector('input[name="valoracion"]:checked');
        var opcionPersonaje = personaje && personaje.selectedOptions[0];
        var opcionArco = arco && arco.selectedOptions[0];

        modalNodo.querySelector("#envioNombre").textContent = nombre.value.trim();
        modalNodo.querySelector("#envioTipo").textContent = tipo.selectedOptions[0].textContent;
        modalNodo.querySelector("#envioPersonaje").textContent =
          opcionPersonaje && opcionPersonaje.value ? opcionPersonaje.textContent : "Sin preferencia";
        modalNodo.querySelector("#envioArco").textContent =
          opcionArco && opcionArco.value ? opcionArco.textContent : "Sin preferencia";
        modalNodo.querySelector("#envioValoracion").textContent = seleccion
          ? seleccion.value + " de 5 · " + etiquetas[Number(seleccion.value)]
          : "Sin valorar";

        bootstrap.Modal.getOrCreateInstance(modalNodo).show();

        modalNodo.addEventListener("hidden.bs.modal", function reiniciar() {
          modalNodo.removeEventListener("hidden.bs.modal", reiniciar);
          formulario.reset();
          formulario.classList.remove("was-validated");
          limpiarResumen();
          actualizarContador();
          if (valoracionTexto) { valoracionTexto.textContent = "Sin valorar"; }
          document.querySelectorAll("#grupoValoracion .is-invalid").forEach(function (nodo) {
            nodo.classList.remove("is-invalid");
          });
          if (estadoEnvio) {
            estadoEnvio.textContent = "Formulario reiniciado. Puedes enviar otra sugerencia.";
          }
          nombre.focus();
        });
      }
    });

    /* Al corregir un campo, se oculta el resumen de errores. */
    formulario.addEventListener("input", function (evento) {
      if (resumen && !resumen.hidden && evento.target.checkValidity()) {
        limpiarResumen();
      }
    });

    if (estadoEnvio) {
      estadoEnvio.textContent = "Formulario listo para completar.";
    }
  });
})();
