import React from 'react';
import { shallow, mount } from 'enzyme';

import AceEditor from 'react-ace';

import Output from '../Output';

it('renders without crashing', () => {
  shallow(<Output value="" />);
});

it('allows us to set props', () => {
  const wrapper = mount(<Output value="Hello, world" />);
  expect(wrapper.props().value).toEqual('Hello, world');
});

it('renders two <div /> components: output, header', () => {
  const wrapper = shallow(<Output value="" />);
  expect(wrapper.find('div')).toHaveLength(2);
});

it('renders one <AceEditor /> component', () => {
  const wrapper = shallow(<Output value="" />);
  expect(wrapper.find(AceEditor)).toHaveLength(1);
});
