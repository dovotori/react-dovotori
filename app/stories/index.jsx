import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Button from '../components/Button';

storiesOf('Button', module)
.addDecorator(story => (
  <div style={{}}>
    {story()}
  </div>))
  .add('without props', () => (<Button />))
  .add('with some props', () => (<Button label="Button" />),
);
