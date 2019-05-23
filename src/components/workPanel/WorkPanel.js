import React, {Component} from 'react';
import './style.css'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/main'
import DriveList from '../driveList/DriveList'
import FileList from '../fileList/FileList'
import FileViewer from '../fileViewer/FileViewer'
const electron = window.require('electron');
const {exec} = electron.remote.require('child_process');



class WorkPanel extends Component {

    constructor(props){
        super();
    }

    componentDidMount(){
        this.props.reloadFiles(this.props.number)
    }

    doubleClickRow = (row, fullPath) => {
        console.log(`${fullPath}\\${row.name}`)
        if(row.type === 'dir'){
            this.props.reloadFiles(this.props.number, `${fullPath}\\${row.name}`)
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
                    <DriveList click={this.setDrive} drives={this.props.drives} number={this.props.number} activeDrive={this.props.panel[this.props.number].activeDrive}/>
                </div>
                <div className={`filesArea ${!this.props.isActive ? 'notActive' : ''}`}>
                    <FileList drive={this.props.panel[this.props.number].activeDrive}
                              number={this.props.number}
                              filelist={this.props.panel[this.props.number].fileList}
                              doubleClickRow={this.doubleClickRow}
                              updateDrive={this.setDrive}
                              isActive={this.props.isActive}
                              selectedFiles={this.props.selectedFiles}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        drives: state.main.drives,
        panel: state.main
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setActiveDrive: actions.setActiveDrive,
        reloadFiles: actions.reloadFiles,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkPanel)