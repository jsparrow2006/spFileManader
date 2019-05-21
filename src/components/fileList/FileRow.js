import React, {Component} from 'react';
import IconForFile from "./IconForFile";
import {typeSize} from "./consts"


class FileRow extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    sizeType = (size) => {
        let type = 0;
        let sizeTmp = size;
        while (sizeTmp > 1024){
            sizeTmp = (sizeTmp/1024).toFixed(2)
            type++
        }
        return `${sizeTmp} ${typeSize[type]}`
    }

    render() {
        return (
            <div id={'row' + this.props.index} className={this.props.isSelect ? ' selectedRow' : 'row'} onClick={() => this.props.click(this.props.index)} onDoubleClick={this.props.doubleClick}>
                <div style={{width: this.props.size.name}}>
                    <IconForFile filePath={'d:\\' + this.props.file.name + '.' + this.props.file.ext}/>
                    {this.props.file.name}
                </div>
                <div style={{width: this.props.size.type}}>{this.props.file.ext}</div>
                <div style={{width: this.props.size.size}}>{this.sizeType(this.props.file.size)}</div>
                <div style={{width: this.props.size.date}}>{this.props.file.date}</div>
            </div>
        );
    }
}

export default FileRow;