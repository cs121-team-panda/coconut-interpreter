import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';
import EditorContainer from '../EditorContainer';
import OutputContainer from '../OutputContainer';

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders one <EditorContainer /> component', () => {
  const wrapper = shallow(<App />).dive();
  expect(wrapper.find(EditorContainer)).toHaveLength(1);
});

it('renders one <OutputContainer /> component', () => {
  const wrapper = shallow(<App />).dive();
  expect(wrapper.find(OutputContainer)).toHaveLength(1);
});
