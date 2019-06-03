import React, {Component} from 'react';

class HeaderRow extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div className='colHeader'>
                <div style={{width: this.props.size.name}}>
                    Имя
                    <span className='colResizer'/>
                </div>
                <div style={{width: this.props.size.type}}>
                    Тип
                    <span className='colResizer'/>
                </div>
                <div style={{width: this.props.size.size}}>
                    Размер
                    <span className='colResizer'/>
                </div>
                <div style={{width: this.props.size.date}}>
                    Дата
                    <span className='colResizer'/>
                </div>
            </div>
        );
    }
}

export default HeaderRow;