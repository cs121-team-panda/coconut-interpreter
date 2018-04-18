import React from 'react';
import { shallow } from 'enzyme';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

import EditorHeader from '../EditorHeader';

let handleClick;

beforeEach(() => {
  handleClick = jest.fn();
});

it('renders without crashing', () => {
  shallow(<EditorHeader simple handleClick={handleClick} loading={false} />);
});

it('renders one <AppBar /> component', () => {
  const wrapper = shallow(
    <EditorHeader simple handleClick={handleClick} loading={false} />
  ).dive();
  expect(wrapper.find(AppBar)).toHaveLength(1);
});

it('renders one <Typography /> component', () => {
  const wrapper = shallow(
    <EditorHeader simple handleClick={handleClick} loading={false} />
  ).dive();
  expect(wrapper.find(Typography)).toHaveLength(1);
});

it('renders one <Button /> component', () => {
  const wrapper = shallow(
    <EditorHeader simple handleClick={handleClick} loading={false} />
  ).dive();
  expect(wrapper.find(Button)).toHaveLength(1);
});

it('renders zero <IconButton /> components', () => {
  const wrapper = shallow(
    <EditorHeader simple handleClick={handleClick} loading={false} />
  ).dive();
  expect(wrapper.find(IconButton)).toHaveLength(0);
});

it('renders two <IconButton /> components (!simple)', () => {
  const wrapper = shallow(
    <EditorHeader simple={false} handleClick={handleClick} loading={false} />
  ).dive();
  expect(wrapper.find(IconButton)).toHaveLength(2);
});

it('renders active run button while not loading', () => {
  const wrapper = shallow(
    <EditorHeader simple handleClick={handleClick} loading={false} />
  ).dive();
  expect(wrapper.find(Button).props().disabled).toEqual(false);
});

it('renders disabled run button while loading', () => {
  const wrapper = shallow(
    <EditorHeader simple handleClick={handleClick} loading />
  ).dive();
  expect(wrapper.find(Button).props().disabled).toEqual(true);
});

it('simulates click events', () => {
  const wrapper = shallow(
    <EditorHeader simple handleClick={handleClick} loading={false} />
  ).dive();
  wrapper.find(Button).simulate('click');
  expect(handleClick.mock.calls).toHaveLength(1);
});
