import React from 'react';
import { shallow, mount } from 'enzyme';

import AceEditor from 'react-ace';

import CodeOutput from '../CodeOutput';
import styles from '../CodeOutput.module.css';

it('renders without crashing', () => {
  shallow(<CodeOutput value="" />);
});

it('allows us to set props', () => {
  const wrapper = mount(<CodeOutput value="Hello, world" />);
  expect(wrapper.props().value).toEqual('Hello, world');
});

it('renders one <div.output /> component', () => {
  const wrapper = shallow(<CodeOutput value="" />);
  expect(wrapper.find(`div.${styles.output}`)).toHaveLength(1);
});

it('renders one <div.header /> component', () => {
  const wrapper = shallow(<CodeOutput value="" />);
  expect(wrapper.find(`div.${styles.header}`)).toHaveLength(1);
});

it('renders one <AceEditor /> component', () => {
  const wrapper = shallow(<CodeOutput value="" />);
  expect(wrapper.find(AceEditor)).toHaveLength(1);
});
