#!/usr/bin/env python3
"""
Generador del arte vectorial propio del proyecto «Archivo del Espadachín Negro».

Produce, sin dependencias externas, los SVG decorativos que acompañan al sitio:

  assets/img/arcos/*.svg          emblema de cada arco argumental (800 x 450)
  assets/img/heroe.svg            escena del encabezado (1600 x 900)
  assets/img/marca-sacrificio.svg logotipo basado en la marca de sacrificio

Los retratos de los personajes son ilustraciones del manga (ver README para la
autoría y el uso educativo); este script no las genera ni las modifica.

Uso:
    python3 tools/generar_arte.py
"""

from __future__ import annotations

import random
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
IMG = RAIZ / "assets" / "img"


# ---------------------------------------------------------------------------
# Piezas compartidas
# ---------------------------------------------------------------------------

def rayos(acento: str, semilla: int, alto: int = 450) -> str:
    """Haces de luz diagonales que dan profundidad al fondo."""
    azar = random.Random(semilla)
    trazos = []
    for _ in range(7):
        x = azar.randint(-80, 520)
        ancho = azar.randint(8, 46)
        opacidad = round(azar.uniform(0.03, 0.1), 3)
        trazos.append(
            f'<path d="M{x} -40 L{x + ancho} -40 L{x + ancho + 210} {alto + 60} '
            f'L{x + 210} {alto + 60} Z" fill="{acento}" opacity="{opacidad}"/>'
        )
    return f'<g aria-hidden="true">{"".join(trazos)}</g>'


def salpicaduras(acento: str, semilla: int, ancho: int = 800, alto: int = 450) -> str:
    """Gotas de tinta para romper la planitud del fondo."""
    azar = random.Random(semilla + 7)
    puntos = []
    for _ in range(26):
        x, y = azar.randint(10, ancho - 10), azar.randint(10, alto - 10)
        r = azar.choice([1.2, 1.8, 2.4, 3.2, 4.6, 6.4])
        puntos.append(
            f'<circle cx="{x}" cy="{y}" r="{r}" fill="{acento}" '
            f'opacity="{round(azar.uniform(.08, .3), 2)}"/>'
        )
    return f'<g aria-hidden="true">{"".join(puntos)}</g>'


# ---------------------------------------------------------------------------
# Emblemas de los arcos
# ---------------------------------------------------------------------------

MOTIVOS = {
    # Dos espadas cruzadas bajo una luna.
    "espadas": """
      <g stroke="#e9e0d0" stroke-width="7" opacity=".8" stroke-linecap="round">
        <path d="M286 330 L486 106"/><path d="M514 330 L314 106"/>
      </g>
      <g stroke="{a}" stroke-width="3" opacity=".8">
        <path d="M300 318 L470 120"/><path d="M500 318 L330 120"/>
      </g>
      <circle cx="400" cy="216" r="30" fill="none" stroke="{a}" stroke-width="3" opacity=".8"/>
    """,
    # Silueta de halcón.
    "halcon": """
      <path d="M400 118 C436 138 470 174 492 226 C452 214 420 216 400 232 C380 216 348 214 308 226 C330 174 364 138 400 118 Z" fill="{a}" opacity=".85"/>
      <path d="M400 232 C420 262 430 296 424 332 L400 306 L376 332 C370 296 380 262 400 232 Z" fill="{a}" opacity=".6"/>
      <circle cx="400" cy="188" r="9" fill="#0a0807"/>
    """,
    # Eclipse: disco negro con corona de rayos.
    "eclipse": """
      <circle cx="400" cy="210" r="96" fill="#070606"/>
      <circle cx="400" cy="210" r="96" fill="none" stroke="{a}" stroke-width="6" opacity=".95"/>
      <circle cx="400" cy="210" r="120" fill="none" stroke="{a}" stroke-width="1.5" opacity=".55" stroke-dasharray="4 10"/>
      <g stroke="{a}" stroke-width="3" opacity=".65">
        <path d="M400 92 L400 50"/><path d="M400 328 L400 370"/>
        <path d="M282 210 L240 210"/><path d="M518 210 L560 210"/>
        <path d="M318 128 L289 99"/><path d="M482 292 L511 321"/>
        <path d="M482 128 L511 99"/><path d="M318 292 L289 321"/>
      </g>
      <path d="M356 176 L444 176 L432 210 L368 210 Z" fill="{a}" opacity=".6"/>
    """,
    # Llama de la Inquisición.
    "llama": """
      <path d="M400 342 C346 300 350 254 380 214 C384 254 400 262 404 236 C410 190 444 162 468 132 C474 190 498 222 486 268 C512 250 516 224 514 204 C540 254 520 320 400 342 Z" fill="{a}" opacity=".65"/>
      <path d="M400 342 C368 316 372 288 392 262 C396 288 408 292 414 272 C422 300 430 320 400 342 Z" fill="#f2e6d2" opacity=".6"/>
    """,
    # Árbol del mundo y luna.
    "mundo": """
      <path d="M400 348 L400 268" stroke="#cbbfae" stroke-width="8"/>
      <path d="M400 300 C352 282 328 244 326 200 C360 208 388 230 400 262 C412 230 440 208 474 200 C472 244 448 282 400 300 Z" fill="{a}" opacity=".7"/>
      <circle cx="400" cy="238" r="18" fill="{a}" opacity=".95"/>
      <path d="M330 348 C360 336 440 336 470 348" stroke="{a}" stroke-width="3" opacity=".55"/>
    """,
    # Abismo: acantilado y luna invertida.
    "abismo": """
      <path d="M180 330 C240 300 300 320 400 300 C500 280 560 300 620 330 L620 400 L180 400 Z" fill="#080707"/>
      <circle cx="400" cy="190" r="72" fill="{a}" opacity=".4" filter="url(#halo)"/>
      <path d="M360 236 L400 168 L440 236 L400 216 Z" fill="{a}" opacity=".7"/>
      <g stroke="{a}" stroke-width="2" opacity=".4">
        <path d="M250 400 L250 320"/><path d="M550 400 L550 320"/>
      </g>
    """,
}

