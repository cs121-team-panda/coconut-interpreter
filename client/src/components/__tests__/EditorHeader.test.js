import React from 'react';
import { shallow, mount } from 'enzyme';
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

it('renders run button while not loading', () => {
  const wrapper = mount(
    <EditorHeader simple handleClick={handleClick} loading={false} />
  );
  expect(wrapper.find(Button).text()).toEqual('Run');
});

it('renders stop button while loading', () => {
  const wrapper = mount(
    <EditorHeader simple handleClick={handleClick} loading />
  );
  expect(wrapper.find(Button).text()).toEqual('Stop');
});

it('simulates click events', () => {
  const wrapper = shallow(
    <EditorHeader simple handleClick={handleClick} loading={false} />
  ).dive();
  wrapper.find(Button).simulate('click');
  expect(handleClick.mock.calls).toHaveLength(1);
});
