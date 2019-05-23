import React, {Component} from 'react';
const electron = window.require('electron');


class IconForFile extends Component {

    constructor(props){
        super(props);
        this.state = {
            iconUrl: 'http://www.iconarchive.com/download/i54214/double-j-design/origami/file.ico'
        }
        electron.remote.app.getFileIcon(this.props.filePath.replace(/\r|\n/g, ''), (err, icon) => {
            this.setState({iconUrl: icon.toDataURL()})
        })
    }

    componentDidMount(){

    }

    render() {
        return (
            <img src={this.state.iconUrl} alt="" style={{height: '20px'}}/>
        );
    }
}

export default IconForFile;