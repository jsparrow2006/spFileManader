import React, {Component} from 'react';
import './style.css'
import * as fileTypes from '../../modules/fileTypes'
import ImgViewer from './ImgViewer'
import DirInfo from './DirInfo'


class FileViewer extends Component {

    constructor(){
        super()
    }

    renderViwerFromType = () => {
        if (this.props.file.file.type === 'dir'){
            return <DirInfo folder={this.props.file.file}/>
        } else {
            switch (fileTypes.getTypeFromExt(this.props.file.file.ext).type) {
                case fileTypes.IMAGE:
                    return <ImgViewer file={`${this.props.file.path}\\${this.props.file.file.name}.${this.props.file.file.ext}`}/>
                        ;
                case null:
                    return <h1>неизвестный формат</h1>
                        ;
            }
        }
    }

    render() {
        return (
            <div className='fileViewer'>
                {this.renderViwerFromType()}
            </div>
        );
    }
}

export default FileViewer;