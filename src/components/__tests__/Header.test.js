import React from 'react';
import { shallow } from 'enzyme';

import Header from '../Header';
import styles from '../Header.module.css';

it('renders without crashing', () => {
  shallow(<Header name="" color="" textColor="" />);
});

it('renders one <div.header /> element', () => {
  const wrapper = shallow(<Header name="" color="" textColor="" />);
  expect(wrapper.find(`div.${styles.header}`)).toHaveLength(1);
});

it('renders children when passed in', () => {
  const wrapper = shallow(
    <Header name="" color="" textColor="">
      <div className="child" />
    </Header>
  );
  expect(wrapper.contains(<div className="child" />)).toEqual(true);
});
