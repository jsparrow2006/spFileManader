import React, {Component} from 'react';

const electron = window.require('electron');

class HeaderRow extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='colHeader'>
                <div style={{width: this.props.size.name}}>
                    Имя
                    <div className='colResizer'/>
                </div>
                <div style={{width: this.props.size.type}}>
                    Тип
                    <div className='colResizer'/>
                </div>
                <div style={{width: this.props.size.size}}>
                    Размер
                    <div className='colResizer'/>
                </div>
                <div style={{width: this.props.size.date}}>
                    Дата
                    <div className='colResizer'/>
                </div>
            </div>
        );
    }
}

export default HeaderRow;