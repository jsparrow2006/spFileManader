import React, {Component} from 'react';
import './style.css'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/main'
import DriveList from '../driveList/DriveList'
import FileList from '../fileList/FileList'
import {getFilesSync} from '../../modules/Files'
import FileViewer from '../fileViewer/FileViewer'
const electron = window.require('electron');
const {exec} = electron.remote.require('child_process');



class WorkPanel extends Component {

    constructor(props){
        super();
        this.state = {
            drive: 'D:',
            drives: [],
            filelist: {
                files: [],
                catalogs: [],
                path: ''
            }
        }

    }

    componentDidMount(){
        this.props.reloadFiles(this.props.number)
    }

    doubleClickRow = (row, fullPath) => {
        // console.log(`${fullPath}\\${row.name}`)
        if(row.type === 'dir'){
            this.setState({filelist: {...getFilesSync(`${fullPath}\\${row.name}`)}})
        } else if (row.type === 'file'){
            exec(`"${fullPath}\\${row.name}.${row.ext}"`);
        }
    }

    setDrive = (drive) => {
        this.props.setActiveDrive(this.props.number, drive)
        this.props.reloadFiles(this.props.number)
    }

    render() {
        return (
            <div className={`panel`} onClick={() => this.props.setActive(this.props.number)}>
                {/*<FileViewer/>*/}
                <div className='diskArea'>
                    <DriveList click={this.setDrive} drives={this.props.drives} number={this.props.number} activeDrive={this.props.panel.activeDrive}/>
                </div>
                <div className={`filesArea ${!this.props.isActive ? 'notActive' : ''}`}>
                    <FileList drive={this.state.drive}
                              filelist={this.props.panel.fileList}
                              doubleClickRow={this.doubleClickRow}
                              updateDrive={this.setDrive}
                              isActive={this.props.isActive}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        drives: state.main.drives,
        panel: state.main[props.number]
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setActiveDrive: actions.setActiveDrive,
        reloadFiles: actions.reloadFiles,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkPanel)