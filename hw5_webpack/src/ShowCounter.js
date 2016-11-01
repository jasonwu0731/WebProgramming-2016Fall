import React from 'react';

class ShowCounter extends React.Component{
	render(){
		return(
			<footer className="footer">
				<span className="todo-count">{this.props.count} item(s) left</span>
				<button className="clear-completed" onClick={this.props.clear}>Clear completed</button>
			</footer>
		)
	}
} 

module.exports = ShowCounter;