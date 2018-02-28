import React from 'react';
import { mount } from 'enzyme';

import AceEditor from 'react-ace';

import CodeEditor from '../CodeEditor';
import styles from '../CodeEditor.module.css';

let runRequest;

beforeEach(() => {
  runRequest = jest.fn();
});

it('renders without crashing', () => {
  mount(<CodeEditor runRequest={runRequest} loading={false} />);
});

it('renders one <div.editor /> component', () => {
  const wrapper = mount(<CodeEditor runRequest={runRequest} loading={false} />);
  expect(wrapper.find(`div.${styles.editor}`)).toHaveLength(1);
});

it('renders one <div.header /> component', () => {
  const wrapper = mount(<CodeEditor runRequest={runRequest} loading={false} />);
  expect(wrapper.find(`div.${styles.header}`)).toHaveLength(1);
});

it('renders one <AceEditor /> component', () => {
  const wrapper = mount(<CodeEditor runRequest={runRequest} loading={false} />);
  expect(wrapper.find(AceEditor)).toHaveLength(1);
});

it('renders one <button /> component', () => {
  const wrapper = mount(<CodeEditor runRequest={runRequest} loading={false} />);
  expect(wrapper.find('button')).toHaveLength(1);
});

it('renders active run button while not loading', () => {
  const wrapper = mount(<CodeEditor runRequest={runRequest} loading={false} />);
  expect(wrapper.find('button').instance().disabled).toEqual(false);
});

it('renders disabled run button while loading', () => {
  const wrapper = mount(<CodeEditor runRequest={runRequest} loading={true} />);
  expect(wrapper.find('button').instance().disabled).toEqual(true);
});

it('simulates click events', () => {
  const wrapper = mount(<CodeEditor runRequest={runRequest} loading={false} />);
  wrapper.find('button').simulate('click');
  expect(runRequest.mock.calls).toHaveLength(1);
});
