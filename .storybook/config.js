import { configure } from '@kadira/storybook';

function loadStories() {
  require('../app/stories/index.jsx'); // eslint-disable-line
}

configure(loadStories, module);
