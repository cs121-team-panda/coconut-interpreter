import React from 'react';
import { shallow, mount } from 'enzyme';

import AceEditor from 'react-ace';

import Editor from '../Editor';

let runRequest;

beforeEach(() => {
  runRequest = jest.fn();
});

it('renders without crashing', () => {
  shallow(<Editor runRequest={runRequest} loading={false} />);
});

it('renders two <div /> components: editor, header', () => {
  const wrapper = shallow(<Editor runRequest={runRequest} loading={false} />);
  expect(wrapper.find('div')).toHaveLength(2);
});

it('renders one <AceEditor /> component', () => {
  const wrapper = shallow(<Editor runRequest={runRequest} loading={false} />);
  expect(wrapper.find(AceEditor)).toHaveLength(1);
});

it('renders one <button /> component', () => {
  const wrapper = shallow(<Editor runRequest={runRequest} loading={false} />);
  expect(wrapper.find('button')).toHaveLength(1);
});

it('renders active run button while not loading', () => {
  const wrapper = mount(<Editor runRequest={runRequest} loading={false} />);
  expect(wrapper.find('button').instance().disabled).toEqual(false);
});

it('renders disabled run button while loading', () => {
  const wrapper = mount(<Editor runRequest={runRequest} loading />);
  expect(wrapper.find('button').instance().disabled).toEqual(true);
});

it('simulates click events', () => {
  const wrapper = mount(<Editor runRequest={runRequest} loading={false} />);
  wrapper.setState({ code: '"Hello, world" |> print' });
  wrapper.find('button').simulate('click');
  expect(runRequest.mock.calls).toHaveLength(1);
});
