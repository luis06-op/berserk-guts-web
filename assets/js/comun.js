/* ==========================================================================
   COMPORTAMIENTO COMÚN — navegación, año y animaciones de entrada
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    /* 1. Año actual en el pie de página. */
    document.querySelectorAll("[data-anio]").forEach(function (nodo) {
      nodo.textContent = String(new Date().getFullYear());
    });

    /* 2. Sombra de la barra de navegación al hacer scroll. */
    var barra = document.querySelector(".emi-navbar");
    if (barra) {
      var actualizarBarra = function () {
        barra.classList.toggle("is-scrolled", window.scrollY > 24);
      };
      actualizarBarra();
      window.addEventListener("scroll", actualizarBarra, { passive: true });
    }

    /* 3. Cerrar el menú móvil al elegir un enlace. */
    var colapso = document.getElementById("menuPrincipal");
    if (colapso && window.bootstrap) {
      colapso.querySelectorAll("a").forEach(function (enlace) {
        enlace.addEventListener("click", function () {
          if (colapso.classList.contains("show")) {
            bootstrap.Collapse.getOrCreateInstance(colapso).hide();
          }
        });
      });
    }

    /* 4. Aparición progresiva de bloques (respeta reduce-motion). */
    var piezas = document.querySelectorAll(".reveal");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!("IntersectionObserver" in window) || reduceMotion) {
      piezas.forEach(function (pieza) { pieza.classList.add("is-visible"); });
      return;
    }

    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("is-visible");
          observador.unobserve(entrada.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    piezas.forEach(function (pieza) { observador.observe(pieza); });
  });
})();
