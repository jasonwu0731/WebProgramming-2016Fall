//const { Component } = React;
const ReactDOM = require('react-dom');
const { render } = require('react-dom');
const React = require('react');

import './todo.css';
import { TodoItem, TodoItemHeader } from './TodoItem.js';
import ShowCounter from './ShowCounter.js';

class Header extends React.Component {
	render(){
		return(
			<header className='header'>
				<h1>todos</h1>
				<h2>吳建昇 Chien-Sheng Wu 2016/11/02</h2>
				<input
					className='new-todo'
					placeholder="What needs to be done?" 
					value = {this.props.value}
					onChange = {this.props.handleInput}
					onKeyDown = {this.props.handleKeyDown}>
				</input>
			</header> 
		)
	}
}

class Info extends React.Component{
	render(){
		return(
			<footer className="info">
  				<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
			</footer>
		)
	}
} 

class TodoApp extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			txt: '',
			todos: [],	
			todoCount: 0,
			completeCount: 0,
			completeList: [],
			liClassName: [],
		};

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.selectAll = this.selectAll.bind(this);
		this.updateTxt = this.updateTxt.bind(this);
		this.destroy = this.destroy.bind(this);
		this.setnewTodo = this.setnewTodo.bind(this);
		this.cleanComplete = this.cleanComplete.bind(this);

	}

	updateTxt(in_txt){
		this.setState({txt: in_txt});
	}

	handleInput(w) {
    	this.updateTxt(w.target.value);
  	}

	handleKeyDown(event){
		const keyInput = this.state.txt;
		//console.log(keyInput)
		if (event.keyCode == 13 && keyInput != ''){
			//console.log(this.state.todoCount)
      		this.setState({ todos: this.state.todos.concat([keyInput]) });
      		this.setState({ completeList: this.state.completeList.concat(['0']) });
      		this.setState({ liClassName: this.state.liClassName.concat(['']) });
      		this.setState({ todoCount: this.state.todoCount + 1 });
      		this.updateTxt('');
			//console.log(this.state.todoCount)
		}
	}

	selectAll(event){
		const select = event.target.checked;
		console.log(this.state.completeList)
		console.log(this.state.completeList.length)
		
		let count_temp = 0
		for(let i=0; i<50; i++){
			if (this.state.completeList[i] != undefined){
				count_temp = count_temp + 1;
				if (select){
					this.state.completeList[i] = '1';
					this.state.liClassName[i] = 'completed';
					count_temp = 0;
				} else {
					this.state.completeList[i] = '0';
					this.state.liClassName[i] = '';
					count_temp = count_temp;
				}
			}
		}
		this.setState({ 
			completeList: this.state.completeList,  
			liClassName: this.state.liClassName,
			todoCount: count_temp
		});
	}

	destroy(c) {
		if (this.state.completeList[c.target.id] === '1') {
			this.setState({ completeCount: this.state.completeCount - 1 });
		} else {
		  this.setState({ todoCount: this.state.todoCount - 1 });
		}
		if (c.target.id > -1) {
			delete this.state.todos[c.target.id];
			delete this.state.completeList[c.target.id];
			delete this.state.liClassName[c.target.id];
			this.setState({ 
				todos: this.state.todos, 
				completeList: this.state.completeList, 
				liClassName: this.state.liClassName 
			});
		}
  	}

	setnewTodo(c) {
		if (c.target.checked) {
			const CL = this.state.completeList;
			const liCN = this.state.liClassName;
			CL[c.target.id] = '1';
			liCN[c.target.id] = 'completed';
			this.setState({
				liClassName: liCN,
				completeList: CL,
				todoCount: this.state.todoCount - 1,
				completeCount: this.state.completeCount + 1 
			});
		} else {
			const CL = this.state.completeList;
			const liCN = this.state.liClassName;
			CL[c.target.id] = '0';
			liCN[c.target.id] = '';
			this.setState({
				liClassName: liCN,
				completeList: CL,
				todoCount: this.state.todoCount + 1,
				completeCount: this.state.completeCount - 1  
			});
		}
  	}

	cleanComplete(){
		for (let i = 0; i < this.state.completeList.length; i++) {
			if (this.state.completeList[i] === '1') {
				delete this.state.completeList[i];
				delete this.state.todos[i];
				delete this.state.liClassName[i];
			}
		}
		this.setState({ 
			completeList: this.state.completeList, 
			todos: this.state.todos, 
			liClassName: this.state.liClassName,
			completeCount: 0
		});
	}


	render() {
    return (
    	<div>
	    	<section className="todoapp">
				<Header value={this.state.txt} handleInput={this.handleInput} handleKeyDown={this.props.handleKeyDown} autofocus/>
				<section className="main">
					<TodoItemHeader selectAll={this.selectAll} />
					<ul className="todo-list" id="todolist">
					{
						this.state.todos.map( (todo, index) => <TodoItem
							key = {index}
							name={this.state.liClassName[index]}
							txt={todo}
							ident={index}
							checkedd = {this.state.completeList[index]==='1'} 
							onCheck={this.setnewTodo}
							destroy={this.destroy} /> 
						)
					}
					</ul>
				</section>
				<ShowCounter count={this.state.todoCount} clear={this.cleanComplete} />
			</section>
			<Info />
		</div>
	)
	}
}

ReactDOM.render(
	<TodoApp />,
	document.getElementById('root')
);