ARCOS = [
    dict(id="espadachin-negro", nombre="El Espadachín Negro", acento="#c9c1b4", motivo="espadas", semilla=41),
    dict(id="edad-dorada", nombre="La Edad Dorada", acento="#d9b451", motivo="halcon", semilla=42),
    dict(id="eclipse", nombre="El Eclipse", acento="#cf2f2f", motivo="eclipse", semilla=43),
    dict(id="condena", nombre="La Condena", acento="#c96a2f", motivo="llama", semilla=44),
    dict(id="halcon-milenario", nombre="El Halcón Milenario", acento="#8e6fd0", motivo="mundo", semilla=45),
    dict(id="fantasia", nombre="La Era de la Fantasía", acento="#5f9f8a", motivo="abismo", semilla=46),
]


def emblema(cfg: dict) -> str:
    acento = cfg["acento"]
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" role="img" aria-labelledby="titulo">
  <title id="titulo">Emblema del arco {cfg['nombre']}</title>
  <defs>
    <radialGradient id="cielo" cx="50%" cy="42%" r="72%">
      <stop offset="0" stop-color="{acento}" stop-opacity=".26"/>
      <stop offset=".55" stop-color="#14100f"/>
      <stop offset="1" stop-color="#060505"/>
    </radialGradient>
    <filter id="halo" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="10"/>
    </filter>
    <filter id="grano" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope=".5"/></feComponentTransfer>
    </filter>
    <radialGradient id="vineta" cx="50%" cy="46%" r="74%">
      <stop offset=".5" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity=".8"/>
    </radialGradient>
  </defs>
  <rect width="800" height="450" fill="url(#cielo)"/>
  {rayos(acento, cfg['semilla'])}
  <circle cx="400" cy="210" r="132" fill="none" stroke="{acento}" stroke-width="2" opacity=".35"/>
  <circle cx="400" cy="210" r="96" fill="{acento}" opacity=".12" filter="url(#halo)"/>
  {MOTIVOS[cfg['motivo']].format(a=acento)}
  {salpicaduras(acento, cfg['semilla'])}
  <rect width="800" height="450" filter="url(#grano)" opacity=".18"/>
  <rect width="800" height="450" fill="url(#vineta)"/>
  <rect x="16" y="16" width="768" height="418" fill="none" stroke="{acento}" stroke-width="1" opacity=".25"/>
