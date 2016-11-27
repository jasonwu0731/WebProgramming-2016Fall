import React, { Component } from 'react';

class Header extends Component {
	render(){
		return(
			<header className='header'>
				<h1>PaperNet</h1>
				<input
					className='new-todo'
					placeholder="paper name" 
					value = {this.props.Name_value}
					onChange = {this.props.handleInput_Name}>
				</input>
				<input
					className='new-todo'
					placeholder="paper author" 
					value = {this.props.Author_value}
					onChange = {this.props.handleInput_Author}>
				</input>
				<input
					className='new-todo'
					placeholder="Description" 
					value = {this.props.Descript_value}
					onChange = {this.props.handleInput_Descript}>
				</input>
				<input
					className='new-todo'
					placeholder="Parent Paper" 
					value = {this.props.Parent}
					onChange = {this.props.handleInput_Parent}>
				</input>
			</header> 
		)
	}
}

class TodoItemHeader extends Component{
	render(){
		return(
			<div>
				<input className='toggle-all' type='checkbox' onClick={this.props.selectAll}></input>
				<label htmlFor='toggle-all'>Marked all todos as complete</label>
			</div>
		)
	}
}

class TodoItem extends Component{
	render(){
		return(
			<li className={this.props.name}>
				<div className='view'>
					<input className="toggle" onChange={this.props.onCheck} 
						checked={this.props.checkedd} type="checkbox" id={this.props.ident}></input>
					<label>{this.props.txt}</label>
					<button className="destroy" id={this.props.ident} onClick={this.props.destroy}></button>
				</div>
			</li>
		)
	}
}

class ShowcOunter extends Component{
	render(){
		return(
			<footer className="footer">
				<span className="todo-count">{this.props.count} item(s) left</span>
				<button className="clear-completed" onClick={this.props.clear}>Completed</button>
			</footer>
		)
	}
} 

class Info extends Component{
	render(){
		return(
			<footer className="info">
  				<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
			</footer>
		)
	}
} 


function ShowList(ob_array){
  const list = [];
  for (let i=0 ; i<ob_array.length ; i++ ){
    list.push( <li key={i}>Name: {ob_array[i].name}, authors: {ob_array[i].author}, 
    	Description: {ob_array[i].description}, Parent: {ob_array[i].parents}</li> );
  }
  return list;
}


class TodoApp extends Component {

	constructor(props){
		super(props);

		this.state = {
			Name_txt: '',
			Author_txt: '',
			Descript_txt: '',
			Parent: '',
			todos: [],	
			todoCount: 0,
			completeCount: 0,
			completeList: [],
			liClassName: [],
		};

		//this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleInput_Name = this.handleInput_Name.bind(this);
		this.handleInput_Author = this.handleInput_Author.bind(this);
		this.handleInput_Descript = this.handleInput_Descript.bind(this);
		this.handleInput_Parent = this.handleInput_Parent.bind(this);
		//this.selectAll = this.selectAll.bind(this);
		this.updateTxt = this.updateTxt.bind(this);
		this.destroy = this.destroy.bind(this);
		this.setnewTodo = this.setnewTodo.bind(this);
		this.cleanComplete = this.cleanComplete.bind(this);

	}

	updateTxt(in_txt, which){
		if(which === 1)
			this.setState({Name_txt: in_txt});
		else if (which === 2)
			this.setState({Author_txt: in_txt});
		else if (which === 3)
			this.setState({Descript_txt: in_txt});
		else if (which === 4)
			this.setState({Parent: in_txt});
	}

	handleInput_Name(w) {
    	this.updateTxt(w.target.value, 1);
  	}
  	handleInput_Author(w) {
    	this.updateTxt(w.target.value, 2);
  	}
  	handleInput_Descript(w) {
    	this.updateTxt(w.target.value, 3);
  	}
  	handleInput_Parent(w) {
    	this.updateTxt(w.target.value, 4);
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

		const keyInput = {
			name: this.state.Name_txt, 
			author: this.state.Author_txt, 
			description: this.state.Descript_txt,
			parents: this.state.Parent
			};
		console.log(keyInput)
		console.log(this.state.todos)
		//console.log(keyInput)
		//if (event.keyCode == 13 && keyInput != ''){
			//console.log(this.state.todoCount)

      		this.setState({ todos: this.state.todos.concat([keyInput]) });
      		//this.setState({ completeList: this.state.completeList.concat(['0']) });
      		//this.setState({ liClassName: this.state.liClassName.concat(['']) });
      		this.setState({ todoCount: this.state.todoCount + 1 });
      		this.setState({ Name_txt: '' });
      		this.setState({ Author_txt: '' });
      		this.setState({ Descript_txt: '' });
      		this.setState({ Parent: '' });
      		this.updateTxt('',1);
      		this.updateTxt('',2);
      		this.updateTxt('',3);
      		this.updateTxt('',4);
	}


	render() {
    return (
    	<div>
	    	<section className="todoapp">
				<Header Name_value={this.state.Name_txt} Author_value={this.state.Author_txt} 
				Descript_value={this.state.Descript_txt} Parent={this.state.Parent}
				handleInput_Name={this.handleInput_Name} 
				handleInput_Author={this.handleInput_Author} 
				handleInput_Descript={this.handleInput_Descript}
				handleInput_Parent={this.handleInput_Parent}
				autofocus/>
				<ul>{ShowList(this.state.todos)}</ul>
				<ShowcOunter count={this.state.todoCount} clear={this.cleanComplete} />
			</section>
		</div>
	)
	}
}module.exports = TodoApp;