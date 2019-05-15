import React, {Component} from 'react';
import IconForFile from "./IconForFile";
const electron = window.require('electron');

class FileRow extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    render() {
        return (
            <div id={'row' + this.props.index} className={this.props.isSelect ? ' selectedRow' : 'row'} onClick={() => this.props.click(this.props.index)} onDoubleClick={this.props.doubleClick}>
                <div style={{width: this.props.size.name}}>
                    <IconForFile filePath={'d:\\' + this.props.file.name + '.' + this.props.file.ext}/>
                    {this.props.file.name}
                </div>
                <div style={{width: this.props.size.type}}>{this.props.file.ext}</div>
                <div style={{width: this.props.size.size}}>{this.props.file.size}</div>
                <div style={{width: this.props.size.date}}>{this.props.file.date}</div>
            </div>
        );
    }
}

export default FileRow;