import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';
import styles from '../App.module.css';
import EditorContainer from '../EditorContainer';
import OutputContainer from '../OutputContainer';

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders one <div.container /> element', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(`.${styles.container}`)).toHaveLength(1);
});

it('renders one <EditorContainer /> component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(EditorContainer)).toHaveLength(1);
});

it('renders one <OutputContainer /> component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(OutputContainer)).toHaveLength(1);
});
