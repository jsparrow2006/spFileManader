import React, {Component} from 'react';

class PathPanel extends Component {

    constructor(props){
        super(props);
        this.state = {
            editable: false
        }
    }

    componentDidMount(){

    }

    edit = (value) => {
        this.setState({editable: value})
    }

    render() {
        return (
            <div className={`pathRow`} onDoubleClick={() => this.edit(true)} contentEditable={this.state.editable}>
                <div style={{width: '70%'}}>{this.props.path}</div>
                <div style={{width: '30%'}}></div>
            </div>
        );
    }
}

export default PathPanel;