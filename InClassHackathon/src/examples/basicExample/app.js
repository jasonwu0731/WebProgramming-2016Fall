import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SortableTree, { toggleExpandedForAll } from '../../index';
import styles from './stylesheets/app.scss';
import '../shared/favicon/apple-touch-icon.png';
import '../shared/favicon/favicon-16x16.png';
import '../shared/favicon/favicon-32x32.png';
import '../shared/favicon/favicon.ico';
import '../shared/favicon/safari-pinned-tab.svg';
import FileManage from './FileManage';

const maxDepth = 10;

class PaperInput extends Component {
    render(){
        return(
            <header className='header'>
                <input
                    className={styles['new-todo']}
                    placeholder="paper name"
                    value = {this.props.paperName}
                    onChange = {this.props.handleName}>
                </input>
                <input
                    className={styles['new-todo']}
                    placeholder="paper author(s)" 
                    value = {this.props.paperAuthor}
                    onChange = {this.props.handleAuthor}>
                </input>
                <input
                    className={styles['new-todo']}
                    placeholder="paper note (optional)" 
                    value = {this.props.paperNote}
                    onChange = {this.props.handleNote}>
                </input>
                <input
                    className={styles['new-todo']}
                    placeholder="paper link (optional)" 
                    value = {this.props.paperLink}
                    onChange = {this.props.handleLink}>
                </input>
                <button onClick={this.props.handleInput}>Add</button>
            </header> 
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);

        const renderDepthTitle = ({ path }) => `Depth: ${path.length}`;

        this.state = {
            namePaper: '', 
            author: '', 
            note: '', 
            link: '', 
            searchString: '',
            searchFocusIndex: 0,
            searchFoundCount: null,
            treeData: [],
        };

        this.updateTreeData = this.updateTreeData.bind(this);
        this.expandAll = this.expandAll.bind(this);
        this.collapseAll = this.collapseAll.bind(this);
        // CSWU
        this.handleInput = this.handleInput.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleAuthor = this.handleAuthor.bind(this);
        this.handleNote = this.handleNote.bind(this);
        this.handleLink = this.handleLink.bind(this);
        this.updateTxt = this.updateTxt.bind(this);
    }
 
    updateTreeData(treeData) {
        this.setState({ treeData });
    }

    expand(expanded) {
        this.setState({
            treeData: toggleExpandedForAll({
                treeData: this.state.treeData,
                expanded,
            }),
        });
    }

    expandAll() {
        this.expand(true);
    }

    collapseAll() {
        this.expand(false);
    }

    handleInput(){
        var dataCurrent =  {
            title: this.state.namePaper, subtitle: this.state.author, 
            expanded: true, note: this.state.note, link: this.state.link,
        };
        //console.log(dataCurrent)
        if (this.state.namePaper != '' && this.state.author != ''){
            this.setState({ treeData:  this.state.treeData.concat(dataCurrent) });
            this.setState({ namePaper: '' });
            this.setState({ author: '' });
            this.setState({ note: '' });
            this.setState({ link: '' });
        }
        else {
            if(this.state.namePaper == '' && this.state.author == '')
                alert('Paper name and author(s) cannot be empty!');
            else if (this.state.namePaper == '' )
                alert('Paper name cannot be empty!');
            else
                alert('Paper author(s) cannot be empty!');
        }
    }

    updateTxt(in_txt, which){
        if(which === 1)
            this.setState({namePaper: in_txt});
        else if (which === 2)
            this.setState({author: in_txt});
        else if (which === 3)
            this.setState({note: in_txt});
        else if (which === 4)
            this.setState({link: in_txt});
    }

    handleName(w) {
        this.updateTxt(w.target.value, 1);
    }
    handleAuthor(w) {
        this.updateTxt(w.target.value, 2);
    }
    handleNote(w) {
        this.updateTxt(w.target.value, 3);
    }

    handleLink(w) {
        this.updateTxt(w.target.value, 4);
    }

