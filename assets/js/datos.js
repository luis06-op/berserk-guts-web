/* ==========================================================================
   DATOS DEL ARCHIVO — personajes, facciones y arcos argumentales
   --------------------------------------------------------------------------
   Archivo único de datos para las páginas de catálogo. Se declara como objeto
   global (sin módulos ES) para que el sitio funcione también al abrir los
   archivos con file://, sin servidor local.

   Cada personaje:
     id            identificador usado en filtros y modales
     nombre        nombre canónico
     epiteto       apodo o título
     faccion       lista de facciones (la primera define la insignia)
     estado        vivo | fallecido | desconocido
     primera       primera aparición aproximada
     rol           oficio o papel en la historia
     resumen       texto breve para la tarjeta (3 líneas)
     descripcion   párrafos para la ficha ampliada
     habilidades   lista breve
     arcos         identificadores de los arcos en los que participa
     imagen / alt  retrato y texto alternativo
     wiki          enlace externo a la ficha del personaje en el wiki de Berserk
     spoiler       true si la ficha revela giros importantes
   ========================================================================== */

window.BERSERK = (function () {
  "use strict";

  const facciones = [
    { id: "halcon", nombre: "Banda del Halcón", clase: "halcon" },
    { id: "guts", nombre: "Compañía de Guts", clase: "guts" },
    { id: "apostoles", nombre: "Apóstoles", clase: "apostol" },
    { id: "mano", nombre: "Mano de Dios", clase: "mano" },
    { id: "kushan", nombre: "Imperio de Kushan", clase: "kushan" },
    { id: "solitario", nombre: "Sin bando", clase: "solitario" }
  ];

  const estados = {
    vivo: { texto: "Vivo", clase: "vivo" },
    fallecido: { texto: "Fallecido", clase: "fallecido" },
    desconocido: { texto: "Desconocido", clase: "desconocido" }
  };

  const personajes = [
    {
      id: "guts",
      nombre: "Guts",
      epiteto: "El Espadachín Negro",
      faccion: ["guts", "halcon"],
      estado: "vivo",
      primera: "Manga · arco del Espadachín Negro",
      rol: "Mercenario y cazador de apóstoles",
      resumen:
        "Único superviviente conocido del Eclipse que no vendió su alma. Arrastra la marca de sacrificio y un mandoble demasiado grande para cualquier otra persona.",
      descripcion: [
        "Nacido de un parto que costó la vida a su madre, Guts creció entre campamentos de mercenarios y aprendió a empuñar una espada antes que a leer. Su etapa en la Banda del Halcón le dio un hogar, un propósito y a la persona que amaba; el Eclipse se lo arrebató todo en una sola noche.",
        "Desde entonces recorre el mundo con la marca de sacrificio grabada en la nuca, perseguido por espíritus y cazando apóstoles. La espada Matadragones, forjada para matar dragones de leyenda, se ha convertido en su herramienta de trabajo y en casi una extensión de su cuerpo."
      ],
      habilidades: [
        "Manejo de espadón a dos manos",
        "Resistencia y reflejos sobrehumanos",
        "Brazo protésico con ballesta y cañón",
        "Instinto táctico forjado en cien batallas"
      ],
      arcos: ["espadachin-negro", "edad-dorada", "eclipse", "condena", "halcon-milenario", "fantasia"],
      imagen: "assets/img/personajes/guts.jpg",
      alt: "Guts, el Espadachín Negro, con su armadura y su enorme espada",
      wiki: "https://berserk.fandom.com/wiki/Guts",
      spoiler: false
    },
    {
      id: "griffith",
      nombre: "Griffith",
      epiteto: "El Halcón Blanco",
      faccion: ["halcon"],
      estado: "vivo",
      primera: "Manga · arco de la Edad Dorada",
      rol: "Fundador y líder de la Banda del Halcón",
      resumen:
        "Un estratega de belleza inquietante capaz de convertir a un puñado de marginados en el ejército más temido del reino. Su sueño tiene un precio que otros pagan.",
      descripcion: [
        "Griffith no persigue la gloria por vanidad: persigue un reino propio, un lugar donde nadie vuelva a mirarlo desde arriba. Su carisma y su lectura del campo de batalla le permiten reunir bajo su bandera a hombres que no tenían nada que perder.",
        "El Behelit carmesí que lleva consigo es la llave de su destino. Cuando su cuerpo queda destrozado y su sueño parece imposible, el Eclipse le ofrece un camino: la vida de todos sus compañeros a cambio de su ascensión. Renacido como Femto, miembro de la Mano de Dios, terminará fundando Falconia."
      ],
      habilidades: [
        "Estrategia militar y diplomacia",
        "Esgrima precisa con sable",
        "Carisma magnético",
        "Lectura del destino a través del Behelit"
      ],
      arcos: ["edad-dorada", "eclipse", "condena", "halcon-milenario", "fantasia"],
      imagen: "assets/img/personajes/griffith.jpg",
      alt: "Griffith, el Halcón Blanco, con armadura blanca y espada",
      wiki: "https://berserk.fandom.com/wiki/Griffith",
      spoiler: false
    },
    {
      id: "casca",
      nombre: "Casca",
      epiteto: "La Capitana de la Banda",
      faccion: ["halcon", "guts"],
      estado: "vivo",
      primera: "Manga · arco de la Edad Dorada",
      rol: "Capitana de la Banda del Halcón",
      resumen:
        "La única mujer en la primera línea de la Banda del Halcón, y probablemente la más competente con una espada. Su vínculo con Guts cambiará el rumbo de ambos.",
      descripcion: [
        "Casca se disfrazó de hombre para sobrevivir y terminó mandando tropas. Es disciplinada, directa y exigente, y ha construido su identidad alrededor de proteger a Griffith y de un sueño que no es el suyo.",
        "El Eclipse le arrebata la razón y durante años apenas conserva jirones de sí misma. Con la ayuda de Farnese, Schierke y el tiempo, recupera la memoria y vuelve a viajar junto a Guts con un objetivo claro: encontrar el lugar donde la marca pueda deshacerse."
      ],
      habilidades: [
        "Esgrima y combate de primera línea",
        "Mando de tropas",
        "Táctica de infantería",
        "Voluntad inquebrantable"
      ],
      arcos: ["edad-dorada", "eclipse", "condena", "halcon-milenario", "fantasia"],
      imagen: "assets/img/personajes/casca.jpg",
      alt: "Casca junto a Puck, con su armadura y mirada cansada",
      wiki: "https://berserk.fandom.com/wiki/Casca",
      spoiler: true
    },
    {
      id: "judeau",
      nombre: "Judeau",
      epiteto: "El de los Cuchillos",
      faccion: ["halcon"],
      estado: "fallecido",
      primera: "Manga · arco de la Edad Dorada",
      rol: "Explorador y mano derecha de Griffith",
      resumen:
        "Malabarista antes que soldado, Judeau lee a la gente tan bien como lee el terreno. Fue uno de los pocos que supo ver el precio del sueño de Griffith.",
      descripcion: [
        "Ágil, discreto y con una sonrisa fácil, Judeau hace de enlace entre bandas, espía al enemigo y conversa con quien haga falta. Sus cuchillos vuelan antes de que el adversario termine de desenvainar.",
        "Su lealtad no era ciega: entendía a Griffith mejor que muchos y aun así eligió quedarse. En el Eclipse intenta salvar a Casca hasta su último aliento."
      ],
      habilidades: [
        "Lanzamiento de cuchillos",
        "Infiltración y exploración",
        "Conocimientos básicos de medicina",
        "Negociación con bandas rivales"
      ],
      arcos: ["edad-dorada", "eclipse"],
      imagen: "assets/img/personajes/judeau.jpg",
      alt: "Judeau con armadura ligera y sus cuchillos",
      wiki: "https://berserk.fandom.com/wiki/Judeau",
      spoiler: true
    },
    {
      id: "pippin",
      nombre: "Pippin",
      epiteto: "El Muro",
      faccion: ["halcon"],
      estado: "fallecido",
      primera: "Manga · arco de la Edad Dorada",
      rol: "Guardaespaldas de Griffith",
      resumen:
        "Un gigante de pocas palabras que se planta entre Griffith y cualquier amenaza. Su presencia, más que su hacha, impone respeto.",
      descripcion: [
        "Pippin habla poco y golpea mucho. Antes de unirse a la banda trabajó como guardaespaldas, y conserva la costumbre de colocarse un paso por delante de la persona a la que protege.",
        "En el Eclipse sostiene la línea cuando todo se derrumba. Su resistencia da a otros segundos que valen vidas, aunque su propia suerte esté echada."
      ],
      habilidades: [
        "Fuerza descomunal",
        "Hacha a dos manos",
        "Protección de formación",
        "Serenidad bajo presión"
      ],
      arcos: ["edad-dorada", "eclipse"],
      imagen: "assets/img/personajes/pippin.jpg",
      alt: "Pippin, guerrero corpulento de la Banda del Halcón",
      wiki: "https://berserk.fandom.com/wiki/Pippin",
      spoiler: true
    },
    {
      id: "corkus",
      nombre: "Corkus",
      epiteto: "El Veterano",
      faccion: ["halcon"],
      estado: "fallecido",
      primera: "Manga · arco de la Edad Dorada",
      rol: "Veterano de la banda",
      resumen:
        "Capitaneaba su propia cuadrilla antes de que Griffith llegara. Su orgullo herido y su lengua afilada esconden un soldado que no abandona a los suyos.",
      descripcion: [
        "Corkus desconfía de Griffith desde el primer día, y no duda en decirlo. Le molesta que un muchacho de mirada limpia le haya quitado el mando, pero reconoce su talento y se queda.",
        "Su escepticismo funciona como contrapeso al entusiasmo general. En el Eclipse, ese mismo orgullo lo mantiene en pie hasta el final."
      ],
      habilidades: [
        "Mando de cuadrillas",
        "Espada y escudo",
        "Saqueo y logística",
        "Temple de veterano"
      ],
      arcos: ["edad-dorada", "eclipse"],
      imagen: "assets/img/personajes/corkus.jpg",
      alt: "Corkus con armadura y barba, mirando de frente",
      wiki: "https://berserk.fandom.com/wiki/Corkus",
      spoiler: true
    },
    {
      id: "rickert",
      nombre: "Rickert",
      epiteto: "El Aprendiz",
      faccion: ["halcon"],
      estado: "vivo",
      primera: "Manga · arco de la Edad Dorada",
      rol: "Herrero y ayudante de la banda",
      resumen:
        "El miembro más joven de la banda. Sobrevive al Eclipse por pura casualidad y dedica su vida a reconstruirse lejos de la guerra.",
      descripcion: [
        "Rickert entra en la banda siendo un niño y crece entre herreros y caballos. Su habilidad con las manos y su carácter tranquilo lo hacen querido por todos.",
        "Tras el Eclipse se instala como herrero y forma una pequeña comunidad. Años después, ante la oferta de Griffith, toma una de las decisiones más valientes de la historia: decir que no."
      ],
      habilidades: [
        "Forja y reparación de equipo",
        "Mecánica y artesanía",
        "Supervivencia",
        "Sentido común"
      ],
      arcos: ["edad-dorada", "eclipse", "fantasia"],
      imagen: "assets/img/personajes/rickert.jpg",
      alt: "Rickert, joven de la Banda del Halcón, con armadura ligera",
      wiki: "https://berserk.fandom.com/wiki/Rickert",
      spoiler: false
    },
    {
      id: "farnese",
      nombre: "Farnese",
      epiteto: "La Cazadora de Brujas",
      faccion: ["guts"],
      estado: "vivo",
      primera: "Manga · arco de la Condena",
      rol: "Inquisidora y luego aprendiz de bruja",
      resumen:
        "Heredera de una casa noble que encontró en el fuego una forma de llenar su vacío. Su encuentro con Guts y Casca la obliga a empezar de cero.",
      descripcion: [
        "Farnese creció rodeada de lujo y de silencios incómodos. Como comandante de los Caballeros de la Cadena de Hierro, convirtió la purga de herejes en un espectáculo personal.",
        "Cuando su mundo se desmorona, se aferra a Casca como a un ancla. Aprende a cuidar, a leer y, más tarde, a canalizar la magia de los elementos bajo la tutoría de Schierke."
      ],
      habilidades: [
        "Magia del fuego (Salamander)",
        "Mando militar",
        "Cuidados y asistencia",
        "Voluntad de cambio"
      ],
      arcos: ["condena", "halcon-milenario", "fantasia"],
      imagen: "assets/img/personajes/farnese.jpg",
      alt: "Farnese con cabello rubio y mirada decidida",
      wiki: "https://berserk.fandom.com/wiki/Farnese",
      spoiler: false
    },
    {
      id: "serpico",
      nombre: "Serpico",
      epiteto: "El Caballero del Viento",
      faccion: ["guts"],
      estado: "vivo",
      primera: "Manga · arco de la Condena",
      rol: "Mayordomo, guardián y espadachín",
      resumen:
        "Sirviente de Farnese y, en secreto, su hermanastro. Bajo los modales impecables hay un espadachín que no duda en medirse con Guts.",
      descripcion: [
        "Serpico creció sabiendo cuál era su lugar y ocupándolo con una elegancia que no oculta del todo su origen. Su lealtad a Farnese es absoluta, aunque a veces discrepe de sus decisiones.",
        "Su estoque y la capa tejida con espíritus del viento le permiten moverse por el campo de batalla como si flotara. Enfrentarse a Guts le cuesta caro, pero le enseña de qué está hecho."
      ],
      habilidades: [
        "Estoque de precisión",
        "Magia del viento con la capa de silfos",
        "Análisis del terreno",
        "Cocina y logística de campaña"
      ],
      arcos: ["condena", "halcon-milenario", "fantasia"],
      imagen: "assets/img/personajes/serpico.jpg",
      alt: "Serpico con su capa y su espada, en actitud serena",
      wiki: "https://berserk.fandom.com/wiki/Serpico",
      spoiler: false
    },
    {
      id: "schierke",
      nombre: "Schierke",
      epiteto: "La Bruja de Elfhelm",
      faccion: ["guts"],
      estado: "vivo",
      primera: "Manga · arco de la Condena",
      rol: "Bruja y guía espiritual",
      resumen:
        "Discípula de Flora y una de las últimas brujas que quedan. Su magia astral mantiene a Guts atado a su propia humanidad.",
      descripcion: [
        "Schierke aprendió a leer los hilos del mundo astral antes de aprender a montar a caballo. Habla con los espíritus de los árboles y de los ríos, y desconfía de los adultos que dicen saberlo todo.",
        "Acompaña a Guts para impedir que la armadura berserker lo consuma. Su juventud choca con la brutalidad del camino, pero también aporta al grupo una brújula moral que nadie más tiene."
      ],
      habilidades: [
        "Magia astral y proyección de la conciencia",
        "Hechizos de protección y barreras",
        "Lectura de presencias sobrenaturales",
        "Conocimiento de runas y leyendas"
      ],
      arcos: ["condena", "halcon-milenario", "fantasia"],
      imagen: "assets/img/personajes/schierke.jpg",
      alt: "Schierke con su gran sombrero de bruja y su bastón",
      wiki: "https://berserk.fandom.com/wiki/Schierke",
      spoiler: false
    },
    {
      id: "isidro",
      nombre: "Isidro",
      epiteto: "El Ladrón",
      faccion: ["guts"],
      estado: "vivo",
      primera: "Manga · arco de la Condena",
      rol: "Aprendiz de espadachín",
      resumen:
        "Un chico de la calle que decide que Guts será su maestro, le guste a Guts o no. Rápido, bocazas y más valiente de lo que aconseja el sentido común.",
      descripcion: [
        "Isidro sobrevivía robando y corriendo. Su primera reacción ante cualquier problema es moverse, y esa costumbre lo convierte en un blanco difícil y en un aprendiz frustrante.",
        "Bajo la tutela informal de Guts aprende a luchar con dos espadas cortas y descubre que la valentía no consiste en no tener miedo. También descubre que las brujas y los elfos existen, lo que no le hace ninguna gracia."
      ],
      habilidades: [
        "Agilidad y reflejos",
        "Dos espadas cortas",
        "Honda y piedras",
        "Callejeo y distracción"
      ],
      arcos: ["condena", "halcon-milenario", "fantasia"],
      imagen: "assets/img/personajes/isidro.jpg",
      alt: "Isidro, joven espadachín de pelo erizado, con sus espadas",
      wiki: "https://berserk.fandom.com/wiki/Isidro",
      spoiler: false
    },
    {
      id: "puck",
      nombre: "Puck",
      epiteto: "El Elfo Sanador",
      faccion: ["guts"],
      estado: "vivo",
      primera: "Manga · arco del Espadachín Negro",
      rol: "Sanador y conciencia del grupo",
      resumen:
        "El primer compañero de Guts tras el Eclipse. Su polvo de elfo cierra heridas y su humor insufrible mantiene a todos cuerdos.",
      descripcion: [
        "Puck es curioso, impertinente y sorprendentemente valiente para su tamaño. Se pega a Guts porque intuye que detrás de la armadura hay alguien a quien merece la pena no dejar solo.",
        "Su magia es limitada pero valiosa: acelera la curación, calma el dolor y detecta presencias. También es el único que se atreve a ponerle límites a Guts cuando nadie más lo hace."
      ],
      habilidades: [
        "Polvo de elfo curativo",
        "Detección de espíritus",
        "Empatía y mediación",
        "Humor a prueba de espadazos"
      ],
      arcos: ["espadachin-negro", "condena", "halcon-milenario", "fantasia"],
      imagen: "assets/img/personajes/puck.jpg",
      alt: "Puck, el pequeño elfo de alas translúcidas",
      wiki: "https://berserk.fandom.com/wiki/Puck",
      spoiler: false
    },
    {
      id: "zodd",
      nombre: "Nosferatu Zodd",
      epiteto: "La Bestia Inmortal",
      faccion: ["apostoles"],
      estado: "vivo",
      primera: "Manga · arco de la Edad Dorada",
      rol: "Apóstol y guerrero errante",
      resumen:
        "Trescientos años buscando un rival que lo mate. Cuando lo encuentra, descubre que el verdadero monstruo todavía está por llegar.",
      descripcion: [
        "Zodd recorre los campos de batalla desde hace siglos, dejando un rastro de cuerpos y rumores. Su forma humana ya es enorme; su forma de apóstol, con cuernos y alas, es una catástrofe con hacha.",
        "Reconoce en Guts una chispa que no había visto en nadie y decide esperar. Su lealtad a Griffith, cuando llega, no nace del miedo sino del reconocimiento de una fuerza superior."
      ],
      habilidades: [
        "Fuerza y tamaño colosales",
        "Regeneración de apóstol",
        "Transformación demoníaca",
        "Hacha de guerra"
      ],
      arcos: ["edad-dorada", "condena", "halcon-milenario", "fantasia"],
      imagen: "assets/img/personajes/zodd.jpg",
      alt: "Nosferatu Zodd en su forma de apóstol, con cuernos",
      wiki: "https://berserk.fandom.com/wiki/Nosferatu_Zodd",
      spoiler: false
    },
    {
      id: "skullknight",
      nombre: "Caballero Calavera",
      epiteto: "El Espectro del Abismo",
      faccion: ["solitario"],
      estado: "desconocido",
      primera: "Manga · arco de la Edad Dorada",
      rol: "Espadachín errante, enemigo de la Mano de Dios",
      resumen:
        "Una armadura vacía que cabalga un caballo espectral y aparece justo cuando el destino se inclina demasiado. Nadie sabe qué quiere, pero todos temen su espada.",
      descripcion: [
        "El Caballero Calavera habla con la serenidad de quien ha visto caer reinos. Conoce el funcionamiento de los Behelit, los eclipses y la Mano de Dios, y trata a sus miembros como viejos conocidos.",
        "Su espada atraviesa planos de existencia y su montura galopa sobre el aire. Rescata a Guts y a Casca del Eclipse sin pedir nada a cambio, y deja tras de sí más preguntas que respuestas."
      ],
      habilidades: [
        "Espada que corta el espacio",
        "Inmortalidad aparente",
        "Conocimiento del destino",
        "Montura espectral"
      ],
      arcos: ["edad-dorada", "eclipse", "condena", "halcon-milenario", "fantasia"],
      imagen: "assets/img/personajes/skullknight.jpg",
      alt: "El Caballero Calavera con su armadura y su espada",
      wiki: "https://berserk.fandom.com/wiki/Skull_Knight",
      spoiler: false
    },
    {
      id: "void",
      nombre: "Void",
      epiteto: "El Cerebro de la Mano de Dios",
      faccion: ["mano"],
      estado: "desconocido",
      primera: "Manga · arco de la Edad Dorada",
      rol: "Miembro de la Mano de Dios",
      resumen:
        "La figura central de la Mano de Dios. Preside los eclipses y observa el sufrimiento humano con la curiosidad de un científico.",
      descripcion: [
        "Void fue alguna vez un hombre, y su cráneo expuesto es el recordatorio de lo que entregó para ascender. Su voz es tranquila, casi amable, y sus preguntas son siempre trampas.",
        "Controla el espacio alrededor de los Behelit y decide cuándo se abre la puerta del Eclipse. No combate: administra el destino como quien pasa páginas."
      ],
      habilidades: [
        "Manipulación del espacio",
        "Conocimiento absoluto del ritual",
        "Telequinesis",
        "Autoridad sobre los apóstoles"
      ],
      arcos: ["edad-dorada", "eclipse", "condena"],
      imagen: "assets/img/personajes/void.jpg",
      alt: "Void, figura encapuchada de la Mano de Dios con el rostro oculto",
      wiki: "https://berserk.fandom.com/wiki/Void",
      spoiler: false
    },
    {
      id: "grunbeld",
      nombre: "Grunbeld",
      epiteto: "El Dragón de Fuego",
      faccion: ["apostoles"],
      estado: "vivo",
      primera: "Manga · arco del Halcón Milenario",
      rol: "General apóstol al servicio de Griffith",
      resumen:
        "Un comandante que convierte su cuerpo en cristal y fuego. De todos los generales de Griffith, es el que menos se parece a un monstruo.",
      descripcion: [
        "Grunbeld conserva un código de honor que sorprende en un apóstol. Respeta a los guerreros que se mantienen en pie y desprecia a quienes huyen, aunque la huida sea la única opción sensata.",
        "En el campo de batalla adopta una forma de dragón cubierta de escamas cristalinas y escupe fuego. Su martillo y su resistencia han detenido ejércitos enteros."
      ],
      habilidades: [
        "Fuerza sobrehumana",
        "Piel de cristal",
        "Aliento de fuego",
        "Martillo de guerra"
      ],
      arcos: ["halcon-milenario", "fantasia"],
      imagen: "assets/img/personajes/grunbeld.jpg",
      alt: "Grunbeld, general apóstol con armadura y martillo",
      wiki: "https://berserk.fandom.com/wiki/Grunbeld",
      spoiler: false
    },
    {
      id: "gambino",
      nombre: "Gambino",
      epiteto: "El Capitán Quebrado",
      faccion: ["solitario"],
      estado: "fallecido",
      primera: "Manga · analepsis del Espadachín Negro",
      rol: "Capitán mercenario y padre adoptivo de Guts",
      resumen:
        "Recogió a Guts de entre los muertos y lo crio entre cuchillos, deudas y malos inviernos. Nunca supo qué hacer con el niño que le había costado a su mujer.",
      descripcion: [
        "Gambino mandaba una cuadrilla pequeña y sucia que se alquilaba al mejor postor. Bebía para olvidar a Shisu, la mujer que murió de peste, y descargaba la culpa sobre el crío que ella había salvado del barro.",
        "Le enseñó a afilar, a cobrar y a no esperar nada de nadie. Cuando una cojera le cerró el campo de batalla, sus deudas lo empujaron a decisiones que Guts no le perdonó jamás. Murió a manos del hijo que había criado, y la marca que dejó en él es anterior a cualquier apóstol."
      ],
      habilidades: [
        "Combate con hacha corta y daga",
        "Mando de cuadrillas mercenarias",
        "Supervivencia en campaña",
        "Lectura del terreno"
      ],
      arcos: ["espadachin-negro", "edad-dorada"],
      imagen: "assets/img/personajes/gambino.jpg",
      alt: "Gambino, mercenario curtido con armadura ligera y mirada cansada",
      wiki: "https://berserk.fandom.com/wiki/Gambino",
      spoiler: true
    },
    {
      id: "wyald",
      nombre: "Wyald",
      epiteto: "La Bestia de la Banda Negra",
      faccion: ["apostoles"],
      estado: "fallecido",
      primera: "Manga · arco de la Edad Dorada",
      rol: "Apóstol y líder de los mercenarios de la Banda Negra",
      resumen:
        "Un apóstol que disfraza de ejército su propia hambre. Su banda no cobra por luchar: cobra por lo que hace después de ganar.",
      descripcion: [
        "Wyald lleva siglos convertido en algo que ya no necesita excusas. Gobierna a sus hombres por terror puro y disfruta del saqueo tanto como de la batalla, hasta el punto de que la corte de Midland lo tolera por pura cobardía.",
        "Su forma de apóstol es un gorila gigantesco de fuerza desmedida y regeneración inmediata. Solo la intervención de Zodd pone fin a su carrera, y su muerte recuerda que en este mundo los monstruos también tienen depredadores."
      ],
      habilidades: [
        "Transformación de apóstol",
        "Regeneración acelerada",
        "Fuerza descomunal",
        "Terror como arma de mando"
      ],
      arcos: ["edad-dorada"],
      imagen: "assets/img/personajes/wyald.jpg",
      alt: "Wyald, apóstol de aspecto bestial con melena y colmillos",
      wiki: "https://berserk.fandom.com/wiki/Wyald",
      spoiler: true
    },
    {
      id: "slan",
      nombre: "Slan",
      epiteto: "La Princesa del Mar Uterino",
      faccion: ["mano"],
      estado: "desconocido",
      primera: "Manga · arco del Eclipse",
      rol: "Miembro de la Mano de Dios",
      resumen:
        "La única mujer de la Mano de Dios y la que habla con más gusto del deseo. Encuentra en Guts un juguete resistente y no piensa soltarlo.",
      descripcion: [
        "Slan se presenta desnuda y desafiante, sin la solemnidad de Void ni el mutismo de Conrad. Su discurso es siempre el mismo: el deseo humano, llevado hasta el final, es la única ofrenda que merece la pena.",
        "En Qliphoth construye un cuerpo con intestinos y entrañas para pelear contra Guts, y disfruta cada segundo del combate. No busca vencer: busca que su juguete demuestre cuánto aguanta antes de romperse."
      ],
      habilidades: [
        "Manipulación del deseo ajeno",
        "Construcción de un cuerpo de materia orgánica",
        "Magia de la Mano de Dios",
        "Presencia que corrompe el entorno"
      ],
      arcos: ["eclipse", "condena"],
      imagen: "assets/img/personajes/slan.jpg",
      alt: "Slan, miembro de la Mano de Dios, de pie y envuelta en sombras",
      wiki: "https://berserk.fandom.com/wiki/Slan",
      spoiler: true
    },
    {
      id: "ubik",
      nombre: "Ubik",
      epiteto: "El Orador",
      faccion: ["mano"],
      estado: "desconocido",
      primera: "Manga · arco del Eclipse",
      rol: "Miembro de la Mano de Dios",
      resumen:
        "No combate ni amenaza: argumenta. Su cuerpo blando y su voz razonable convierten cada sacrificio en una decisión libre del sacrificado.",
      descripcion: [
        "Ubik se sienta frente al elegido y le muestra su historia con una claridad que duele: cada deseo, cada renuncia, cada paso que lo trajo hasta el Behelit. Después, solo pregunta si desea continuar.",
        "Su papel en el Eclipse es el de notario. Hace que Griffith firme su propio destino con los ojos abiertos y le quita así cualquier excusa futura. Es el más débil de la Mano y, probablemente, el más cruel."
      ],
      habilidades: [
        "Ilusión que expone la memoria",
        "Retórica y manipulación",
        "Conocimiento del ritual del Behelit",
        "Presencia en el plano astral"
      ],
      arcos: ["eclipse", "condena"],
      imagen: "assets/img/personajes/ubik.jpg",
      alt: "Ubik, figura de la Mano de Dios de cuerpo blando y cabeza alargada",
      wiki: "https://berserk.fandom.com/wiki/Ubik",
      spoiler: true
    },
    {
      id: "conrad",
      nombre: "Conrad",
      epiteto: "El Silencioso",
      faccion: ["mano"],
      estado: "desconocido",
      primera: "Manga · arco del Eclipse",
      rol: "Miembro de la Mano de Dios",
      resumen:
        "El cuarto miembro de la Mano de Dios no habla, no negocia y casi no se mueve. Cuando interviene, el mundo se pudre alrededor de su mano.",
      descripcion: [
        "Conrad permanece inmóvil en las visiones del Eclipse, cubierto de vendas y con la mirada perdida. Su silencio no es desinterés: es la certeza de que el ritual ya está decidido.",
        "Su magia es la putrefacción. Basta un gesto para que la carne se deshaga y la tierra se abra. De todos los miembros de la Mano de Dios, es el que menos se parece a una persona y el que menos necesita serlo."
      ],
      habilidades: [
        "Descomposición instantánea",
        "Control de la materia orgánica",
        "Magia de la Mano de Dios",
        "Inmunidad al daño físico"
      ],
      arcos: ["eclipse"],
      imagen: "assets/img/personajes/conrad.jpg",
      alt: "Conrad, figura envuelta en vendas de la Mano de Dios",
      wiki: "https://berserk.fandom.com/wiki/Conrad",
      spoiler: true
    },
    {
      id: "irvine",
      nombre: "Irvine",
      epiteto: "El Arquero de la Noche",
      faccion: ["apostoles"],
      estado: "vivo",
      primera: "Manga · arco del Halcón Milenario",
      rol: "General apóstol y arquero de Griffith",
      resumen:
        "Dispara desde donde nadie mira, con un ojo que ya no es del todo humano. El general más silencioso del ejército de Griffith y el que nunca falla un tiro.",
      descripcion: [
        "Irvine era un cazador solitario antes de encontrar un señor al que servir. Habla poco, observa mucho y rara vez opina sobre la guerra: para él, cada batalla es una pieza de caza mayor.",
        "Su forma de apóstol es una bestia oscura de pelo espeso y un ojo vertical que corrige la puntería. Su arco dispara flechas capaces de atravesar armaduras, y su calma resulta más inquietante que la furia de Grunbeld."
      ],
      habilidades: [
        "Puntería sobrehumana",
        "Ojo de apóstol que corrige la trayectoria",
        "Rastreo y emboscada",
        "Forma bestial de combate"
      ],
      arcos: ["halcon-milenario", "fantasia"],
      imagen: "assets/img/personajes/irvine.jpg",
      alt: "Irvine, arquero apóstol con capa y arco largo",
      wiki: "https://berserk.fandom.com/wiki/Irvine",
      spoiler: false
    },
    {
      id: "locus",
      nombre: "Locus",
      epiteto: "El Caballero de la Luna",
      faccion: ["apostoles"],
      estado: "vivo",
      primera: "Manga · arco del Halcón Milenario",
      rol: "General apóstol y caballero de élite",
      resumen:
        "Un caballero impecable que sirve a Griffith con la disciplina de una orden religiosa. Su lanza y su montura convierten la carga en una sentencia.",
      descripcion: [
        "Locus fue un guerrero errante que buscaba un señor digno de su lealtad. La encontró en Griffith, y desde entonces su código es simple: cumplir la orden y no hacer preguntas.",
        "Su forma de apóstol es un centauro acorazado, mitad caballo y mitad armadura, con una velocidad que ninguna infantería puede esquivar. Es el general más respetado de Falconia y el que mejor encarna el precio de la obediencia."
      ],
      habilidades: [
        "Carga de caballería devastadora",
        "Lanza y escudo",
        "Transformación de centauro acorazado",
        "Disciplina de combate absoluta"
      ],
      arcos: ["halcon-milenario", "fantasia"],
      imagen: "assets/img/personajes/locus.jpg",
      alt: "Locus, caballero apóstol con armadura y lanza",
      wiki: "https://berserk.fandom.com/wiki/Locus",
      spoiler: false
    },
    {
      id: "ganishka",
      nombre: "Ganishka",
      epiteto: "El Emperador que Quiso Ser Dios",
      faccion: ["kushan"],
      estado: "fallecido",
      primera: "Manga · arco del Halcón Milenario",
      rol: "Emperador de Kushan y apóstol",
      resumen:
        "El hombre más poderoso del mundo conocido, y el más aterrado de todos. Convirtió su imperio en un laboratorio para no volver a ser humano.",
      descripcion: [
        "Ganishka sometió Midland con elefantes, magia y una crueldad administrativa que no distingue soldados de civiles. Detrás del trono hay un hombre que teme a la muerte y que se odia por temerla.",
        "Se someta a un segundo ritual de Behelit y se convierte en una masa de niebla con tentáculos y ojos, tan grande que deja de tener forma humana. Su caída no la provoca un héroe: la provoca su propio miedo, aprovechado por Griffith para fundir los dos mundos."
      ],
      habilidades: [
        "Ejército y magia de Kushan",
        "Segunda transformación de apóstol",
        "Niebla devoradora de formas",
        "Poder político y militar absoluto"
      ],
      arcos: ["halcon-milenario"],
      imagen: "assets/img/personajes/ganishka.jpg",
      alt: "Ganishka, emperador de Kushan con corona y armadura ceremonial",
      wiki: "https://berserk.fandom.com/wiki/Ganishka",
      spoiler: true
    },
    {
      id: "flora",
      nombre: "Flora",
      epiteto: "La Señora del Bosque",
      faccion: ["solitario"],
      estado: "fallecido",
      primera: "Manga · arco de la Condena",
      rol: "Bruja y maestra de Schierke",
      resumen:
        "Una de las últimas grandes brujas de la vieja escuela. Vive en un árbol y enseña a Schierke que la magia también es una forma de responsabilidad.",
      descripcion: [
        "Flora lleva siglos en el bosque de las hadas, lejos de las ciudades y de los hombres que quemarían su casa si supieran dónde está. Recibe a Guts sin pedir nada y le explica lo que nadie más se molesta en explicarle.",
        "Muere defendiendo su hogar del fuego de Griffith, y su muerte marca el final de una época. Lo que deja atrás no es un grimorio: es una alumna capaz de seguir leyendo el mundo astral sin ella."
      ],
      habilidades: [
        "Magia astral de alto nivel",
        "Barreras y sellos protectores",
        "Conocimiento de la historia oculta",
        "Enseñanza y tutela"
      ],
      arcos: ["condena", "halcon-milenario"],
      imagen: "assets/img/personajes/flora.jpg",
      alt: "Flora, anciana bruja con vestiduras claras y bastón",
      wiki: "https://berserk.fandom.com/wiki/Flora",
      spoiler: true
    },
    {
      id: "luca",
      nombre: "Luca",
      epiteto: "La Que Sostiene a las Demás",
      faccion: ["solitario"],
      estado: "vivo",
      primera: "Manga · arco del Halcón Milenario",
      rol: "Guía de las mujeres de Vritannis",
      resumen:
        "Sin espada, sin magia y sin linaje, organiza a las mujeres que nadie protege. Su arma es saber a quién se puede comprar y a quién no.",
      descripcion: [
        "Luca dirige un grupo de mujeres que trabajan en el puerto de Vritannis. No las manda: las cubre, les consigue clientes seguros y les enseña a leer a los hombres antes de que ellos las lean a ellas.",
        "Cuando Nina y otras caen en manos de los apóstoles, Luca negocia, miente y arriesga el cuello sin dudarlo. Es el recordatorio de que en Berserk la dignidad también se defiende sin armas."
      ],
      habilidades: [
        "Negociación y trato con clientes",
        "Red de contactos en el puerto",
        "Lectura de personas",
        "Valor sin entrenamiento militar"
      ],
      arcos: ["halcon-milenario"],
      imagen: "assets/img/personajes/luca.jpg",
      alt: "Luca, mujer joven de cabello corto y mirada serena",
      wiki: "https://berserk.fandom.com/wiki/Luca",
      spoiler: false
    },
    {
      id: "charlotte",
      nombre: "Charlotte",
      epiteto: "La Princesa de Midland",
      faccion: ["halcon"],
      estado: "vivo",
      primera: "Manga · arco de la Edad Dorada",
      rol: "Princesa de Midland y reina de Falconia",
      resumen:
        "Creció encerrada en una torre de palacio y se enamoró del único hombre que la trató como a una persona. Ese hombre era Griffith.",
      descripcion: [
        "Charlotte pasa la primera mitad de su vida obedeciendo a un padre que la usa como ficha política. Su afecto por Griffith nace de la gratitud y se convierte en devoción cuando él la trata con una cortesía que nadie más le ofrece.",
        "Tras el Eclipse sobrevive al derrumbe del reino y termina a lado de Griffith en Falconia, convertida en reina de una ciudad que se sostiene sobre un sacrificio que ella no conoce del todo."
      ],
      habilidades: [
        "Formación cortesana y diplomática",
        "Conocimiento de la política de Midland",
        "Influencia simbólica sobre el pueblo",
        "Lealtad inquebrantable"
      ],
      arcos: ["edad-dorada", "halcon-milenario", "fantasia"],
      imagen: "assets/img/personajes/charlotte.jpg",
      alt: "Charlotte, princesa de Midland con vestido claro y cabello largo",
      wiki: "https://berserk.fandom.com/wiki/Charlotte",
      spoiler: true
    },
    {
      id: "azan",
      nombre: "Azan",
      epiteto: "El Caballero de la Cadena de Hierro",
      faccion: ["solitario"],
      estado: "vivo",
      primera: "Manga · arco de la Condena",
      rol: "Capitán de los Caballeros de la Cadena de Hierro",
      resumen:
        "Un soldado honesto atrapado en una orden que quema gente. Obedece, duda y sigue obedeciendo: el retrato incómodo del hombre decente con un mal empleo.",
      descripcion: [
        "Azan manda a los Caballeros de la Cadena de Hierro con la disciplina de quien cree en el orden por encima de la fe. No disfruta de las hogueras de Farnese y no sabe cómo decirlo en voz alta.",
        "Cuando la Inquisición se desmorona, se queda sin órdenes y sin causa, y aun así sigue ayudando a quien lo necesita. Su martillo y su armadura completa lo convierten en el miembro más fiable de cualquier formación."
      ],
      habilidades: [
        "Martillo de guerra y escudo",
        "Mando de caballería pesada",
        "Resistencia y disciplina",
        "Honestidad a prueba de jerarquías"
      ],
      arcos: ["condena", "halcon-milenario", "fantasia"],
      imagen: "assets/img/personajes/azan.jpg",
      alt: "Azan, caballero de armadura completa con casco y bigote",
      wiki: "https://berserk.fandom.com/wiki/Azan",
      spoiler: false
    },
    {
      id: "sonia",
      nombre: "Sonia",
      epiteto: "La Vidente de Falconia",
      faccion: ["halcon"],
      estado: "vivo",
      primera: "Manga · arco del Halcón Milenario",
      rol: "Vidente y protegida de Griffith",
      resumen:
        "Puede ver a través de los ojos de los demás y lo cuenta todo con una sonrisa. Su don es real; su devoción por Griffith también.",
      descripcion: [
        "Sonia descubre su don en una aldea que la habría quemado por bruja. Griffith la recoge, la viste y la convierte en su voz pública, y ella le corresponde con una entrega absoluta.",
        "Su habilidad le permite espiar al enemigo y anticipar movimientos, pero también la deja ver cosas que preferiría no ver. Es la cara amable de Falconia y, sin saberlo, parte de su maquinaria."
      ],
      habilidades: [
        "Visión remota",
        "Lectura de pensamientos superficiales",
        "Carisma y oratoria",
        "Movilidad en el plano astral"
      ],
      arcos: ["halcon-milenario", "fantasia"],
      imagen: "assets/img/personajes/sonia.jpg",
      alt: "Sonia, joven de cabello claro y vestido sencillo",
      wiki: "https://berserk.fandom.com/wiki/Sonia",
      spoiler: false
    },
    {
      id: "mule",
      nombre: "Mule Wolflame",
      epiteto: "El Soldado que Creyó",
      faccion: ["halcon"],
      estado: "vivo",
      primera: "Manga · arco del Halcón Milenario",
      rol: "Caballero de Falconia",
      resumen:
        "Un joven noble que se alista para defender a su país y acaba escoltando al hombre que se lo está quedando. Aprende tarde, pero aprende.",
      descripcion: [
        "Mule entra en el ejército con el ideal intacto y una lanza que apenas sabe usar. Su primer destino es la escolta de Charlotte, y esa casualidad lo coloca en el centro de una corte que no entiende.",
        "Su lealtad a Griffith choca con lo que ve con sus propios ojos, y su relación con Sonia lo obliga a elegir entre el afecto y la lucidez. Es uno de los pocos personajes que cambia de bando sin perder la decencia."
      ],
      habilidades: [
        "Lanza y combate montado",
        "Formación militar básica",
        "Lealtad y sentido del deber",
        "Capacidad de reconocer sus errores"
      ],
      arcos: ["halcon-milenario", "fantasia"],
      imagen: "assets/img/personajes/mule.jpg",
      alt: "Mule, joven soldado de Midland con armadura ligera",
      wiki: "https://berserk.fandom.com/wiki/Mule",
      spoiler: true
    }
  ];

  const arcos = [
    {
      id: "espadachin-negro",
      numero: "I",
      titulo: "El Espadachín Negro",
      meta: "Manga · tomos 1 a 3",
      imagen: "assets/img/arcos/espadachin-negro.svg",
      alt: "Emblema con dos espadas cruzadas",
      resumen:
        "Guts, ya marcado, recorre un mundo de apóstoles disfrazados de señores. Un elfo se cruza en su camino y le recuerda que sigue siendo humano.",
      detalle:
        "El arco abre la historia con un protagonista que funciona como antagonista: un hombre brutal que persigue apóstoles por venganza. La llegada de Puck introduce el contrapunto necesario y siembra las preguntas que el resto de la obra responderá años después.",
      personajes: ["guts", "puck", "griffith", "gambino"],
      spoiler: false
    },
    {
      id: "edad-dorada",
      numero: "II",
      titulo: "La Edad Dorada",
      meta: "Manga · tomos 4 a 13",
      imagen: "assets/img/arcos/edad-dorada.svg",
      alt: "Emblema con la silueta de un halcón",
      resumen:
        "El pasado de Guts: su entrada en la Banda del Halcón, el ascenso de Griffith y la guerra que convirtió a unos mercenarios en leyenda.",
      detalle:
        "La analepsis más extensa del manga construye el vínculo que sostiene toda la tragedia posterior. Griffith sueña con un reino, Casca con pertenecer, Guts con tener un lugar al que volver. La guerra contra Midland convierte el sueño en algo cercano y, por eso mismo, mucho más doloroso de perder.",
      personajes: ["guts", "griffith", "casca", "judeau", "pippin", "corkus", "rickert", "zodd", "skullknight", "void", "charlotte", "gambino", "wyald"],
      spoiler: false
    },
    {
      id: "eclipse",
      numero: "III",
      titulo: "El Eclipse",
      meta: "Manga · tomo 13",
      imagen: "assets/img/arcos/eclipse.svg",
      alt: "Emblema de un eclipse con corona de rayos",
      resumen:
        "El ritual que parte la historia en dos. Griffith entrega a sus compañeros a la Mano de Dios y nace Femto. Guts sobrevive, marcado.",
      detalle:
        "El Eclipse no es solo una masacre: es un contrato. Cada miembro de la banda es ofrecido como sacrificio a cambio de la ascensión de Griffith, y el relato obliga a mirar cada muerte sin apartar la vista. Guts y Casca salen vivos, pero con la marca que atraerá espíritus durante el resto de sus vidas.",
      personajes: ["guts", "griffith", "casca", "judeau", "pippin", "corkus", "skullknight", "void", "zodd", "slan", "ubik", "conrad"],
      spoiler: true
    },
    {
      id: "condena",
      numero: "IV",
      titulo: "La Condena",
      meta: "Manga · tomos 14 a 21",
      imagen: "assets/img/arcos/condena.svg",
      alt: "Emblema con una llama inquisitorial",
      resumen:
        "Guts vuelve con Casca, ahora incapaz de valerse por sí misma. La Inquisición, Farnese y Serpico se cruzan en su camino mientras la fe de Midland se descompone.",
      detalle:
        "El arco introduce a los nuevos compañeros y enfrenta a Guts con una pregunta incómoda: ¿puede proteger a alguien cuando su propia marca atrae a los monstruos? La ciudad de Vritannis y la figura de Mozgus convierten la religión en un mecanismo de control tan brutal como los apóstoles.",
      personajes: ["guts", "casca", "farnese", "serpico", "schierke", "isidro", "puck", "zodd", "skullknight", "griffith", "slan", "ubik", "flora", "azan"],
      spoiler: false
    },
    {
      id: "halcon-milenario",
      numero: "V",
      titulo: "El Halcón Milenario",
      meta: "Manga · tomos 22 a 35",
      imagen: "assets/img/arcos/halcon-milenario.svg",
      alt: "Emblema con un árbol y una luna creciente",
      resumen:
        "La armadura berserker, la guerra contra los apóstoles de Griffith y un viaje hacia el mar con Elfhelm como único destino posible.",
      detalle:
        "Griffith ha vuelto al mundo y construye un ejército con el que salvar a la humanidad de sus propios monstruos. Guts responde con la armadura berserker: más fuerza, menos humanidad. El precio de seguir avanzando se vuelve literal en cada combate, y el grupo aprende que la confianza también es una forma de armadura.",
      personajes: ["guts", "casca", "schierke", "farnese", "serpico", "isidro", "puck", "griffith", "zodd", "grunbeld", "skullknight", "irvine", "locus", "ganishka", "flora", "luca", "charlotte", "sonia", "mule", "azan"],
      spoiler: false
    },
    {
      id: "fantasia",
      numero: "VI",
      titulo: "La Era de la Fantasía",
      meta: "Manga · tomos 36 en adelante",
      imagen: "assets/img/arcos/fantasia.svg",
      alt: "Emblema de un acantilado bajo una luna",
      resumen:
        "El mundo de los espíritus se funde con el de los hombres. Falconia se alza como refugio y Guts sigue buscando la manera de romper la marca.",
      detalle:
        "La fusión de los planos cambia las reglas del juego: dragones, sirenas y dioses menores dejan de ser leyendas. Falconia ofrece seguridad a cambio de obediencia, y cada personaje decide qué está dispuesto a ceder. La historia queda abierta, marcada por la muerte de Kentaro Miura y continuada por su estudio.",
      personajes: ["guts", "casca", "schierke", "farnese", "serpico", "isidro", "puck", "griffith", "zodd", "grunbeld", "skullknight", "rickert", "irvine", "locus", "charlotte", "sonia", "mule", "azan"],
      spoiler: true
    }
  ];

  return { facciones, estados, personajes, arcos };
})();
