import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import OutputContainer from '../OutputContainer';
import CodeOutput from '../../components/CodeOutput';
import environment from '../../store/environment';

const mockStore = configureStore();

let store;

beforeEach(() => {
  store = mockStore(environment.initialState);
});

it('renders without crashing', () => {
  shallow(<OutputContainer store={store} />);
});

it('renders one <CodeEditor /> component', () => {
  const wrapper = shallow(<OutputContainer store={store} />).dive();
  expect(wrapper.find(CodeOutput)).toHaveLength(1);
});
