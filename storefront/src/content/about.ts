/**
 * "Despre Pakelo" content, transcribed 1:1 from dialub.ro/despre-pakelo.
 * The six eras were WordPress posts driving an Elementor loop carousel.
 */

export type Era = {
  year: string;
  title: string;
  body: string;
  image: string;
};

export const eras: Era[] = [
  {
    year: "1930",
    title: "Infiinţare",
    body: "Italo Rino Polacco a început afacerea revânzând uleiuri în magazinul familiei, pentru piața locală.",
    image: "/images/timeline/1930.png",
  },
  {
    year: "1960",
    title: "A doua generație",
    body: "Elio, Cecilia și Giuseppe Polacco continuă activitatea fondatorului cu producția de lubrifianți de înaltă performanță. Ia naștere uleiul Pakelo.",
    image: "/images/timeline/1960.png",
  },
  {
    year: "1991",
    title: "Noul Sediu",
    body: "Un nou sediu de avangardă este construit odată cu extinderea laboratorului de cercetare și dezvoltare dedicat în întregime analizei lubrifianților.",
    image: "/images/timeline/1991.jpg",
  },
  {
    year: "2013",
    title: "A treia generație",
    body: "Suprafața sediului central se dublează odată cu deschiderea unei noi fabrici. Între timp, a treia generație a familiei Polacco preia conducerea, formată din Rino, Alberto și Aldo Polacco, care au lansat compania în contexte internaționale.",
    image: "/images/timeline/2013.png",
  },
  {
    year: "2020",
    title: "Aniversarea de nouăzeci de ani!",
    body: "A treia generație conduce Compania către un obiectiv important: 90 de ani de activitate în domeniul lubrifianților. Recunoscători pentru trecut, dornici să meargă mai departe.",
    image: "/images/timeline/2020.png",
  },
  {
    year: "2023",
    title: "Extinderea Planului de Dezvoltare și Noua Direcție",
    body: "Fondul italian Alkemia intră cu o cotă mare. Alberto Polacco, președinte și director executiv din 2008, păstrează ambele funcții și rămâne la conducerea companiei. In anul 2024, Pakelo Motor Oil S.r.l. se dezvoltă și devine Pakelo Motor Oil S.p.A.",
    image: "/images/timeline/2023.png",
  },
];

export const aboutIntro = {
  eyebrow: "Excelență în Lubrifiere din 1930,",
  heading: "Fabricat 100% în Italia",
  blocks: [
    {
      lead: "Tradiție și Inovație",
      body: "Pakelo se distinge prin standarde de elită și calitatea superioară a produselor sale, fiind un producător de referință pentru uleiuri lubrifiante și vaseline încă din 1930.",
    },
    {
      lead: "Evoluția Performanței",
      body: "Dacă în trecut alegerea uleiului era simplă, astăzi lubrifierea este o știință complexă. Suntem mereu cu un pas înainte, adaptându-ne constant la:",
      /** Each bullet leads with a bolded phrase, as in the original. */
      bullets: [
        { strong: "Revoluția uleiurilor multigrad", rest: " și a amestecurilor de înaltă performanță." },
        { strong: "Inovația tehnologică", rest: " continuă a motoarelor moderne." },
        { strong: "Responsabilitatea față de mediu", rest: " și sustenabilitate." },
      ],
      after:
        "An de an, am transformat schimbarea într-o sursă de inspirație pentru a atinge perfecțiunea.",
    },
    {
      lead: "Expertiză. Pasiune. Rezultate.",
      body: "Combinăm deschiderea către idei noi cu experiența practică de decenii. Pakelo nu este doar un producător, ci un partener specializat care investește pasiune și determinare pentru a demonstra un adevăr fundamental:",
      emphasis: "nu toate uleiurile lubrifiante sunt la fel.",
    },
  ],
  image: "/images/about/pakelo-line.jpg",
};

export const tailorMade = {
  title: "Lubrifianți personalizați",
  body: "Unul dintre cele mai renumite servicii Pakelo este crearea de lubrifianți personalizati. De la formulare până la ambalare, asigurăm asistența necesară la fiecare pas de-a lungul drumului împreună cu consultanță și instruire tehnică. Reactivitatea și flexibilitatea permit găsirea celei mai bune soluții pentru o lubrifiere inovatoare și personalizată.",
  images: ["/images/about/tailor-made-1.jpeg", "/images/about/tailor-made-2.jpeg"],
};
