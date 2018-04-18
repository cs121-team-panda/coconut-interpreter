import React from 'react';
import { shallow } from 'enzyme';
import AceEditor from 'react-ace';

import PersistentDrawer from '../PersistentDrawer';
import EditorHeader from '../EditorHeader';

let handleClick;

beforeEach(() => {
  handleClick = jest.fn();
});

it('renders without crashing', () => {
  shallow(
    <PersistentDrawer
      aceEditor={<AceEditor />}
      handleClick={handleClick}
      loading={false}
    />
  );
});

it('renders one <EditorHeader /> component', () => {
  const wrapper = shallow(
    <PersistentDrawer
      aceEditor={<AceEditor />}
      handleClick={handleClick}
      loading={false}
    />
  ).dive();
  expect(wrapper.find(EditorHeader)).toHaveLength(1);
});

it('renders one <AceEditor /> component', () => {
  const wrapper = shallow(
    <PersistentDrawer
      aceEditor={<AceEditor />}
      handleClick={handleClick}
      loading={false}
    />
  ).dive();
  expect(wrapper.find(AceEditor)).toHaveLength(1);
});
