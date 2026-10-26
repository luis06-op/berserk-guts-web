/* ==========================================================================
   ARCOS ARGUMENTALES — ficha ampliada en modal
   Requiere: datos.js (window.BERSERK) y bootstrap.bundle.min.js
   ========================================================================== */
(function () {
  "use strict";

  var DATOS = window.BERSERK;
  if (!DATOS) { return; }

  function escapar(texto) {
    return String(texto)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function abrirArco(id) {
    var arco = DATOS.arcos.find(function (item) { return item.id === id; });
    var nodo = document.getElementById("modalArco");
    if (!arco || !nodo || !window.bootstrap) { return; }

    var modal = bootstrap.Modal.getOrCreateInstance(nodo);

    nodo.querySelector("#modalArcoLabel").textContent = arco.titulo;
    nodo.querySelector("#arcoImagen").src = arco.imagen;
    nodo.querySelector("#arcoImagen").alt = arco.alt;
    nodo.querySelector("#arcoNumero").textContent = "Arco " + arco.numero;
    nodo.querySelector("#arcoMeta").textContent = arco.meta;
    nodo.querySelector("#arcoDetalle").textContent = arco.detalle;
    nodo.querySelector("#arcoSpoiler").hidden = !arco.spoiler;

    nodo.querySelector("#arcoPersonajes").innerHTML = arco.personajes.map(function (idPersonaje) {
      var personaje = DATOS.personajes.find(function (item) { return item.id === idPersonaje; });
      if (!personaje) { return ""; }
      return '<li><a class="emi-badge emi-badge--solitario text-decoration-none" ' +
             'href="personajes.html#' + escapar(personaje.id) + '">' +
             escapar(personaje.nombre) + "</a></li>";
    }).join("");

    modal.show();
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-arco]").forEach(function (boton) {
      boton.addEventListener("click", function () {
        abrirArco(boton.getAttribute("data-arco"));
      });
    });

  });
})();
