import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import App from '../App';
import styles from '../App.module.css';
import CodeEditor from '../../components/CodeEditor';
import CodeOutput from '../../components/CodeOutput';

const initialState = fromJS({
  output: '',
  loading: false,
});

const mockStore = configureStore();

let store;

beforeEach(() => {
  store = mockStore(initialState);
});

it('renders without crashing', () => {
  shallow(<App store={store} />);
});

it('renders one <div.container /> component', () => {
  const wrapper = shallow(<App store={store} />).dive();
  expect(wrapper.find(`div.${styles.container}`)).toHaveLength(1);
});

it('renders one <CodeEditor /> component', () => {
  const wrapper = shallow(<App store={store} />).dive();
  expect(wrapper.find(CodeEditor)).toHaveLength(1);
});

it('renders one <CodeOutput /> component', () => {
  const wrapper = shallow(<App store={store} />).dive();
  expect(wrapper.find(CodeOutput)).toHaveLength(1);
});
