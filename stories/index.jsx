import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Button from '../app/components/Button';
import Link from '../app/components/Link';
import Title from '../app/components/Title';
import Card from '../app/components/Card';

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
  .add('with some props', () => (<Title>Test</Title>),
);

storiesOf('Card', module)
  .add('without props', () => (<Card />))
  .add('with some props', () => (<Card label="Card" />),
);
