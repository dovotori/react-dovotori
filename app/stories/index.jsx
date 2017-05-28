import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Button from '../components/Button';
import Link from '../components/Link';
import Title from '../components/Title';
import Card from '../components/Card';

storiesOf('Button', module)
.addDecorator(story => (
  <div style={{}}>
    {story()}
  </div>))
  .add('without props', () => (<Button />))
  .add('with some props', () => (<Button label="Button" />),
);

storiesOf('Link', module)
  .add('without props', () => (<Link />))
  .add('with some props', () => (<Link label="Link" />),
);

storiesOf('Title', module)
  .add('without props', () => (<Title />))
  .add('with some props', () => (<Title label="Title" />),
);

storiesOf('Card', module)
  .add('without props', () => (<Card />))
  .add('with some props', () => (<Card label="Card" />),
);
