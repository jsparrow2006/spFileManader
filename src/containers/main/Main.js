import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './style/index.css';
import SplitPane from 'react-split-pane'
import DriveList from '../../components/driveList/DriveList'
import WorkPanel from '../../components/workPanel/WorkPanel'
import FileList from '../../components/fileList/FileList'


class Main extends Component {

    componentDidMount() {

    }


    render() {
        return (
            <div>
                <SplitPane split="vertical" minSize={450} defaultSize={window.innerWidth/2-20}>
                    <div>
                        <WorkPanel number={1}/>
                    </div>
                    <div>
                        <WorkPanel number={2}/>
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

