import React, {Component} from 'react';
import './style.css'
import DriveList from '../driveList/DriveList'
import FileList from '../fileList/FileList'
import {getFilesSync} from '../../modules/Files'
const electron = window.require('electron');
const {execSync} = electron.remote.require('child_process');



class WorkPanel extends Component {

    constructor(props){
        super();
        this.state = {
            drive: 'D:',
            path: '',
            filelist: {
                files: [],
                catalogs: []
            }
        }

    }

    componentDidMount(){
        // this.setState({filelist: {...getFilesSync(`${this.state.drive}\\`)}})
    }

    doubleClickRow = (row, fullPath) => {
        console.log(`${fullPath}${row.name}.${row.ext}`)
        if(row.type === 'dir'){
            this.setState({filelist: {...getFilesSync(`${fullPath}\\${row.name}`)}})
        } else if (row.type === 'file'){
            execSync(`${fullPath}${row.name}.${row.ext}`);
        }
    }

    setDrive = (drive) => {
        this.setState({drive: drive}, () => {
            this.setState({filelist: {...getFilesSync(`${this.state.drive}\\`)}})
        })
    }


    render() {
        return (
            <div className='panel' onClick={() => console.log('Active Panel ' + this.props.number)}>
                <div className='diskArea'>
                    <DriveList name={'driveList' + this.props.number} click={this.setDrive} doubleClickRow={this.doubleClickRow}/>
                </div>
                <div className='filesArea'>
                    <FileList drive={this.state.drive} filelist={this.state.filelist} doubleClickRow={this.doubleClickRow}/>
                </div>
            </div>
        );
    }
}

export default WorkPanel;