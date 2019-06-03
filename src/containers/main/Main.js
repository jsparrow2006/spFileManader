import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {watchDrives} from '../../actions/main'
import './style/index.css';
import SplitPane from 'react-split-pane'
import WorkPanel from '../../components/workPanel/WorkPanel'
import FileViewer from '../../components/fileViewer/FileViewer'


class Main extends Component {

    constructor() {
        super();
        this.state = {
            activePanel: 1,
            openViewer: false,
            viewFile: '',
        };

        let eventKey = (e) => {
            if (e.keyCode === 81 && e.ctrlKey) {
                this.setState({openViewer: !this.state.openViewer})
            } else if (e.keyCode === 9) {
                e.preventDefault()
                this.state.activePanel === 1 ? this.setActivePanel(2) : this.setActivePanel(1)
            }
        };

        document.addEventListener('keyup', eventKey);
    }

    componentDidMount() {
        this.props.watchDrives();
        setInterval(() => {
            this.props.watchDrives();
        }, 10000)
    }

    setActivePanel = (number = null) => {
        this.setState({activePanel: number})
    }

    selectedFiles = (file, path) => {
        this.setState({viewFile: {path: path, file: file}})
        // console.log(file)
        // console.log(fileTypes.getTypeFromExt(file.ext))
    }


    render() {
        return (
            <div>
                <SplitPane split='horizontal' minSize='50%' defaultSize='85%'>
                    <div>
                        <SplitPane split='vertical' minSize='20%' defaultSize='50%'>
                            <div>
                                {this.state.activePanel !== 1 && this.state.openViewer ? <FileViewer file={this.state.viewFile}/> : null}
                                <WorkPanel number={1} setActive={this.setActivePanel}
                                           isActive={this.state.activePanel === 1}
                                           selectedFiles={this.selectedFiles}/>
                            </div>
                            <div>
                                {this.state.activePanel !== 2 && this.state.openViewer ? <FileViewer file={this.state.viewFile}/> : null}
                                <WorkPanel number={2} setActive={this.setActivePanel}
                                           style={{width: '48%'}}
                                           isActive={this.state.activePanel === 2}
                                           selectedFiles={this.selectedFiles}/>
                            </div>
                        </SplitPane>
                    </div>
                    <div>This is a div</div>
                </SplitPane>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        main: state.main
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({watchDrives: watchDrives}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

