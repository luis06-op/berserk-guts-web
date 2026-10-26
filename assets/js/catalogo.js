/* ==========================================================================
   CATÁLOGO DE PERSONAJES — filtros, orden, paginación y ficha modal
   Requiere: datos.js (window.BERSERK) y bootstrap.bundle.min.js
   ========================================================================== */
(function () {
  "use strict";

  var DATOS = window.BERSERK;
  if (!DATOS) { return; }

  var POR_PAGINA = 12;

  var estado = {
    texto: "",
    faccion: "",
    situacion: "",
    orden: "nombre",
    pagina: 1
  };

  var el = {};
  var modal = null;

  /* Utilidades ------------------------------------------------------------ */

  function escapar(texto) {
    return String(texto)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizar(texto) {
    return String(texto)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function nombreFaccion(id) {
    var f = DATOS.facciones.find(function (item) { return item.id === id; });
    return f ? f.nombre : id;
  }

  function claseFaccion(id) {
    var f = DATOS.facciones.find(function (item) { return item.id === id; });
    return f ? f.clase : "solitario";
  }

  function nombreArco(id) {
    var a = DATOS.arcos.find(function (item) { return item.id === id; });
    return a ? a.titulo : id;
  }

  /* Filtrado y orden ------------------------------------------------------ */

  function filtrar() {
    var busqueda = normalizar(estado.texto.trim());

    var lista = DATOS.personajes.filter(function (personaje) {
      var coincideTexto = !busqueda || normalizar(
        [personaje.nombre, personaje.epiteto, personaje.rol, personaje.resumen].join(" ")
      ).indexOf(busqueda) !== -1;

      var coincideFaccion = !estado.faccion || personaje.faccion.indexOf(estado.faccion) !== -1;
      var coincideEstado = !estado.situacion || personaje.estado === estado.situacion;

      return coincideTexto && coincideFaccion && coincideEstado;
    });

    var comparadores = {
      nombre: function (a, b) { return a.nombre.localeCompare(b.nombre, "es"); },
      "nombre-desc": function (a, b) { return b.nombre.localeCompare(a.nombre, "es"); },
      faccion: function (a, b) {
        return nombreFaccion(a.faccion[0]).localeCompare(nombreFaccion(b.faccion[0]), "es");
      },
      estado: function (a, b) { return a.estado.localeCompare(b.estado, "es"); }
    };

    return lista.sort(comparadores[estado.orden] || comparadores.nombre);
  }

  /* Pintado de tarjetas --------------------------------------------------- */

  function tarjeta(personaje) {
    var faccionPrincipal = personaje.faccion[0];
    var situacion = DATOS.estados[personaje.estado] || DATOS.estados.desconocido;

    return [
      '<div class="col-12 col-sm-6 col-lg-4 col-xxl-3">',
      '  <article class="card-archivo reveal is-visible" aria-labelledby="titulo-' + escapar(personaje.id) + '">',
      '    <div class="card-archivo__media">',
      '      <img src="' + escapar(personaje.imagen) + '" alt="' + escapar(personaje.alt) + '"',
      '           width="400" height="500" loading="lazy" decoding="async">',
      '      <span class="emi-badge emi-badge--' + claseFaccion(faccionPrincipal) + ' emi-badge--posicion">' +
             escapar(nombreFaccion(faccionPrincipal)) + '</span>',
      '    </div>',
      '    <div class="card-archivo__cuerpo">',
      '      <h3 class="card-archivo__nombre" id="titulo-' + escapar(personaje.id) + '">' +
               escapar(personaje.nombre) + '</h3>',
      '      <p class="card-archivo__epiteto">' + escapar(personaje.epiteto) + '</p>',
      '      <p class="card-archivo__resumen">' + escapar(personaje.resumen) + '</p>',
      '      <div class="card-archivo__pie">',
      '        <span class="emi-estado emi-estado--' + situacion.clase + '">' + situacion.texto + '</span>',
      '        <button type="button" class="btn-enlace" data-personaje="' + escapar(personaje.id) + '"' +
      '                aria-label="Ver la ficha de ' + escapar(personaje.nombre) + '">Ver ficha</button>',
      '      </div>',
      '    </div>',
      '  </article>',
      '</div>'
    ].join("\n");
  }

  function paginacion(totalPaginas) {
    if (!el.paginacion) { return; }
    if (totalPaginas <= 1) {
      el.paginacion.innerHTML = "";
      return;
    }

    var botones = [];
    botones.push(
      '<li class="page-item' + (estado.pagina === 1 ? " disabled" : "") + '">' +
      '<button class="page-link" type="button" data-pagina="' + (estado.pagina - 1) + '"' +
      ' aria-label="Página anterior">&laquo;</button></li>'
    );

    for (var i = 1; i <= totalPaginas; i++) {
      botones.push(
        '<li class="page-item' + (i === estado.pagina ? " active" : "") + '">' +
        '<button class="page-link" type="button" data-pagina="' + i + '"' +
        (i === estado.pagina ? ' aria-current="page"' : "") +
        ' aria-label="Página ' + i + '">' + i + '</button></li>'
      );
    }

    botones.push(
      '<li class="page-item' + (estado.pagina === totalPaginas ? " disabled" : "") + '">' +
      '<button class="page-link" type="button" data-pagina="' + (estado.pagina + 1) + '"' +
      ' aria-label="Página siguiente">&raquo;</button></li>'
    );

    el.paginacion.innerHTML = botones.join("");
  }

  /* Tabla comparativa ----------------------------------------------------- */

  function pintarTabla() {
    var cuerpo = document.getElementById("cuerpoTabla");
    if (!cuerpo) { return; }

    var filas = DATOS.personajes.slice().sort(function (a, b) {
      return a.nombre.localeCompare(b.nombre, "es");
    });

    cuerpo.innerHTML = filas.map(function (personaje) {
      var situacion = DATOS.estados[personaje.estado] || DATOS.estados.desconocido;
      var principal = personaje.faccion[0];

      return [
        "<tr>",
        '  <th scope="row">',
        '    <button type="button" class="btn-enlace text-start text-transform-none" data-personaje="' +
               escapar(personaje.id) + '">' + escapar(personaje.nombre) + "</button>",
        '    <span class="d-block text-secondary-emphasis small">' + escapar(personaje.epiteto) + "</span>",
        "  </th>",
        '  <td><span class="emi-badge emi-badge--' + claseFaccion(principal) + '">' +
               escapar(nombreFaccion(principal)) + "</span></td>",
        "  <td class=\"small\">" + escapar(personaje.rol) + "</td>",
        '  <td><span class="emi-estado emi-estado--' + situacion.clase + '">' + situacion.texto + "</span></td>",
        '  <td class="text-end">' + personaje.arcos.length + "</td>",
        "</tr>"
      ].join("");
    }).join("");
  }

  function pintar() {    var lista = filtrar();
    var total = lista.length;
    var totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));

    if (estado.pagina > totalPaginas) { estado.pagina = totalPaginas; }

    var inicio = (estado.pagina - 1) * POR_PAGINA;
    var visibles = lista.slice(inicio, inicio + POR_PAGINA);

    el.rejilla.innerHTML = visibles.map(tarjeta).join("");

    if (el.vacio) {
      el.vacio.hidden = total !== 0;
      el.rejilla.hidden = total === 0;
    }

    if (el.contador) {
      if (total === 0) {
        el.contador.textContent = "Sin resultados";
      } else {
        el.contador.textContent = "Mostrando " + (inicio + 1) + "–" +
          (inicio + visibles.length) + " de " + total + " personajes";
      }
    }

    paginacion(totalPaginas);
  }

  /* Ficha ampliada en modal ---------------------------------------------- */

  function abrirFicha(id) {
    var personaje = DATOS.personajes.find(function (item) { return item.id === id; });
    if (!personaje || !modal) { return; }

    var situacion = DATOS.estados[personaje.estado] || DATOS.estados.desconocido;

    modal.querySelector("#personajeRetrato").src = personaje.imagen;
    modal.querySelector("#personajeRetrato").alt = personaje.alt;
    modal.querySelector("#modalPersonajeLabel").textContent = personaje.nombre;
    modal.querySelector("#personajeEpiteto").textContent = personaje.epiteto;

    modal.querySelector("#personajeFacciones").innerHTML = personaje.faccion.map(function (f) {
      return '<span class="emi-badge emi-badge--' + claseFaccion(f) + '">' +
             escapar(nombreFaccion(f)) + "</span>";
    }).join(" ");

    modal.querySelector("#personajeEstado").innerHTML =
      '<span class="emi-estado emi-estado--' + situacion.clase + '">' + situacion.texto + "</span>";

    modal.querySelector("#personajeDescripcion").innerHTML = personaje.descripcion.map(function (parrafo) {
      return "<p>" + escapar(parrafo) + "</p>";
    }).join("");

    modal.querySelector("#personajeHabilidades").innerHTML = personaje.habilidades.map(function (h) {
      return "<li>" + escapar(h) + "</li>";
    }).join("");

    modal.querySelector("#personajeArcos").innerHTML = personaje.arcos.map(function (arco) {
      return '<li><span class="emi-badge emi-badge--solitario">' + escapar(nombreArco(arco)) + "</span></li>";
    }).join("");

    modal.querySelector("#personajeDatos").innerHTML = [
      "<li><span>Papel</span><span>" + escapar(personaje.rol) + "</span></li>",
      "<li><span>Primera aparición</span><span>" + escapar(personaje.primera) + "</span></li>",
      "<li><span>Arcos</span><span>" + personaje.arcos.length + "</span></li>"
    ].join("");

    modal.querySelector("#personajeSpoiler").hidden = !personaje.spoiler;

    modal.show();
  }

  /* Eventos --------------------------------------------------------------- */

  function reiniciarFiltros() {
    estado.texto = "";
    estado.faccion = "";
    estado.situacion = "";
    estado.orden = "nombre";
    estado.pagina = 1;

    if (el.buscador) { el.buscador.value = ""; }
    if (el.faccion) { el.faccion.value = ""; }
    if (el.situacion) { el.situacion.value = ""; }
    if (el.orden) { el.orden.value = "nombre"; }

    pintar();
  }

  function iniciar() {
    el.rejilla = document.getElementById("rejillaPersonajes");
    if (!el.rejilla) { return; }

    el.buscador = document.getElementById("buscador");
    el.faccion = document.getElementById("filtroFaccion");
    el.situacion = document.getElementById("filtroEstado");
    el.orden = document.getElementById("filtroOrden");
    el.contador = document.getElementById("contadorResultados");
    el.paginacion = document.getElementById("paginacion");
    el.vacio = document.getElementById("estadoVacio");

    DATOS.facciones.forEach(function (f) {
      if (el.faccion) {
        el.faccion.insertAdjacentHTML("beforeend",
          '<option value="' + escapar(f.id) + '">' + escapar(f.nombre) + "</option>");
      }
    });

    if (el.buscador) {
      var temporizador = null;
      el.buscador.addEventListener("input", function () {
        window.clearTimeout(temporizador);
        temporizador = window.setTimeout(function () {
          estado.texto = el.buscador.value;
          estado.pagina = 1;
          pintar();
        }, 180);
      });
    }

    if (el.faccion) {
      el.faccion.addEventListener("change", function () {
        estado.faccion = el.faccion.value;
        estado.pagina = 1;
        pintar();
      });
    }

    if (el.situacion) {
      el.situacion.addEventListener("change", function () {
        estado.situacion = el.situacion.value;
        estado.pagina = 1;
        pintar();
      });
    }

    if (el.orden) {
      el.orden.addEventListener("change", function () {
        estado.orden = el.orden.value;
        pintar();
      });
    }

    document.querySelectorAll("[data-limpiar-filtros]").forEach(function (boton) {
      boton.addEventListener("click", reiniciarFiltros);
    });

    /* Delegación global: sirve tanto para las tarjetas como para la tabla. */
    document.addEventListener("click", function (evento) {
      var boton = evento.target.closest("[data-personaje]");
      if (boton) { abrirFicha(boton.getAttribute("data-personaje")); }
    });

    if (el.paginacion) {
      el.paginacion.addEventListener("click", function (evento) {
        var boton = evento.target.closest("[data-pagina]");
        if (!boton || boton.parentElement.classList.contains("disabled")) { return; }

        var destino = parseInt(boton.getAttribute("data-pagina"), 10);
        if (isNaN(destino)) { return; }

        estado.pagina = destino;
        pintar();

        var ancla = document.getElementById("resultados");
        if (ancla) {
          var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          ancla.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        }
      });
    }
    var nodoModal = document.getElementById("modalPersonaje");
    if (nodoModal && window.bootstrap) {
      modal = new bootstrap.Modal(nodoModal);
      nodoModal.addEventListener("hidden.bs.modal", function () {
        modal.querySelector("#personajeRetrato").removeAttribute("src");
      });
    }

    /* Parámetros de la URL: personajes.html?faccion=guts&estado=vivo */
    var parametros = new URLSearchParams(window.location.search);
    var faccionUrl = parametros.get("faccion");
    var estadoUrl = parametros.get("estado");

    if (faccionUrl && el.faccion && DATOS.facciones.some(function (f) { return f.id === faccionUrl; })) {
      estado.faccion = faccionUrl;
      el.faccion.value = faccionUrl;
    }
    if (estadoUrl && el.situacion && DATOS.estados[estadoUrl]) {
      estado.situacion = estadoUrl;
      el.situacion.value = estadoUrl;
    }

    pintar();
    pintarTabla();

    /* Enlace directo desde otras páginas: personajes.html#guts */
    var destino = window.location.hash.replace("#", "");
    if (destino) {
      var personaje = DATOS.personajes.find(function (item) { return item.id === destino; });
      if (personaje) { abrirFicha(personaje.id); }
    }
  }

  document.addEventListener("DOMContentLoaded", iniciar);
})();
