import React, {Component} from 'react';
import {getFilesSync} from '../../modules/Files'
import CatalogRow from './CatalogRow'
import FileRow from './FileRow'
import BackRow from './BackRow'
import HeaderRow from './HeaderRow'
import './style.css'

const electron = window.require('electron');


class FileList extends Component {

    constructor(props) {
        super(props);

        // this.panel = document.getElementById('panel' + this.props.number)

        this.state = {
            files: [],
            catalogs: [],
            sizeColumn: {
                name: '60%',
                type: '50px',
                size: '15%',
                date: '25%'
            },
            selectedFiles: [],
            // key: -1
        };

        this.kCtrl = false;
        this.kShift = false;

        document.addEventListener('keydown', this.setKeyStatusOn);
        document.addEventListener('keyup', this.setKeyStatusOf);
    }

    setKeyStatusOf = (e) => {
        this.kCtrl = e.ctrlKey;
        this.kShift = e.shiftKey;
    };

    setKeyStatusOn = (e) => {
        // e.preventDefault();
        this.kCtrl = e.ctrlKey;
        this.kShift = e.shiftKey;
        switch (e.keyCode) {
            case 38:
                this.keyPress('up')
                break;
            case 40:
                this.keyPress('down')
                break;
        }

    };

    keyPress = (vector) =>{
        if (vector === 'up'){
            this.setState({selectedFiles: [this.state.selectedFiles[this.state.selectedFiles.length-1] -1]})
        } else if (vector === 'down'){
            this.setState({selectedFiles: [this.state.selectedFiles[this.state.selectedFiles.length-1] +1]})
        }
    }

    componentWillUpdate(nextProps) {
        if (this.props !== nextProps) {
            this.setState({files: nextProps.filelist.files, catalogs: nextProps.filelist.catalogs})
        }
    }

    componentDidMount() {
        this.setState({...this.props.filelist})
    }

    rowIsSelect = (index) => {
        return this.state.selectedFiles.indexOf(index) !== -1
    }

    selectRow = (index) => {
        if (this.kCtrl) {
            let tmpList = this.state.selectedFiles
            tmpList.push(index)
            this.setState({selectedFiles: tmpList})
        } else if (this.kShift) {
            let tmpList = [];
            if (this.state.selectedFiles[this.state.selectedFiles.length - 1] < index) {
                for (var i = this.state.selectedFiles[this.state.selectedFiles.length - 1]; i <= index; i++) {
                    tmpList.push(i)
                }
            } else if (this.state.selectedFiles[this.state.selectedFiles.length - 1] > index) {
                for (var i = index; i <= this.state.selectedFiles[this.state.selectedFiles.length - 1]; i++) {
                    tmpList.push(i)
                }
            }
            this.setState({selectedFiles: tmpList})
        } else {
            this.setState({selectedFiles: [index]})
        }

    }


    render() {
        const data = [
            ...this.state.catalogs,
            ...this.state.files
        ];
        return (
            <div id={'panel' + this.props.number}>
                <HeaderRow size={this.state.sizeColumn}/>
                {this.props.filelist.path ? <BackRow size={this.state.sizeColumn}
                                                     isSelect={this.state.selectedFiles.length === 0}
                                                     doubleClick={() => this.props.doubleClickRow({
                                                         type: 'dir',
                                                         name: '..'
                                                     }, `${this.props.drive}${this.props.filelist.path ? '\\' : ''}${this.props.filelist.path}`)}
                /> : ''}

                {
                    data.map((file, index) => {
                        if (file.type === 'dir') {
                            return <CatalogRow key={index + file.date} index={index} catalog={file}
                                               size={this.state.sizeColumn} isSelect={this.rowIsSelect(index)}
                                               ondblclick={() => this.props.open(file)}
                                               doubleClick={() => this.props.doubleClickRow(file, `${this.props.drive}${this.props.filelist.path ? '\\' : ''}${this.props.filelist.path}`)}
                                               click={this.selectRow}/>
                        } else if (file.type === 'file') {
                            return <FileRow key={index + file.date} index={index} file={file}
                                            size={this.state.sizeColumn} isSelect={this.rowIsSelect(index)}
                                            ondblclick={() => this.props.open(file)}
                                            doubleClick={() => this.props.doubleClickRow(file, `${this.props.drive}${this.props.filelist.path ? '\\' : ''}${this.props.filelist.path}`)}
                                            click={this.selectRow}/>
                        }
                    })
                }
            </div>
        );
    }
}

export default FileList;