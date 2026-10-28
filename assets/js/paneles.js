/* ==========================================================================
   PANELES DEL MANGA — datos de la galería
   --------------------------------------------------------------------------
   Fuente única de la sección «Galería»: cada entrada genera una tarjeta, un
   filtro y una ficha ampliada. Para añadir un panel basta con copiar su
   imagen en assets/img/paneles/ y agregar un objeto aquí.

   Campos:
     id           identificador para enlaces directos (?panel=id)
     titulo       nombre de la lámina
     episodio     número de episodio del manga
     arco         id de un arco de datos.js
     archivo      ruta sin extensión; se sirven <archivo>.webp y <archivo>-min.webp
     ancho, alto  medidas de la versión grande (para reservar el espacio)
     alt          texto alternativo
     descripcion  comentario sobre el dibujo y la escena
     fuente       página del archivo original en Berserk Wiki

   Los paneles pertenecen a Kentaro Miura y a Hakusensha. Se muestran con
   fines educativos, citando la fuente y sin licencia sobre las imágenes.
   ========================================================================== */
window.PANELES = {
  actualizado: "2026-10-27",

  paneles: [
    {
      id: "skull-knight-femto",
      titulo: "El Caballero Calavera irrumpe",
      episodio: "303",
      arco: "halcon-milenario",
      archivo: "assets/img/paneles/skull-knight-femto",
      ancho: 1100,
      alto: 811,
      alt: "El Caballero Calavera, envuelto en una capa negra, se planta ante Femto sobre un paisaje de cuerpos y alas.",
      descripcion: "Doble página sin un solo bocadillo: el Caballero Calavera se planta ante Femto mientras el paisaje se llena de rostros y alas. El negro plano de las capas contra el tramado del fondo es la firma de Miura.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E303_Skull_Knight_Ambushes_Femto.png"
    },
    {
      id: "griffith-espadas",
      titulo: "El Halcón entre espadas",
      episodio: "178",
      arco: "halcon-milenario",
      archivo: "assets/img/paneles/griffith-espadas",
      ancho: 1100,
      alto: 790,
      alt: "Griffith de pie entre espadas clavadas en el suelo, con una capa blanca que ocupa media página.",
      descripcion: "Griffith emerge entre espadas clavadas en el suelo, envuelto en una capa que ocupa media página. Composición casi heráldica: figura centrada, horizonte bajo y nubes tramadas a mano.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E178_Griffith_Unmoved.png"
    },
    {
      id: "femto-encarnado",
      titulo: "La carne de Femto",
      episodio: "175",
      arco: "condena",
      archivo: "assets/img/paneles/femto-encarnado",
      ancho: 1100,
      alto: 792,
      alt: "Femto recién encarnado, dibujado con líneas tenues sobre un fondo de plumas y brazos.",
      descripcion: "El instante en que Femto toma forma carnal en Albion. El cuerpo está resuelto con líneas casi transparentes, como si la figura estuviera hecha de luz, sobre un fondo de plumas y brazos.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E175_Femto_Incarnate.png"
    },
    {
      id: "void-cuatro-seres",
      titulo: "Void y los cuatro seres",
      episodio: "362",
      arco: "fantasia",
      archivo: "assets/img/paneles/void-cuatro-seres",
      ancho: 1100,
      alto: 776,
      alt: "Void en el centro de una composición de tentáculos, geometrías imposibles y miembros de la Mano de Dios.",
      descripcion: "Void preside la escena rodeado por los otros miembros de la Mano de Dios. Geometría imposible, tentáculos y tramados densos: horror cósmico a página completa, con el encuadre ligeramente inclinado.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E362_Void_and_Four_Beings.png"
    },
    {
      id: "mano-de-dios",
      titulo: "La Mano de Dios",
      episodio: "0-6",
      arco: "espadachin-negro",
      archivo: "assets/img/paneles/mano-de-dios",
      ancho: 1100,
      alto: 831,
      alt: "El Caballero Calavera frente a la Mano de Dios, cuyas figuras emergen de vigas y dedos gigantes.",
      descripcion: "Primera gran aparición de la Mano de Dios. El Caballero Calavera ocupa el primer plano mientras las figuras emergen de una estructura de vigas y dedos gigantes: el negro plano separa a los personajes del entramado.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E0-6_God_Hand.png"
    },
    {
      id: "vortice-beherits",
      titulo: "El vórtice de beherits",
      episodio: "221",
      arco: "halcon-milenario",
      archivo: "assets/img/paneles/vortice-beherits",
      ancho: 1100,
      alto: 971,
      alt: "Espiral de beherits con ojos y bocas que se abre como un remolino en el cielo.",
      descripcion: "Un vórtice de beherits abriéndose en el cielo. Miles de ojos y bocas dibujados uno a uno forman una espiral que arrastra la mirada hacia el centro del panel.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E221_Sword_of_Beherits_Vortex.png"
    },
    {
      id: "ola-astral",
      titulo: "La ola del mundo astral",
      episodio: "305",
      arco: "halcon-milenario",
      archivo: "assets/img/paneles/ola-astral",
      ancho: 1100,
      alto: 789,
      alt: "Una cúpula de luz se eleva sobre la superficie del mundo astral, vista desde muy lejos.",
      descripcion: "La gran ola del mundo astral vista desde muy lejos: una cúpula de luz sobre un mar de almas. Miura resuelve el horror a escala planetaria con una imagen casi limpia, de pocas líneas.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E305_Great_Wave_of_the_Astral_World.png"
    },
    {
      id: "caos",
      titulo: "El ejército del caos",
      episodio: "301",
      arco: "halcon-milenario",
      archivo: "assets/img/paneles/caos",
      ancho: 1100,
      alto: 672,
      alt: "Masa de criaturas y apóstoles avanzando, dibujada con un tramado continuo de dientes y garras.",
      descripcion: "El ejército de apóstoles y criaturas avanzando en masa. Cada figura tiene su propio tramado y el conjunto se lee como una textura continua de dientes, garras y armaduras.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E301_Chaos.png"
    },
    {
      id: "falconia",
      titulo: "Falconia",
      episodio: "307",
      arco: "halcon-milenario",
      archivo: "assets/img/paneles/falconia",
      ancho: 1100,
      alto: 780,
      alt: "Vista panorámica de Falconia con la muralla, el palacio y el sol al fondo.",
      descripcion: "Falconia al completo: muralla, palacio y el sol detrás. La perspectiva y la línea fina convierten la ciudad en un grabado arquitectónico, con miles de ventanas dibujadas una por una.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E307_Falconia_Overview.png"
    },
    {
      id: "zodd-luna",
      titulo: "Zodd contra la luna",
      episodio: "235",
      arco: "halcon-milenario",
      archivo: "assets/img/paneles/zodd-luna",
      ancho: 1100,
      alto: 785,
      alt: "Nosferatu Zodd volando con Charlotte entre las garras, recortado sobre una luna llena.",
      descripcion: "Nosferatu Zodd cruza la noche con Charlotte entre las garras. La luna recortada en blanco puro contra el negro es uno de los contrastes más recordados de la saga.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E235_Princess_Rescued.png"
    },
    {
      id: "espada-dragon",
      titulo: "La Espada del Dragón",
      episodio: "148",
      arco: "condena",
      archivo: "assets/img/paneles/espada-dragon",
      ancho: 1100,
      alto: 793,
      alt: "Guts de espaldas con la Espada del Dragón al hombro y una figura arrodillada a sus pies.",
      descripcion: "Guts con la Espada del Dragón, la capa negra al viento y una figura arrodillada a sus pies. La hoja cruza el panel en diagonal y el blanco del suelo deja respirar la escena.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E148_Reunion.png"
    },
    {
      id: "makara",
      titulo: "Makara",
      episodio: "240",
      arco: "halcon-milenario",
      archivo: "assets/img/paneles/makara",
      ancho: 1100,
      alto: 782,
      alt: "Primer plano de Makara, una cara monstruosa enmarcada por una melena de tentáculos.",
      descripcion: "Primer plano de Makara: una cara monstruosa enmarcada por una melena que se convierte en tentáculos. El tramado cruzado da volumen a cada pliegue de la piel y a cada diente.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E240_Makara.png"
    },
    {
      id: "niebla-pandemonio",
      titulo: "La cúpula del Pandemonio",
      episodio: "336",
      arco: "fantasia",
      archivo: "assets/img/paneles/niebla-pandemonio",
      ancho: 1100,
      alto: 977,
      alt: "Una cúpula negra cubre el anfiteatro mientras la niebla se traga a la multitud.",
      descripcion: "Una cúpula negra cubre el anfiteatro mientras la niebla se traga a la multitud. Casi todo el panel es negro: Miura deja que el vacío haga el trabajo y reserva la línea para el borde del camino.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E336_Pandemonium_Fog.png"
    },
    {
      id: "dios-del-mar",
      titulo: "El Dios del Mar despierta",
      episodio: "323",
      arco: "fantasia",
      archivo: "assets/img/paneles/dios-del-mar",
      ancho: 1100,
      alto: 782,
      alt: "El Dios del Mar rompe la superficie con un brazo enorme mientras un barco se refugia en una concha.",
      descripcion: "El Dios del Mar rompe la superficie: un brazo enorme, olas dibujadas línea a línea y un barco refugiado en una concha. La escala se mide por lo diminuto del barco.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E323_Sea_God_breaks_free.png"
    },
    {
      id: "bestia-oscuridad",
      titulo: "La Bestia de la Oscuridad",
      episodio: "290",
      arco: "halcon-milenario",
      archivo: "assets/img/paneles/bestia-oscuridad",
      ancho: 1100,
      alto: 787,
      alt: "Primerísimo plano de la Bestia de la Oscuridad con el pelaje resuelto a base de trazos densos.",
      descripcion: "La Bestia de la Oscuridad en primerísimo plano, con el pelaje resuelto a base de trazos cortos y densos. Uno de los ejemplos más claros del uso del negro como materia.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E290_BoD_Restrained.png"
    },
    {
      id: "bala-humana",
      titulo: "Bala humana",
      episodio: "277",
      arco: "halcon-milenario",
      archivo: "assets/img/paneles/bala-humana",
      ancho: 1100,
      alto: 761,
      alt: "Un proyectil estalla contra una criatura monstruosa entre rayos, con un recuadro del rostro de Guts.",
      descripcion: "Un proyectil de piedra estalla contra una criatura monstruosa mientras el rostro de Guts aparece en un recuadro lateral. Rayos, grietas y tramado cruzado en una sola viñeta.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E277_Human_Bullet.png"
    },
    {
      id: "superficie-vortice",
      titulo: "La superficie del vórtice",
      episodio: "0-8",
      arco: "espadachin-negro",
      archivo: "assets/img/paneles/superficie-vortice",
      ancho: 1100,
      alto: 619,
      alt: "Un remolino de almas bajo una arquitectura negra que flota boca abajo.",
      descripcion: "La superficie del vórtice: un remolino de almas bajo una arquitectura negra que flota boca abajo. Composición onírica de la primera etapa de la obra, todavía con menos negro y más línea.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E0-8_Surface_of_Vortex.png"
    },
    {
      id: "era-fantasia",
      titulo: "El mundo fantástico",
      episodio: "333",
      arco: "fantasia",
      archivo: "assets/img/paneles/era-fantasia",
      ancho: 1100,
      alto: 564,
      alt: "Paisaje de la Era de la Fantasía con un árbol de luz, cristales gigantes y un horizonte de líneas temblorosas.",
      descripcion: "El paisaje de la Era de la Fantasía: un árbol de luz, cristales gigantes y un horizonte de líneas temblorosas. Menos negro y más línea: el trazo se vuelve casi ilustración.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E333_Fantasia.png"
    },
    {
      id: "eclipse",
      titulo: "El Eclipse",
      episodio: "73",
      arco: "eclipse",
      archivo: "assets/img/paneles/eclipse",
      ancho: 1100,
      alto: 985,
      alt: "Un sol negro sobre un campo de figuras inmóviles y una silueta sentada en el agua.",
      descripcion: "El Eclipse: un sol negro sobre un campo de figuras inmóviles y una silueta sentada en el agua. La página más silenciosa de la saga, construida con un único punto de negro absoluto.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E73_Eclipse_Invoked.png"
    },
    {
      id: "conrad",
      titulo: "Conrad se manifiesta",
      episodio: "306",
      arco: "halcon-milenario",
      archivo: "assets/img/paneles/conrad",
      ancho: 1100,
      alto: 769,
      alt: "Masa de ojos y carne con la que se manifiesta Conrad.",
      descripcion: "Conrad se manifiesta como una masa de ojos y carne. El detalle es tan denso que el panel funciona casi como un grabado abstracto: no hay un centro claro, solo textura.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E306_Conrad_Manifested.png"
    },
    {
      id: "mano-cielo",
      titulo: "La mano sobre el cielo",
      episodio: "163",
      arco: "condena",
      archivo: "assets/img/paneles/mano-cielo",
      ancho: 1100,
      alto: 783,
      alt: "Una mano gigantesca se abre en el cielo nocturno sobre un paisaje de tejados.",
      descripcion: "Una mano gigantesca se abre en el cielo nocturno sobre un paisaje de tejados. La textura de la palma está resuelta con un tramado que parece una huella dactilar.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E163.png"
    },
    {
      id: "santuario",
      titulo: "El jardín de mármol",
      episodio: "337",
      arco: "fantasia",
      archivo: "assets/img/paneles/santuario",
      ancho: 1100,
      alto: 801,
      alt: "Pabellón de mármol, arcos góticos y un estanque de nenúfares.",
      descripcion: "Un pabellón de mármol, arcos góticos y un estanque de nenúfares. Aquí Miura cambia el negro por la línea limpia y demuestra que también domina el blanco.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E337.png"
    },
    {
      id: "huevo-mundo",
      titulo: "El huevo del mundo perfecto",
      episodio: "162",
      arco: "condena",
      archivo: "assets/img/paneles/huevo-mundo",
      ancho: 1100,
      alto: 782,
      alt: "Colina de beherits con rostros humanos, cada uno con ojos y boca propios.",
      descripcion: "El Huevo del Mundo Perfecto: una colina de beherits con rostros humanos. Cada beherit tiene ojos, boca y expresión propia, y el conjunto produce vértigo.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E162.png"
    },
    {
      id: "companerismo",
      titulo: "Dos capas, un camino",
      episodio: "78",
      arco: "eclipse",
      archivo: "assets/img/paneles/companerismo",
      ancho: 1100,
      alto: 619,
      alt: "Guts y Griffith caminando juntos, con las capas ocupando el tercio inferior de la imagen.",
      descripcion: "Guts y Griffith caminando juntos, con las capas ocupando el tercio inferior. Una imagen casi vacía, de gran superficie blanca, que resume la Edad Dorada antes de la caída.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E78_Camaraderie.png"
    },
    {
      id: "griffith-victorioso",
      titulo: "El halcón sobre los caídos",
      episodio: "28",
      arco: "edad-dorada",
      archivo: "assets/img/paneles/griffith-victorioso",
      ancho: 983,
      alto: 1100,
      alt: "Griffith de pie sobre los caídos, con un halcón blanco y una bandada de cuervos sobre el campo.",
      descripcion: "Griffith de pie sobre los caídos, con un halcón blanco y una bandada de cuervos sobrevolando el campo. La silueta del ave y la de la armadura se responden en espejo.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E28_Griffith_Victorious.png"
    },
    {
      id: "judeau-caballeria",
      titulo: "La caballería del Halcón",
      episodio: "14",
      arco: "edad-dorada",
      archivo: "assets/img/paneles/judeau-caballeria",
      ancho: 733,
      alto: 1100,
      alt: "Judeau a caballo en plena carga contra los Caballeros de la Ballena Azul.",
      descripcion: "Judeau en plena carga contra los Caballeros de la Ballena Azul. El dibujo todavía está en la etapa de línea suelta de los primeros tomos: menos negro y más aire entre las figuras.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E14_Judeau_fights_against_the_Blue_Whale_Knights.png"
    },
    {
      id: "skull-knight-zodd",
      titulo: "Calavera contra Zodd",
      episodio: "225",
      arco: "halcon-milenario",
      archivo: "assets/img/paneles/skull-knight-zodd",
      ancho: 1068,
      alto: 874,
      alt: "El Caballero Calavera y Zodd cruzan espadas en el aire entre líneas de impacto.",
      descripcion: "El Caballero Calavera y Zodd cruzan espadas en el aire. Las líneas de impacto salen del centro y rompen el marco del panel, un recurso que Miura usa para dar velocidad al combate.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E225_Skull_Knight_Battles_Zodd.png"
    },
    {
      id: "griffith-guardia",
      titulo: "Griffith y la sombra",
      episodio: "302",
      arco: "halcon-milenario",
      archivo: "assets/img/paneles/griffith-guardia",
      ancho: 1019,
      alto: 1100,
      alt: "Griffith con armadura ceremonial, flanqueado por una cabeza de león gigantesca.",
      descripcion: "Griffith con armadura ceremonial, flanqueado por una cabeza de león gigantesca. El blanco del rostro y el negro del pelaje dividen el panel en dos mitades casi simétricas.",
      fuente: "https://berserk.fandom.com/wiki/File:Manga_E302_Griffith.png"
    }
  ]
};
