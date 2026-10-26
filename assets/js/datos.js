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
     spoiler       true si la ficha revela giros importantes
   ========================================================================== */

window.BERSERK = (function () {
  "use strict";

  const facciones = [
    { id: "halcon", nombre: "Banda del Halcón", clase: "halcon" },
    { id: "guts", nombre: "Compañía de Guts", clase: "guts" },
    { id: "apostoles", nombre: "Apóstoles", clase: "apostol" },
    { id: "mano", nombre: "Mano de Dios", clase: "mano" },
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
      spoiler: false
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
      personajes: ["guts", "puck", "griffith"],
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
      personajes: ["guts", "griffith", "casca", "judeau", "pippin", "corkus", "rickert", "zodd", "skullknight", "void"],
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
      personajes: ["guts", "griffith", "casca", "judeau", "pippin", "corkus", "skullknight", "void", "zodd"],
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
      personajes: ["guts", "casca", "farnese", "serpico", "schierke", "isidro", "puck", "zodd", "skullknight", "griffith"],
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
      personajes: ["guts", "casca", "schierke", "farnese", "serpico", "isidro", "puck", "griffith", "zodd", "grunbeld", "skullknight"],
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
      personajes: ["guts", "casca", "schierke", "farnese", "serpico", "isidro", "puck", "griffith", "zodd", "grunbeld", "skullknight", "rickert"],
      spoiler: true
    }
  ];

  return { facciones, estados, personajes, arcos };
})();
