import { isTouchDevice } from "../utils/index";

const initialState = {
  categories: {
    0: "design",
    1: "code"
  },
  tags: {
    0: "javascript",
    1: "d3.js",
    2: "OpenCV",
    3: "processing",
    4: "openNI",
    5: "Kinect",
    6: "WebGL"
  },
  entries: [
    // {
    //   id: 0,
    //   slug: 'netmap',
    //   title: 'Net Map',
    //   category: 1,
    //   tags: [],
    //   date: 2014,
    //   description:
    //     'Datavisualisation désignant les différentes institutions "ennemies d\'Internet" à travers le monde. Projet réalisé au sein de l\'association Reporters sans frontières sous la direction artistique de Pierre-Alain Leboucher.',
    //   sources: '',
    //   context: '',
    //   images: 1,
    // },
    // {
    //   id: 1,
    //   slug: 'religionmap',
    //   title: 'Religion Map',
    //   category: 0,
    //   tags: [],
    //   date: 2014,
    //   description:
    //     'Datavisualisation désignant les pays qui utilisent la religion comme moyen de censure.',
    //   sources: '',
    //   context: '',
    // },
    {
      id: 2,
      slug: "barason",
      title: "Barason",
      category: 1,
      tags: [],
      date: 2013,
      description:
        "Transformation d'un comptoir de bar en séquenceur musicale, dont les sons sont déclenchés par les verres posés sur sa surface.",
      sources: "",
      context: "",
      images: 2
    },
    {
      id: 3,
      slug: "camouflage",
      title: "Camouflage",
      category: 0,
      tags: [],
      date: 2009,
      description:
        "Proposition pour l'identité d'une exposition fictive sur les arts de rue et le graffiti.",
      sources: "",
      context: "",
      images: 4
    },
    {
      id: 4,
      slug: "identite",
      title: "Identité",
      category: 0,
      tags: [],
      date: 2014,
      description: "Identités visuelles pour différentes marques.",
      sources: "",
      context: "",
      images: 14
    },
    // {
    //   id: 5,
    //   slug: 'electro',
    //   title: 'Electro',
    //   category: 0,
    //   tags: [],
    //   date: 2013,
    //   description: "Site de l'artiste audiovisuel Alex Augier.",
    //   sources: '',
    //   context: '',
    // },
    {
      id: 6,
      slug: "soap",
      title: "Soap",
      category: 0,
      tags: [],
      date: 2009,
      description:
        "Recherche pour l'identité d'une exposition au sein de la Soap Factory, musée d'art contemporain à Mineapolis.",
      sources: "",
      context: "",
      images: 3
    },
    {
      id: 7,
      slug: "weiwei",
      title: "Wei Wei",
      category: 0,
      tags: [],
      date: 2014,
      description:
        "Animation promotionnelle installée dans les gares parisiennes de l'album de Reporters sans frontières, 100 photos de Ai Weiwei pour la liberté de la presse.",
      sources: "",
      context: "",
      images: 2
    },
    {
      id: 8,
      slug: "presse",
      title: "Presse",
      category: 0,
      tags: [],
      date: 2014,
      description:
        "Différents projets réalisés au sein de l'association Reporters sans frontières.",
      sources: "",
      context: "",
      images: 6
    },
    {
      id: 9,
      slug: "distraction",
      title: "Distraction",
      category: 1,
      tags: [],
      date: 2013,
      description:
        "Dispositif de jeu qui a pour ambition d'intégrer n'importe quel objet du quotidien pour influencer un espace virtuel.",
      sources: "",
      context: "",
      images: 9
    },
    {
      id: 10,
      slug: "havre",
      title: "Havre",
      category: 0,
      tags: [],
      date: 2009,
      description:
        "Élaboration d'une identité visuelle pour la biennale d'art contemporain de la ville du Havre.",
      sources: "",
      context: "",
      images: 11
    },
    {
      id: 11,
      slug: "depardon",
      title: "Depardon",
      category: 0,
      tags: [],
      date: 2009,
      description:
        "Recherche graphique pour un coffret de reportages de Raymond Depardon, la série sur le monde paysan, destin fragile des travailleurs de la terre.",
      sources: "",
      context: "",
      images: 4
    }
    // {
    //   id: 12,
    //   slug: 'amour',
    //   title: 'Amour',
    //   category: 1,
    //   tags: [],
    //   date: 1,
    //   description: 'Site HappyLovers',
    //   sources: '',
    //   context: '',
    // },
  ]
};

export default initialState;
