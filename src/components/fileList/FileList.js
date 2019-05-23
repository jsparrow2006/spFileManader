import React, {Component} from 'react';
import CatalogRow from './CatalogRow'
import FileRow from './FileRow'
import BackRow from './BackRow'
import PathPanel from './PathPanel'
import HeaderRow from './HeaderRow'
import './style.css'


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
            selectedFiles: [0],
            // key: -1
        };

        this.data = [];
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
        e.preventDefault();
        this.kCtrl = e.ctrlKey;
        this.kShift = e.shiftKey;
        if (this.props.isActive) {
            switch (e.keyCode) {
                case 38:
                    // e.preventDefault();
                    this.keyPress('up')
                    break;
                case 40:
                    // e.preventDefault();
                    this.keyPress('down')
                    break;
                case 13:
                    try {
                        this.props.doubleClickRow(this.data[this.state.selectedFiles], `${this.props.drive}${this.props.filelist.path ? '\\' : ''}${this.props.filelist.path}`)
                    } catch (e) {
                    }
                    break;
                case 8:
                    try {
                        this.props.doubleClickRow({
                            type: 'dir',
                            name: '..'
                        }, `${this.props.drive}${this.props.filelist.path ? '\\' : ''}${this.props.filelist.path}`)
                    } catch (e) {
                    }
                    break;

                default:
                    break
            }
        }

    };

    keyPress = (vector) =>{
        if (this.props.isActive){
            let indexFile = [this.state.selectedFiles[this.state.selectedFiles.length-1]];
            if (vector === 'up' && indexFile > 0){
                indexFile--;
                this.selectRow(indexFile);
            } else if (vector === 'down' && indexFile < this.state.files.length + this.state.catalogs.length - 1){
                indexFile++;
                this.selectRow(indexFile);
            }
        }
    }

    componentWillUpdate(nextProps) {
        if (this.props.filelist !== nextProps.filelist) {
            this.setState({files: nextProps.filelist.files, catalogs: nextProps.filelist.catalogs, selectedFiles: [0]})
        }
    }

    componentDidMount() {
        this.setState({...this.props.filelist})
    }

    rowIsSelect = (index) => {
        return this.state.selectedFiles.indexOf(index) !== -1
    }

    selectRow = (index) => {
        // let indexNumber = parseInt(index.split('-')[1], 10);
        let indexNumber = index;
        if (this.kCtrl) {
            let tmpList = this.state.selectedFiles
            tmpList.push(indexNumber)
            this.setState({selectedFiles: tmpList})
        } else if (this.kShift) {
            let tmpList = [];
            if (this.state.selectedFiles[this.state.selectedFiles.length - 1] < indexNumber) {
                for (var i = this.state.selectedFiles[this.state.selectedFiles.length - 1]; i <= indexNumber; i++) {
                    tmpList.push(i)
                }
            } else if (this.state.selectedFiles[this.state.selectedFiles.length - 1] > indexNumber) {
                for (let i = indexNumber; i <= this.state.selectedFiles[this.state.selectedFiles.length - 1]; i++) {
                    tmpList.push(i)
                }
            }
            this.setState({selectedFiles: tmpList});
            this.props.selectedFiles(null);
        } else {
            this.setState({selectedFiles: [indexNumber]});
            this.props.selectedFiles(this.data[indexNumber], `${this.props.drive}${this.props.filelist.path ? '\\' : ''}${this.props.filelist.path}`)
        }
        let elmnt = document.getElementById('row' + index);
        elmnt.scrollIntoView({block: "end", behavior: "smooth"});

    }


    render() {
        this.data = [
            ...this.state.catalogs,
            ...this.state.files
        ];
        return (
            <div id={'panel' + this.props.number}>
                <div className='sticky'>
                    <PathPanel path={this.props.filelist.path}/>
                    <HeaderRow size={this.state.sizeColumn}/>
                </div>
                {this.props.filelist.path ? <BackRow size={this.state.sizeColumn}
                                                     isSelect={this.state.selectedFiles.length === 0}
                                                     doubleClick={() => this.props.doubleClickRow({
                                                         type: 'dir',
                                                         name: '..'
                                                     }, `${this.props.drive}${this.props.filelist.path ? '\\' : ''}${this.props.filelist.path}`)}
                /> : ''}

                {
                    this.data.map((file, index) => {
                        if (file.type === 'dir') {
                            return <CatalogRow key={index} index={index} catalog={file}
                                               size={this.state.sizeColumn} isSelect={this.rowIsSelect(index)}
                                               ondblclick={() => this.props.open(file)}
                                               doubleClick={() => this.props.doubleClickRow(file, `${this.props.drive}${this.props.filelist.path ? '\\' : ''}${this.props.filelist.path}`)}
                                               click={this.selectRow}
                            />
                        } else if (file.type === 'file') {
                            return <FileRow key={index} index={index} file={file}
                                            size={this.state.sizeColumn} isSelect={this.rowIsSelect(index)}
                                            ondblclick={() => this.props.open(file)}
                                            doubleClick={() => this.props.doubleClickRow(file, `${this.props.drive}${this.props.filelist.path ? '\\' : ''}${this.props.filelist.path}`)}
                                            click={this.selectRow}
                            />
                        }
                        return 0
                    })
                }
            </div>
        );
    }
}

export default FileList;