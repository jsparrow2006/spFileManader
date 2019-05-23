import React, {Component} from 'react';

class BackRow extends Component {

    componentDidMount(){

    }

    render() {
        return (
            <div className='row backRow' onDoubleClick={this.props.doubleClick}>
                <div style={{width:  this.props.size.name}}>...</div>
                <div style={{width: this.props.size.type}}></div>
                <div style={{width: this.props.size.size}}></div>
                <div style={{width: this.props.size.date}}></div>
            </div>
        );
    }
}

export default BackRow;