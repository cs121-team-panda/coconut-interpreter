import React from 'react';
import { shallow } from 'enzyme';

import Header from '../Header';

it('renders without crashing', () => {
  shallow(<Header name="" color="" textColor="" />);
});

it('renders children when passed in', () => {
  const wrapper = shallow(
    <Header name="" color="" textColor="">
      <div className="child" />
    </Header>
  );
  expect(wrapper.contains(<div className="child" />)).toEqual(true);
});
