/* ==========================================================================
   GALERÍA DE PANELES — filtros, mampostería, visor y enlaces directos
   --------------------------------------------------------------------------
   Todo el contenido sale de assets/js/paneles.js. Este archivo solo se
   encarga de pintar la rejilla, mover el visor y respetar reduce-motion.
   ========================================================================== */
(function () {
  "use strict";

  var datos = window.PANELES;
  var rejilla = document.getElementById("rejillaPaneles");
  if (!datos || !rejilla) return;

  var arcos = {};
  (window.BERSERK ? window.BERSERK.arcos : []).forEach(function (arco) {
    arcos[arco.id] = arco;
  });

  /* Nombres cortos para que los filtros quepan en una sola línea. */
  var nombresCortos = {
    "espadachin-negro": "Espadachín Negro",
    "edad-dorada": "Edad Dorada",
    "eclipse": "El Eclipse",
    "condena": "La Condena",
    "halcon-milenario": "Halcón Milenario",
    "fantasia": "La Fantasía"
  };

  var filtros = document.getElementById("filtrosPaneles");
  var contador = document.getElementById("contadorPaneles");
  var vacio = document.getElementById("vacioPaneles");
  var cinta = document.getElementById("cintaPaneles");
  var total = document.getElementById("totalPaneles");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var actual = "todos";
  var visibles = [];
  var indice = 0;
  var modal = null;
  var observador = null;

  /* ---------- Utilidades -------------------------------------------------- */

  function nombreArco(id) {
    return arcos[id] ? arcos[id].titulo : "Berserk";
  }

  function etiquetaEpisodio(panel) {
    return "Ep. " + panel.episodio;
  }

  function plural(n) {
    return n === 1 ? "1 panel" : n + " paneles";
  }

  /* ---------- Rejilla ----------------------------------------------------- */

  function crearLamina(panel, posicion) {
    var articulo = document.createElement("article");
    articulo.className = "emi-lamina";
    articulo.dataset.panel = panel.id;

    var boton = document.createElement("button");
    boton.type = "button";
    boton.className = "emi-lamina__boton";
    boton.dataset.indice = String(posicion);
    boton.setAttribute("aria-label", "Ampliar «" + panel.titulo + "», episodio " + panel.episodio);

    var media = document.createElement("div");
    media.className = "emi-lamina__media";

    var imagen = document.createElement("img");
    imagen.src = panel.archivo + "-min.webp";
    imagen.srcset = panel.archivo + "-min.webp 520w, " + panel.archivo + ".webp 1100w";
    imagen.sizes = "(min-width: 1200px) 23vw, (min-width: 768px) 31vw, 46vw";
    imagen.width = panel.ancho;
    imagen.height = panel.alto;
    imagen.alt = panel.alt;
    imagen.loading = "lazy";
    imagen.decoding = "async";

    var lupa = document.createElement("span");
    lupa.className = "emi-lamina__zoom";
    lupa.setAttribute("aria-hidden", "true");
    lupa.textContent = "⤢";

    media.append(imagen, lupa);

    var cuerpo = document.createElement("div");
    cuerpo.className = "emi-lamina__cuerpo";

    var meta = document.createElement("p");
    meta.className = "emi-lamina__meta";

    var episodio = document.createElement("span");
    episodio.textContent = etiquetaEpisodio(panel);

    var arco = document.createElement("span");
    arco.textContent = nombreArco(panel.arco);

    meta.append(episodio, arco);

    var titulo = document.createElement("h3");
    titulo.className = "emi-lamina__titulo";
    titulo.textContent = panel.titulo;

    cuerpo.append(meta, titulo);
    boton.append(media, cuerpo);
    articulo.append(boton);

    return articulo;
  }

  function observarLaminas() {
    var piezas = rejilla.querySelectorAll(".emi-lamina");

    if (observador) {
      observador.disconnect();
      observador = null;
    }

    if (reduceMotion || !("IntersectionObserver" in window)) {
      piezas.forEach(function (pieza) { pieza.classList.add("is-visible"); });
      return;
    }

    observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("is-visible");
          observador.unobserve(entrada.target);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });

    piezas.forEach(function (pieza) { observador.observe(pieza); });
  }

  function pintar() {
    visibles = datos.paneles.filter(function (panel) {
      return actual === "todos" || panel.arco === actual;
    });

    rejilla.textContent = "";

    var fragmento = document.createDocumentFragment();
    visibles.forEach(function (panel, posicion) {
      var lamina = crearLamina(panel, posicion);
      lamina.style.transitionDelay = (posicion % 4) * 55 + "ms";
      fragmento.append(lamina);
    });
    rejilla.append(fragmento);

    contador.textContent = plural(visibles.length) +
      (actual === "todos" ? "" : " · " + nombreArco(actual));
    vacio.hidden = visibles.length !== 0;

    observarLaminas();
  }

  /* ---------- Filtros ----------------------------------------------------- */

  function crearFiltros() {
    if (!filtros) return;

    var orden = (window.BERSERK ? window.BERSERK.arcos : []).map(function (arco) {
      return arco.id;
    });

    var conPaneles = orden.filter(function (id) {
      return datos.paneles.some(function (panel) { return panel.arco === id; });
    });

    var grupos = [{ id: "todos", titulo: "Todos", numero: "" }].concat(
      conPaneles.map(function (id) {
        return { id: id, titulo: nombreArco(id), numero: arcos[id].numero || "" };
      })
    );

    grupos.forEach(function (grupo) {
      var boton = document.createElement("button");
      boton.type = "button";
      boton.className = "emi-filtro";
      boton.dataset.arco = grupo.id;
      boton.setAttribute("aria-pressed", grupo.id === "todos" ? "true" : "false");

      var texto = document.createElement("span");
      texto.textContent = grupo.id === "todos"
        ? "Todos"
        : (nombresCortos[grupo.id] || grupo.titulo);

      var cuenta = document.createElement("span");
      cuenta.className = "emi-filtro__n";
      cuenta.textContent = String(
        grupo.id === "todos"
          ? datos.paneles.length
          : datos.paneles.filter(function (panel) { return panel.arco === grupo.id; }).length
      );

      boton.append(texto, cuenta);
      filtros.append(boton);
    });

    filtros.addEventListener("click", function (evento) {
      var boton = evento.target.closest("[data-arco]");
      if (!boton) return;

      actual = boton.dataset.arco;
      filtros.querySelectorAll("[data-arco]").forEach(function (otro) {
        otro.setAttribute("aria-pressed", otro === boton ? "true" : "false");
      });
      pintar();
    });
  }

  /* ---------- Cinta decorativa ------------------------------------------- */

  function pintarCinta() {
    if (!cinta) return;

    var piezas = datos.paneles.slice(0, 14).map(function (panel) {
      var alto = Math.round((520 * panel.alto) / panel.ancho);
      return '<img src="' + panel.archivo + '-min.webp" alt="" width="520" height="' +
        alto + '" loading="lazy" decoding="async">';
    }).join("");

    /* Dos copias: la animación desplaza exactamente la mitad de la pista. */
    cinta.innerHTML = piezas + piezas;
  }

  /* ---------- Visor ------------------------------------------------------- */

  function abrirPanel(posicion) {
    if (!visibles.length) return;

    indice = (posicion + visibles.length) % visibles.length;
    var panel = visibles[indice];

    var imagen = document.getElementById("imagenPanel");
    imagen.src = panel.archivo + ".webp";
    imagen.alt = panel.alt;
    imagen.width = panel.ancho;
    imagen.height = panel.alto;

    document.getElementById("tituloPanel").textContent = panel.titulo;
    document.getElementById("metaPanel").textContent =
      "Episodio " + panel.episodio + " · " + nombreArco(panel.arco);
    document.getElementById("descripcionPanel").textContent = panel.descripcion;
    document.getElementById("cuentaPanel").textContent =
      (indice + 1) + " / " + visibles.length;
    document.getElementById("fuentePanel").href = panel.fuente;

    if (!modal) {
      modal = new bootstrap.Modal(document.getElementById("modalPanel"));
    }
    modal.show();

    var url = new URL(window.location.href);
    url.searchParams.set("panel", panel.id);
    window.history.replaceState(null, "", url);
  }

  function moverVisor(paso) {
    abrirPanel(indice + paso);
  }

  function limpiarUrl() {
    var url = new URL(window.location.href);
    if (!url.searchParams.has("panel")) return;
    url.searchParams.delete("panel");
    window.history.replaceState(null, "", url);
  }

  /* ---------- Arranque ---------------------------------------------------- */

  if (total) total.textContent = String(datos.paneles.length);

  crearFiltros();
  pintarCinta();
  pintar();

  rejilla.addEventListener("click", function (evento) {
    var boton = evento.target.closest("[data-indice]");
    if (!boton) return;
    abrirPanel(Number(boton.dataset.indice));
  });

  document.getElementById("panelAnterior").addEventListener("click", function () {
    moverVisor(-1);
  });

  document.getElementById("panelSiguiente").addEventListener("click", function () {
    moverVisor(1);
  });

  document.getElementById("modalPanel").addEventListener("hidden.bs.modal", limpiarUrl);

  document.addEventListener("keydown", function (evento) {
    var abierto = document.getElementById("modalPanel").classList.contains("show");
    if (!abierto) return;
    if (evento.key === "ArrowLeft") {
      evento.preventDefault();
      moverVisor(-1);
    } else if (evento.key === "ArrowRight") {
      evento.preventDefault();
      moverVisor(1);
    }
  });

  function alAzar() {
    if (!visibles.length) return;
    abrirPanel(Math.floor(Math.random() * visibles.length));
  }

  ["botonAleatorio", "botonAleatorioDos"].forEach(function (id) {
    var boton = document.getElementById(id);
    if (boton) boton.addEventListener("click", alAzar);
  });

  var limpiar = document.querySelector("[data-limpiar]");
  if (limpiar) {
    limpiar.addEventListener("click", function () {
      actual = "todos";
      filtros.querySelectorAll("[data-arco]").forEach(function (boton) {
        boton.setAttribute("aria-pressed", boton.dataset.arco === "todos" ? "true" : "false");
      });
      pintar();
    });
  }

  /* Enlace directo: galeria.html?panel=id */
  var parametro = new URLSearchParams(window.location.search).get("panel");
  if (parametro) {
    var posicion = datos.paneles.findIndex(function (panel) { return panel.id === parametro; });
    if (posicion >= 0) {
      actual = "todos";
      visibles = datos.paneles.slice();
      abrirPanel(posicion);
    }
  }
})();
