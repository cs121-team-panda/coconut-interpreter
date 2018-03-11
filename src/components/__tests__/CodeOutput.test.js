import React from 'react';
import { shallow, mount } from 'enzyme';

import AceEditor from 'react-ace';

import CodeOutput from '../CodeOutput';

it('renders without crashing', () => {
  shallow(<CodeOutput value="" />);
});

it('allows us to set props', () => {
  const wrapper = mount(<CodeOutput value="Hello, world" />);
  expect(wrapper.props().value).toEqual('Hello, world');
});

it('renders two <div /> components: output, header', () => {
  const wrapper = shallow(<CodeOutput value="" />);
  expect(wrapper.find('div')).toHaveLength(2);
});

it('renders one <AceEditor /> component', () => {
  const wrapper = shallow(<CodeOutput value="" />);
  expect(wrapper.find(AceEditor)).toHaveLength(1);
});
