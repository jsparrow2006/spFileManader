import React, {Component} from 'react';
const electron = window.require('electron');

class HeaderRow extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    render() {
        return (
            <div className='colHeader'>
                <div style={{width: this.props.size.name}}>Имя</div>
                <div style={{width: this.props.size.type}}>Тип</div>
                <div style={{width: this.props.size.size}}>Размер</div>
                <div style={{width: this.props.size.date}}>Дата</div>
            </div>
        );
    }
}

export default HeaderRow;