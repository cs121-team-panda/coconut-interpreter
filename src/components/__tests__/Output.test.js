import React from 'react';
import { shallow, mount } from 'enzyme';
import AceEditor from 'react-ace';

import Output from '../Output';
import styles from '../Output.module.css';
import Header from '../Header';

it('renders without crashing', () => {
  shallow(<Output value="" />);
});

it('allows us to set props', () => {
  const wrapper = mount(<Output value="Hello, world" loading={false} />);
  expect(wrapper.props().value).toEqual('Hello, world');
});

it('renders one <div.output /> element', () => {
  const wrapper = shallow(<Output value="" loading={false} />);
  expect(wrapper.find(`div.${styles.output}`)).toHaveLength(1);
});

it('renders one <label.headerSwitch /> element', () => {
  const wrapper = shallow(<Output value="" loading={false} />);
  expect(wrapper.find(`label.${styles.headerSwitch}`)).toHaveLength(1);
});

it('renders one <Header /> component', () => {
  const wrapper = shallow(<Output value="" loading={false} />);
  expect(wrapper.find(Header)).toHaveLength(1);
});

it('renders one <AceEditor /> component', () => {
  const wrapper = shallow(<Output value="" loading={false} />);
  expect(wrapper.find(AceEditor)).toHaveLength(1);
});

it('simulates change events', () => {
  const wrapper = mount(<Output value="" loading={false} />);
  wrapper.find('input').simulate('change', { target: { checked: true } });
  expect(wrapper.state('showPython')).toEqual(true);
});
