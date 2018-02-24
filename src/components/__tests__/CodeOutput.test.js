import React from 'react';
import { mount } from 'enzyme';

import AceEditor from 'react-ace';

import CodeOutput from '../CodeOutput';
import styles from '../CodeOutput.module.css';

it('renders without crashing', () => {
  mount(<CodeOutput runRequest={jest.fn()} loading={false} />);
});

it('renders one <div.output /> component', () => {
  const wrapper = mount(<CodeOutput runRequest={jest.fn()} loading={false} />);
  expect(wrapper.find(`div.${styles.output}`)).toHaveLength(1);
});

it('renders one <div.header /> component', () => {
  const wrapper = mount(<CodeOutput runRequest={jest.fn()} loading={false} />);
  expect(wrapper.find(`div.${styles.header}`)).toHaveLength(1);
});

it('renders one <AceEditor /> component', () => {
  const wrapper = mount(<CodeOutput runRequest={jest.fn()} loading={false} />);
  expect(wrapper.find(AceEditor)).toHaveLength(1);
});
