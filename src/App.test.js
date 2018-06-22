import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai'
import Todo from './components/Todo'
import TodoList from './components/TodoList';
import { AddTodo } from './containers/AddTodo'
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers/index'
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './redux/consts/actions'

Enzyme.configure({
  adapter: new Adapter()
})

function mockItem(overrides) {
  return {
    id: 0,
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

  it('renders checkbox on click when not completed', () => {
    const item = mockItem();
    const initialState = {todos: [item]};
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    const wrapper = shallow(<Todo onClick={() => store.dispatch({type: TOGGLE_TODO, id: item.id})} {...store.getState().todos[0]} />);        
    expect(wrapper.find(Checkbox).props().checked).to.be.false;
    wrapper.find(Checkbox).simulate('click', 1);
    wrapper.setProps({...store.getState().todos[0]});
    expect(wrapper.find(Checkbox).props().checked).to.be.true;
  })

  it ('renders checkbox on click when completed', () => {
    const item = mockItem({completed: true});
    const initialState = {todos: [item]};
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    const wrapper = shallow(<Todo onClick={() => store.dispatch({type: TOGGLE_TODO, id: item.id})} {...store.getState().todos[0]} />);        
    expect(wrapper.find(Checkbox).props().checked).to.be.true;
    wrapper.find(Checkbox).simulate('click', 1);
    wrapper.setProps({...store.getState().todos[0]});
    expect(wrapper.find(Checkbox).props().checked).to.be.false;
  })
})

describe('<TodoList />', () => {
  it('renders the entire list of items', () => {
    const items = [mockItem({id: 0, text: 'Task 1'}), mockItem({id: 1, text: 'Task 2'}), mockItem({id: 2, text: 'Task 3'})];
    const wrapper = shallow(<TodoList todos={items}/>);
    expect(wrapper.find(Todo)).to.have.length(items.length);
  })

  it('delete the item onClickDelete', () => {
    const items = [mockItem({id: 0, text: 'Task 1'}), mockItem({id: 1, text: 'Task 2'}), mockItem({id: 2, text: 'Task 3'})];
    const initialState = {todos: [...items]};
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    const wrapper = shallow(<TodoList deleteTodo={id => store.dispatch({type: DELETE_TODO, id})} todos={store.getState().todos} />);      
    expect(wrapper.find(Todo)).to.have.length(items.length);
    wrapper.find(Todo).first().dive().find(IconButton).simulate('click');
    wrapper.setProps({...store.getState()});
    expect(wrapper.find(Todo)).to.have.length(items.length - 1);
  })
})

describe('<AddTodo />', () => {
  it('shoud call addNewTodo if text is not empty', () => {
    const initialState = {todos: []};
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    const wrapper = mount(<AddTodo addNewTodo={text => store.dispatch({type: ADD_TODO, id: 0, text})} />);
    wrapper.find('form').simulate('submit');
    expect(store.getState().todos).to.have.length(0);
    wrapper.find('input').simulate('change', {target: {value: 'New Todo'}})
    wrapper.find('form').simulate('submit');      
    expect(store.getState().todos).to.have.length(1);   
  })
})