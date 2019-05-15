import React, {Component} from 'react';
import './style.css'
import DriveList from '../driveList/DriveList'
import FileList from '../fileList/FileList'
import {getFilesSync} from '../../modules/Files'
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
        this.setState({drive: drive}, () => {
            this.setState({filelist: {...getFilesSync(`${this.state.drive}\\`)}})
        })
    }

    updateDrive = (drives) => {
        console.log(drives)
        this.setState({drives: drives})
        this.setState({filelist: {...getFilesSync(`${this.state.drive}\\`)}})
    }

    render() {
        return (
            <div className={`panel`} onClick={() => this.props.setActive(this.props.number)}>
                <div className='diskArea'>
                    <DriveList name={'driveList' + this.props.number} click={this.setDrive} updateDrive={this.updateDrive}/>
                </div>
                <div className={`filesArea ${!this.props.isActive ? 'notActive' : ''}`}>
                    <FileList drive={this.state.drive}
                              filelist={this.state.filelist}
                              doubleClickRow={this.doubleClickRow}
                              updateDrive={this.setDrive}
                              isActive={this.props.isActive}
                    />
                </div>
            </div>
        );
    }
}

export default WorkPanel;