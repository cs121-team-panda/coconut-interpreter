import React from 'react';
import { shallow, mount } from 'enzyme';
import AppBar from 'material-ui/AppBar';
import AceEditor from 'react-ace';

import Output from '../Output';

it('renders without crashing', () => {
  shallow(<Output loading={false} value="" python="" isError={false} />);
});

it('allows us to set props', () => {
  const wrapper = mount(
    <Output loading={false} value="Hello, world" python="" isError={false} />
  );
  expect(wrapper.props().value).toEqual('Hello, world');
});

it('renders one <AppBar /> component', () => {
  const wrapper = shallow(
    <Output loading={false} value="" python="" isError={false} />
  ).dive();
  expect(wrapper.find(AppBar)).toHaveLength(1);
});

it('renders one <AceEditor /> component', () => {
  const wrapper = shallow(
    <Output loading={false} value="" python="" isError={false} />
  ).dive();
  expect(wrapper.find(AceEditor)).toHaveLength(1);
});

it('simulates change events', () => {
  const wrapper = mount(
    shallow(<Output loading={false} value="" python="" isError={false} />).get(
      0
    )
  );
  wrapper.find('input').simulate('change', { target: { checked: true } });
  expect(wrapper.state('showPython')).toEqual(true);
});
