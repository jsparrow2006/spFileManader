import React, {Component} from 'react';
import './style.css'
import FolderIcon from '../../images/folder.png'


class DirInfo extends Component {

    constructor(){
        super()
    }


    render() {
        return (
            <div className='dirInfo'>
                <img src={FolderIcon} alt=""/>
                <span>Имя папки: {this.props.folder.name}</span>
                <span>Дата изменения:  {this.props.folder.date}  {this.props.folder.time}</span>
            </div>
        );
    }
}

export default DirInfo;