</svg>
"""


# ---------------------------------------------------------------------------
# Escena principal y logotipo
# ---------------------------------------------------------------------------

def escena_heroe() -> str:
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-labelledby="titulo">
  <title id="titulo">Silueta de un espadachín con un enorme mandoble frente a una luna de sangre</title>
  <defs>
    <radialGradient id="cielo" cx="68%" cy="34%" r="76%">
      <stop offset="0" stop-color="#5c1416"/>
      <stop offset=".4" stop-color="#20100f"/>
      <stop offset="1" stop-color="#070605"/>
    </radialGradient>
    <radialGradient id="luna" cx="42%" cy="38%" r="62%">
      <stop offset="0" stop-color="#e8b9a2"/>
      <stop offset=".55" stop-color="#b4523f"/>
      <stop offset="1" stop-color="#5f1d18"/>
    </radialGradient>
    <filter id="halo" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="26"/>
    </filter>
    <filter id="grano" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="4" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope=".55"/></feComponentTransfer>
    </filter>
    <linearGradient id="niebla" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2a1714" stop-opacity="0"/>
      <stop offset="1" stop-color="#2a1714" stop-opacity=".7"/>
    </linearGradient>
    <radialGradient id="vineta" cx="50%" cy="46%" r="72%">
      <stop offset=".45" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity=".85"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#cielo)"/>
  <circle cx="1080" cy="290" r="228" fill="#8e2b22" opacity=".55" filter="url(#halo)"/>
  <circle cx="1080" cy="290" r="196" fill="url(#luna)"/>
  <g fill="#5c1b16" opacity=".45">
    <circle cx="1010" cy="230" r="26"/><circle cx="1150" cy="330" r="34"/>
    <circle cx="1120" cy="200" r="16"/><circle cx="980" cy="350" r="20"/>
  </g>
  <g stroke="#0b0908" stroke-width="4" opacity=".8" fill="none">
    <path d="M0 620 L260 520 L520 610 L820 470 L1120 560 L1380 500 L1600 580"/>
  </g>
  <path d="M0 900 L0 660 C180 630 320 700 520 690 C760 678 900 736 1100 724 C1300 712 1460 758 1600 738 L1600 900 Z" fill="#080706"/>
  <path d="M0 900 L0 760 C240 726 420 800 640 786 C900 770 1120 830 1600 792 L1600 900 Z" fill="#050404"/>
  <rect y="560" width="1600" height="260" fill="url(#niebla)"/>
  <g opacity=".5" fill="#0a0807">
    <path d="M760 214 l14 -6 l10 8 l-16 4 z"/><path d="M840 178 l12 -10 l14 6 l-14 8 z"/>
    <path d="M900 240 l10 -6 l12 8 l-14 2 z"/><path d="M700 268 l12 -4 l8 10 l-14 2 z"/>
  </g>
  <!-- Silueta del espadachín y su mandoble -->
  <g>
    <path d="M690 900 C696 792 724 724 780 686 L742 604 L716 470 L760 452 L806 560 L840 470 L884 452 L898 560 L872 660 C930 706 956 792 962 900 Z" fill="#070606"/>
    <path d="M742 470 L806 560 L760 452 Z" fill="#161110"/>
    <path d="M760 470 C740 520 736 580 744 640" stroke="#e0313a" stroke-width="3" opacity=".35" fill="none"/>
    <path d="M934 690 L1180 92 L1212 104 L1004 706 Z" fill="#100d0c" stroke="#6d6259" stroke-width="2"/>
    <path d="M934 690 L1180 92" stroke="#e0313a" stroke-width="2" opacity=".45"/>
    <path d="M890 654 L1036 690 L1028 716 L884 680 Z" fill="#1a1513" stroke="#4b423b" stroke-width="2"/>
    <path d="M742 604 L716 470 L760 452" fill="none" stroke="#4b423b" stroke-width="2"/>
  </g>
  <rect width="1600" height="900" filter="url(#grano)" opacity=".2"/>
  <rect width="1600" height="900" fill="url(#vineta)"/>
</svg>
"""


def marca() -> str:
    """Marca de sacrificio: el símbolo que marca a Guts."""
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-labelledby="titulo">
  <title id="titulo">Marca de sacrificio</title>
  <g fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    <path d="M60 18 L60 62"/>
    <path d="M60 62 L38 96"/>
    <path d="M60 62 L82 96"/>
    <path d="M60 40 L42 28"/>
  </g>
</svg>
"""


# ---------------------------------------------------------------------------
# Salida
# ---------------------------------------------------------------------------

def escribir(ruta: Path, contenido: str) -> None:
    ruta.parent.mkdir(parents=True, exist_ok=True)
    ruta.write_text(contenido.strip() + "\n", encoding="utf-8")
    print(f"  · {ruta.relative_to(RAIZ)}")


def main() -> None:
    print("Generando arte vectorial…")
    for arco in ARCOS:
        escribir(IMG / "arcos" / f"{arco['id']}.svg", emblema(arco))
    escribir(IMG / "heroe.svg", escena_heroe())
    escribir(IMG / "marca-sacrificio.svg", marca())
    print("Listo.")


if __name__ == "__main__":
    main()
