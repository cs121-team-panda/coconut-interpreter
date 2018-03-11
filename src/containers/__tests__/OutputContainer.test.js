import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import OutputContainer from '../OutputContainer';
import Output from '../../components/Output';
import environment from '../../store/environment';

const mockStore = configureStore();

let store;

beforeEach(() => {
  store = mockStore(environment.initialState);
});

it('renders without crashing', () => {
  shallow(<OutputContainer store={store} />);
});

it('renders one <Editor /> component', () => {
  const wrapper = shallow(<OutputContainer store={store} />).dive();
  expect(wrapper.find(Output)).toHaveLength(1);
});
