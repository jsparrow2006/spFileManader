import React, {Component} from 'react';

class CatalogRow extends Component {

    componentDidMount(){

    }

    render() {
        return (
            <div id={'row' + this.props.index} className={this.props.isSelect ? ' selectedRow' : 'row'}  onClick={() => this.props.click(this.props.index)} onDoubleClick={this.props.doubleClick}>
                <div style={{width:  this.props.size.name}}>
                    <img src="http://demiart.ru/forum/uploads1/post-88374-1214073559.png" alt=""
                         style={{height: '18px'}}/>
                    { this.props.catalog.name}
                </div>
                <div style={{width: this.props.size.type}}>{this.props.catalog.ext}</div>
                <div style={{width: this.props.size.size}}>{this.props.catalog.size}</div>
                <div style={{width: this.props.size.date}}>{this.props.catalog.date}</div>
            </div>
        );
    }
}

export default CatalogRow;