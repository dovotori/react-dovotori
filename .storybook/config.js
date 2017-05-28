import { configure } from '@kadira/storybook';

function loadStories() {
  require('../app/stories/index.jsx'); // eslint-disable-line
}

configure(loadStories, module);

// const req = require.context('../app/components', true, /\.stories\.jsx$/);

// function loadStories() {
//   req.keys().forEach(filename => req(filename));
// }

// configure(loadStories, module);
