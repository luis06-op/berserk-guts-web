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
  var nodoModal = null;
  var aviso = null;
  var nodoAviso = null;

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

  function buscarPersonaje(id) {
    return DATOS.personajes.find(function (item) { return item.id === id; });
  }

  function enlaceExterno(url, texto, etiqueta) {
    return '<a class="btn-enlace btn-enlace--externo" href="' + escapar(url) + '"' +
           ' target="_blank" rel="noopener noreferrer" aria-label="' + escapar(etiqueta) + '">' +
           escapar(texto) + ' <span aria-hidden="true">↗</span></a>';
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
      '        <span class="card-archivo__acciones">',
      '          <button type="button" class="btn-enlace" data-personaje="' + escapar(personaje.id) + '"' +
      '                  aria-label="Ver la ficha de ' + escapar(personaje.nombre) + '">Ver ficha</button>',
      '          ' + enlaceExterno(personaje.wiki, "Wiki",
                                    "Abrir la ficha de " + personaje.nombre + " en el wiki de Berserk (sitio externo)"),
      '        </span>',
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
    var personaje = buscarPersonaje(id);
    if (!personaje) { return; }

    /* Sin modal disponible (Bootstrap no cargó) se redirige a la ficha externa. */
    if (!nodoModal) {
      window.open(personaje.wiki, "_blank", "noopener");
      return;
    }

    var situacion = DATOS.estados[personaje.estado] || DATOS.estados.desconocido;

    /* OJO: `modal` es la instancia de Bootstrap, que no sabe nada del DOM.
       Las búsquedas internas se hacen siempre sobre el elemento `nodoModal`. */
    nodoModal.querySelector("#personajeRetrato").src = personaje.imagen;
    nodoModal.querySelector("#personajeRetrato").alt = personaje.alt;
    nodoModal.querySelector("#modalPersonajeLabel").textContent = personaje.nombre;
    nodoModal.querySelector("#personajeEpiteto").textContent = personaje.epiteto;

    nodoModal.querySelector("#personajeFacciones").innerHTML = personaje.faccion.map(function (f) {
      return '<span class="emi-badge emi-badge--' + claseFaccion(f) + '">' +
             escapar(nombreFaccion(f)) + "</span>";
    }).join(" ");

    nodoModal.querySelector("#personajeEstado").innerHTML =
      '<span class="emi-estado emi-estado--' + situacion.clase + '">' + situacion.texto + "</span>";

    nodoModal.querySelector("#personajeDescripcion").innerHTML = personaje.descripcion.map(function (parrafo) {
      return "<p>" + escapar(parrafo) + "</p>";
    }).join("");

    nodoModal.querySelector("#personajeHabilidades").innerHTML = personaje.habilidades.map(function (h) {
      return "<li>" + escapar(h) + "</li>";
    }).join("");

    nodoModal.querySelector("#personajeArcos").innerHTML = personaje.arcos.map(function (arco) {
      return '<li><a class="emi-badge emi-badge--solitario text-decoration-none"' +
             ' href="arcos.html#' + escapar(arco) + '">' + escapar(nombreArco(arco)) + "</a></li>";
    }).join("");

    nodoModal.querySelector("#personajeDatos").innerHTML = [
      "<li><span>Papel</span><span>" + escapar(personaje.rol) + "</span></li>",
      "<li><span>Primera aparición</span><span>" + escapar(personaje.primera) + "</span></li>",
      "<li><span>Arcos</span><span>" + personaje.arcos.length + "</span></li>"
    ].join("");

    nodoModal.querySelector("#personajeSpoiler").hidden = !personaje.spoiler;

    var wiki = nodoModal.querySelector("#personajeWiki");
    if (wiki) {
      wiki.href = personaje.wiki;
      wiki.setAttribute("aria-label", "Abrir la ficha de " + personaje.nombre +
        " en el wiki de Berserk (sitio externo)");
    }

    modal.show();
  }

  /* Panel del archivo: pestañas, barras, listas y carrusel de Bootstrap --- */

  function porcentaje(parte, total) {
    return total ? Math.round((parte / total) * 100) : 0;
  }

  function barra(etiqueta, total, clase) {
    var valor = porcentaje(total, DATOS.personajes.length);
    return [
      '<div class="emi-panel__fila">',
      '  <div class="d-flex justify-content-between align-items-center mb-1">',
      '    <span class="small text-uppercase">' + escapar(etiqueta) + '</span>',
      '    <span class="badge text-bg-secondary">' + total + ' · ' + valor + '%</span>',
      '  </div>',
      '  <div class="progress emi-panel__barra" role="progressbar" aria-label="' + escapar(etiqueta) + '"' +
      '       aria-valuenow="' + valor + '" aria-valuemin="0" aria-valuemax="100">',
      '    <div class="progress-bar bg-' + clase + '" style="width: ' + valor + '%"></div>',
      '  </div>',
      '</div>'
    ].join("");
  }

  function pintarPanel() {
    var total = DATOS.personajes.length;

    var listaFacciones = document.getElementById("listaFacciones");
    if (listaFacciones) {
      listaFacciones.innerHTML = DATOS.facciones.map(function (f) {
        var cuantos = DATOS.personajes.filter(function (p) {
          return p.faccion.indexOf(f.id) !== -1;
        }).length;
        return [
          '<li class="list-group-item d-flex justify-content-between align-items-center gap-3">',
          '  <a class="emi-badge emi-badge--' + f.clase + ' text-decoration-none" href="#resultados"' +
          '     data-filtrar-faccion="' + escapar(f.id) + '">' + escapar(f.nombre) + '</a>',
          '  <span class="badge text-bg-danger rounded-pill">' + cuantos + '</span>',
          '</li>'
        ].join("");
      }).join("");
    }

    var barrasEstado = document.getElementById("barrasEstado");
    if (barrasEstado) {
      var colores = { vivo: "success", fallecido: "danger", desconocido: "secondary" };
      barrasEstado.innerHTML = Object.keys(DATOS.estados).map(function (clave) {
        var cuantos = DATOS.personajes.filter(function (p) { return p.estado === clave; }).length;
        return barra(DATOS.estados[clave].texto, cuantos, colores[clave] || "secondary");
      }).join("");
    }

    var listaArcos = document.getElementById("listaArcos");
    if (listaArcos) {
      listaArcos.innerHTML = DATOS.arcos.map(function (arco) {
        return [
          '<a class="list-group-item list-group-item-action d-flex justify-content-between align-items-center gap-3"' +
          '   href="arcos.html#' + escapar(arco.id) + '">',
          '  <span><span class="emi-mini emi-texto-oro me-2">' + escapar(arco.numero) + '</span>' +
               escapar(arco.titulo) + '</span>',
          '  <span class="badge text-bg-secondary rounded-pill">' + arco.personajes.length + '</span>',
          '</a>'
        ].join("");
      }).join("");
    }

    var diapositivas = document.getElementById("carruselDiapositivas");
    var indicadores = document.getElementById("carruselIndicadores");
    if (diapositivas) {
      var retratos = ["guts", "griffith", "casca", "slan", "zodd", "ganishka"]
        .map(buscarPersonaje)
        .filter(Boolean);

      diapositivas.innerHTML = retratos.map(function (personaje, indice) {
        return [
          '<div class="carousel-item' + (indice === 0 ? " active" : "") + '">',
          '  <img src="' + escapar(personaje.imagen) + '" class="d-block w-100" alt="' + escapar(personaje.alt) + '"',
          '       loading="lazy" decoding="async">',
          '  <div class="carousel-caption text-start">',
          '    <p class="h5 mb-0">' + escapar(personaje.nombre) + '</p>',
          '    <p class="small mb-2">' + escapar(personaje.epiteto) + '</p>',
          '    <button class="btn btn-sm btn-outline-light" type="button" data-personaje="' +
                 escapar(personaje.id) + '">Ver ficha</button>',
          '    ' + enlaceExterno(personaje.wiki, "Wiki",
                                    "Abrir la ficha de " + personaje.nombre + " en el wiki de Berserk (sitio externo)"),
          '  </div>',
          '</div>'
        ].join("");
      }).join("");

      if (indicadores) {
        indicadores.innerHTML = retratos.map(function (personaje, indice) {
          return '<button type="button" data-bs-target="#carruselRetratos" data-bs-slide-to="' + indice + '"' +
                 (indice === 0 ? ' class="active" aria-current="true"' : '') +
                 ' aria-label="Retrato de ' + escapar(personaje.nombre) + '"></button>';
        }).join("");
      }
    }

    document.querySelectorAll("[data-total-fichas], #totalFichas").forEach(function (nodo) {
      nodo.textContent = String(total);
    });
  }

  /* Aviso flotante (toast de Bootstrap) al cambiar los filtros ------------- */

  function avisar(texto) {
    if (!aviso || !nodoAviso) { return; }
    var cuerpo = nodoAviso.querySelector(".toast-body");
    if (cuerpo) { cuerpo.textContent = texto; }
    aviso.show();
  }

  function iniciarAviso() {
    nodoAviso = document.getElementById("avisoFiltros");
    if (!nodoAviso || !window.bootstrap) { return; }
    aviso = bootstrap.Toast.getOrCreateInstance(nodoAviso, { delay: 2600 });
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
        avisar(estado.faccion ? "Facción: " + nombreFaccion(estado.faccion) : "Todas las facciones");
      });
    }

    if (el.situacion) {
      el.situacion.addEventListener("change", function () {
        estado.situacion = el.situacion.value;
        estado.pagina = 1;
        pintar();
        avisar(estado.situacion
          ? "Estado: " + (DATOS.estados[estado.situacion] || {}).texto
          : "Cualquier estado");
      });
    }

    if (el.orden) {
      el.orden.addEventListener("change", function () {
        estado.orden = el.orden.value;
        pintar();
        avisar("Orden: " + el.orden.options[el.orden.selectedIndex].textContent);
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
    nodoModal = document.getElementById("modalPersonaje");
    if (nodoModal && window.bootstrap) {
      modal = bootstrap.Modal.getOrCreateInstance(nodoModal);
      nodoModal.addEventListener("hidden.bs.modal", function () {
        nodoModal.querySelector("#personajeRetrato").removeAttribute("src");
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
    pintarPanel();
    iniciarAviso();

    /* Enlaces de facción del panel: filtran el catálogo al instante. */
    document.querySelectorAll("[data-filtrar-faccion]").forEach(function (enlace) {
      enlace.addEventListener("click", function (evento) {
        evento.preventDefault();
        estado.faccion = enlace.getAttribute("data-filtrar-faccion");
        estado.pagina = 1;
        if (el.faccion) { el.faccion.value = estado.faccion; }
        pintar();
        avisar("Filtrado por " + nombreFaccion(estado.faccion) + ": " + el.contador.textContent);
        var ancla = document.getElementById("resultados");
        if (ancla) { ancla.scrollIntoView({ block: "start" }); }
      });
    });

    /* Enlace directo desde otras páginas: personajes.html#guts
       o personajes.html?personaje=guts */
    var destino = parametros.get("personaje") || window.location.hash.replace("#", "");
    if (destino) {
      var personaje = buscarPersonaje(destino);
      if (personaje) { abrirFicha(personaje.id); }
    }
  }

  document.addEventListener("DOMContentLoaded", iniciar);
})();
