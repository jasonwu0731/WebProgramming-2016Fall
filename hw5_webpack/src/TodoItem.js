import React from 'react';

class TodoItem extends React.Component{
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

class TodoItemHeader extends React.Component{
	render(){
		return(
			<div>
				<input className='toggle-all' type='checkbox' onClick={this.props.selectAll}></input>
				<label htmlFor='toggle-all'>Marked all todos as complete</label>
			</div>
		)
	}
}

module.exports = {TodoItem, TodoItemHeader};
