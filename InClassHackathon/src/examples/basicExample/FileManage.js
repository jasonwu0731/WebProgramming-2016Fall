import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class FilesManage extends Component {
	constructor(props){
		super(props);
		this.state = {
			files: 0,
			filesCount: 0,
		};
		// Bind handler
		this.onClickUpload = this.onClickUpload.bind(this);
		this.getFiles = this.getFiles.bind(this);
	}

	onClickUpload(){
		console.log('Click Upload')
	}

	getFiles(event){
		const newFile = event.target.files[0] ;
		this.setState({
			files: newFile,
			filesCount: this.state.filesCount + 1,
		});
		console.log(newFile)
	}

	render(){
		return (
			<div id="FileContainer">
				<input type="file" accept=".pdf" onChange={this.getFiles}/>
				<button onClick={this.onClickUpload}>upload</button>
			</div>
		)
	}
}

export default FilesManage
