import React from 'react';
import { shallow } from 'enzyme';
// TODO: Fix tests
// import AceEditor from 'react-ace';

import Editor from '../Editor';
// TODO: Fix tests
// import Header from '../Header';

let runRequest;

beforeEach(() => {
  runRequest = jest.fn();
});

it('renders without crashing', () => {
  shallow(<Editor runRequest={runRequest} loading={false} />);
});

// TODO: Fix tests
// it('renders one <Header /> component', () => {
//   const wrapper = shallow(
//     <Editor runRequest={runRequest} loading={false} />
//   ).dive();
//   expect(wrapper.find(Header)).toHaveLength(1);
// });

// it('renders one <AceEditor /> component', () => {
//   const wrapper = shallow(
//     <Editor runRequest={runRequest} loading={false} />
//   ).dive();
//   expect(wrapper.find(AceEditor)).toHaveLength(1);
// });

// it('renders one <button /> component', () => {
//   const wrapper = shallow(
//     <Editor runRequest={runRequest} loading={false} />
//   ).dive();
//   expect(wrapper.find('button')).toHaveLength(1);
// });

// it('renders active run button while not loading', () => {
//   const wrapper = mount(<Editor runRequest={runRequest} loading={false} />);
//   expect(wrapper.find('button').instance().disabled).toEqual(false);
// });

// it('renders disabled run button while loading', () => {
//   const wrapper = mount(<Editor runRequest={runRequest} loading />);
//   expect(wrapper.find('button').instance().disabled).toEqual(true);
// });

// it('simulates click events', () => {
//   const wrapper = shallow(
//     <Editor runRequest={runRequest} loading={false} />
//   ).dive();
//   wrapper.setState({ code: '"Hello, world" |> print' });
//   wrapper.find('button').simulate('click');
//   expect(runRequest.mock.calls).toHaveLength(1);
// });
