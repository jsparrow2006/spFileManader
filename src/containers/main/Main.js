import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './style/index.css';
import SplitPane from 'react-split-pane'
import WorkPanel from '../../components/workPanel/WorkPanel'


class Main extends Component {

    constructor(){
        super();
        this.state = {
            activePanel: 1
        }
    }

    componentDidMount() {

    }

    setActivePanel = (number) => {
        console.log('active ' + number)
        this.setState({activePanel: number})
    }


    render() {
        return (
            <div>
                <SplitPane split="vertical" minSize={20} defaultSize={window.innerWidth/2-20}>
                    <div>
                        <WorkPanel number={1} setActive={this.setActivePanel} isActive={this.state.activePanel === 1}/>
                    </div>
                    <div>
                        <WorkPanel number={2} setActive={this.setActivePanel} isActive={this.state.activePanel === 2}/>
                    </div>
                </SplitPane>
            </div>
        );
    }
}



function mapStateToProps(state) {
    return {
        main: state.main
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

