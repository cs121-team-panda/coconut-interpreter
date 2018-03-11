import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import EditorContainer from '../EditorContainer';
import CodeEditor from '../../components/CodeEditor';
import environment from '../../store/environment';

const mockStore = configureStore();

let store;

beforeEach(() => {
  store = mockStore(environment.initialState);
});

it('renders without crashing', () => {
  shallow(<EditorContainer store={store} />);
});

it('renders one <CodeEditor /> component', () => {
  const wrapper = shallow(<EditorContainer store={store} />).dive();
  expect(wrapper.find(CodeEditor)).toHaveLength(1);
});
