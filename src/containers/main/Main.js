import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {watchDrives} from '../../actions/main'
import './style/index.css';
import SplitPane from 'react-split-pane'
import Pane from 'react-split-pane'
import WorkPanel from '../../components/workPanel/WorkPanel'
import {getDrivesSync} from "../../modules/Drive";
import * as type from "../../constants";


class Main extends Component {

    constructor() {
        super();
        this.state = {
            activePanel: 1
        }
    }

    componentDidMount() {
        this.props.watchDrives();
        setInterval(() => {
            this.props.watchDrives();
        }, 10000)
    }

    setActivePanel = (number) => {
        console.log('active ' + number)
        this.setState({activePanel: number})
    }


    render() {
        return (
            <div>
                {/*<SplitPane split="horizontal" minSize={400} defaultSize={400}>*/}
                    {/*<div>*/}
                        {/*<SplitPane split="vertical" minSize={20} defaultSize={window.innerWidth / 2 - 20}>*/}
                            {/*<div>*/}
                                {/*<WorkPanel number={1} setActive={this.setActivePanel}*/}
                                           {/*isActive={this.state.activePanel === 1}/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                                {/*<WorkPanel number={2} setActive={this.setActivePanel}*/}
                                           {/*isActive={this.state.activePanel === 2}/>*/}
                            {/*</div>*/}
                        {/*</SplitPane>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                        {/*aaa*/}
                    {/*</div>*/}
                {/*</SplitPane>*/}
                <SplitPane split='horizontal' minSize='50%' defaultSize='85%'>
                    <div>
                        <SplitPane split='vertical' minSize='20%' defaultSize='50%'>
                            <div>
                                <WorkPanel number={1} setActive={this.setActivePanel}
                                           isActive={this.state.activePanel === 1}/>
                            </div>
                            <div>
                                <WorkPanel number={2} setActive={this.setActivePanel}
                                           style={{width: '48%'}}
                                           isActive={this.state.activePanel === 2}/>
                            </div>
                        </SplitPane>
                    </div>
                    <div>This is a div</div>
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
    return bindActionCreators({watchDrives: watchDrives}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

