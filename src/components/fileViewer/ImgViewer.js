import React, {Component} from 'react';
import './style.css'


class ImgViewer extends Component {

    constructor(){
        super()
    }


    render() {
        return (
            <div className='imgViewer'>
                <img src={`file:\\\\${this.props.file}`} alt=""/>
            </div>
        );
    }
}

export default ImgViewer;