import React from 'react';
import { shallow } from 'enzyme';
import AceEditor from 'react-ace';

import Editor from '../Editor';
import PersistentDrawer from '../PersistentDrawer';
import EditorHeader from '../EditorHeader';

it('renders without crashing', () => {
  shallow(<Editor />);
});

it('renders one <PersistentDrawer /> component', () => {
  const wrapper = shallow(<Editor />).dive();
  expect(wrapper.find(PersistentDrawer)).toHaveLength(1);
});

it('renders one <EditorHeader /> component (small screen)', () => {
  const wrapper = shallow(<Editor />).dive();
  wrapper.setState({ windowWidth: 500 });
  expect(wrapper.find(EditorHeader)).toHaveLength(1);
});

it('renders one <AceEditor /> component (small screen)', () => {
  const wrapper = shallow(<Editor />).dive();
  wrapper.setState({ windowWidth: 500 });
  expect(wrapper.find(AceEditor)).toHaveLength(1);
});
