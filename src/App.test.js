import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import { expect } from 'chai'
import Todo from './components/Todo'
import Adapter from 'enzyme-adapter-react-16';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TodoList from './components/TodoList';
import IconButton from '@material-ui/core/IconButton';
import { ListItem } from '@material-ui/core';

Enzyme.configure({
  adapter: new Adapter()
})

function mockItem(overrides) {
  return {
    text: 'New Todo',
    completed: false,
    ...overrides
  }
}

describe('<Todo />', () => {
  it('renders the text', () => {
    const item = mockItem();
    const wrapper = shallow(<Todo {...item} />);
    expect(wrapper.find(ListItemText).props().primary).to.equal(item.text);
  })

  it('renders unchecked checkbox when not completed', () => {
    const item = mockItem();
    const wrapper = shallow(<Todo {...item} />);
    expect(wrapper.find(Checkbox).props().checked).to.be.false;
  })

  it('renders checked checkbox when completed', () => {
    const item = mockItem({completed: true});
    const wrapper = shallow(<Todo {...item} />);
    expect(wrapper.find(Checkbox).props().checked).to.be.true;
  })

})

describe('<TodoList />', () => {
  it('renders the entire list of items', () => {
    const items = [mockItem({id: 0, text: 'Task 1'}), mockItem({id: 1, text: 'Task 2'}), mockItem({id: 2, text: 'Task 3'})];
    const wrapper = shallow(<TodoList todos={items}/>);
    expect(wrapper.find(Todo)).to.have.length(items.length);
  })
})