const initialState = {
  categories: {
    0: 'design',
    1: 'code',
  },
  tags: {
    0: 'javascript',
    1: 'd3.js',
    2: 'OpenCV',
    3: 'processing',
    4: 'openNI',
    5: 'Kinect',
    6: 'WebGL',
  },
  entries: [
    {
      id: 0,
      slug: 'net-map',
      title: 'Net Map',
      category: 1,
      tags: [],
      date: 1,
      description: 'Datavisualisation désignant les différentes institutions "ennemies d\'Internet" à travers le monde. Projet réalisé au sein de l\'association Reporters sans frontières sous la direction artistique de Pierre-Alain Leboucher.',
    },
    {
      id: 1,
      slug: 'religion-map',
      title: 'Religion Map',
      category: 0,
      tags: [],
      date: 1,
      description: 'Datavisualisation désignant les pays qui utilisent la religion comme moyen de censure. Projet réalisé au sein de l\'association Reporters sans frontières sous la direction artistique de Pierre-Alain Leboucher. Source : - Pew Research, Religion and Public Life Project, 21 novembre 2012 - Zeev Maoz and Errol A. Henderson. “The World Religion Dataset, 1945-2010: Logic, Estimates, and trends.” International Interactions, 39(3).',
    },
    {
      id: 2,
      slug: '',
      title: '',
      category: 0,
      tags: [],
      date: 1,
      description: '',
    },
  ],
};

export default initialState;