    render() {
        const projectName = 'PaperNet';
        const authorName = 'Chien-Sheng Wu';
        const authorUrl = 'https://github.com/fritz-c';
        const githubUrl = 'https://github.com/jasonwu0731/WebProgramming-2016Fall/tree/master/InClassHackathon';

        const {
            treeData,
            searchString,
            searchFocusIndex,
            searchFoundCount,
        } = this.state;

        const alertNodeInfo = ({
            node,
            path,
            treeIndex,
            lowerSiblingCounts: _lowerSiblingCounts,
        }) => {
            
            const objectString = Object.keys(node)
                .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
                .join(`,\n   `);

            console.log(node)

            alert( // eslint-disable-line no-alert
                //`Info passed to the button generator:\n\n` +
                //`node: {\n   ${objectString}\n},\n` +
                //`path: [${path.join(', ')}],\n` +
                //`treeIndex: ${treeIndex}, \n` +
                `Note: ${node.note}`
            );
        };

        var linkPaper = ({
            node,
            path,
            treeIndex,
            lowerSiblingCounts: _lowerSiblingCounts,
        }) => {
            let url='';
            //console.log('url'+node.ink)
            if (node.link == '')
                url = 'http://www.google.com.tw'
            else if (node.link[0] != 'h')
                url = 'http://'+node.link
            else
                url = node.link

            open(url);
        };

        const selectPrevMatch = () => this.setState({
            searchFocusIndex: searchFocusIndex !== null ?
                ((searchFoundCount + searchFocusIndex - 1) % searchFoundCount) :
                searchFoundCount - 1,
        });

        const selectNextMatch = () => this.setState({
            searchFocusIndex: searchFocusIndex !== null ?
                ((searchFocusIndex + 1) % searchFoundCount) :
                0,
        });

        return (
            <div>
                
                <section className={styles['page-header']}>
                    <h1 className={styles['project-name']}>{projectName}</h1>

                    <h2 className={styles['project-tagline']}>
                        Drag-and-drop to organize your research works
                    </h2>

                </section>

                <PaperInput  handleInput={this.handleInput} 
                    paperName={this.state.namePaper} 
                    paperAuthor={this.state.author} 
                    paperNote={this.state.note} 
                    paperLink={this.state.link}
                    handleName={this.handleName} 
                    handleAuthor={this.handleAuthor} 
                    handleNote={this.handleNote}
                    handleLink={this.handleLink}/>

                <section className={styles['main-content']}>
                    <button onClick={this.expandAll}>
                        Expand All
                    </button>

                    <button onClick={this.collapseAll}>
                        Collapse All
                    </button>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <form
                        style={{ display: 'inline-block' }}
                        onSubmit={(event) => {
                            event.preventDefault();
                        }}
                    >
                        <label htmlFor="find-box">
                            Search:&nbsp;

                            <input
                                id="find-box"
                                type="text"
                                value={searchString}
                                onChange={event => this.setState({ searchString: event.target.value })}
                            />
                        </label>

                        <button
                            type="button"
                            disabled={!searchFoundCount}
                            onClick={selectPrevMatch}
                        >
                            &lt;
                        </button>

                        <button
                            type="submit"
                            disabled={!searchFoundCount}
                            onClick={selectNextMatch}
                        >
                            &gt;
                        </button>

                        <span>
                            &nbsp;
                            {searchFoundCount > 0 ? (searchFocusIndex + 1) : 0}
                            &nbsp;/&nbsp;
                            {searchFoundCount || 0}
                        </span>
                    </form>

                    <div style={{ height: 450 }}>
                        <SortableTree
                            treeData={treeData}
                            onChange={this.updateTreeData}
                            maxDepth={maxDepth}
                            searchQuery={searchString}
                            searchFocusOffset={searchFocusIndex}
                            searchFinishCallback={matches =>
                                this.setState({
                                    searchFoundCount: matches.length,
                                    searchFocusIndex: matches.length > 0 ? searchFocusIndex % matches.length : 0,
                                })
                            }
                            generateNodeProps={rowInfo => ({
                                buttons: [
                                    <button
                                        style={{
                                            verticalAlign: 'middle',
                                        }}
                                        onClick={() => alertNodeInfo(rowInfo)}
                                    >
                                        ℹ
                                    </button>,
                                    <button onClick={() => linkPaper(rowInfo)}>
                                    link
                                    </button>
                                ],
                            })} />
                    </div>

                    <a href={githubUrl}>Documentation on Github</a>

                    <footer className={styles['site-footer']}>
                        <span className={styles['site-footer-owner']}>
                            <a href={githubUrl}>{projectName}</a> is maintained by <a href={authorUrl}>{authorName}</a>.
                        </span>

                        <span className={styles['site-footer-credits']}>
                            This page was generated by <a href="https://pages.github.com">GitHub Pages</a> using the <a href="https://github.com/jasonlong/cayman-theme">Cayman theme</a> by <a href="https://twitter.com/jasonlong">Jason Long</a>.
                        </span>
                    </footer>
                </section>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
