import React, {Component} from 'react';
import {getDrivesSync} from '../../modules/Drive'
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import './style.css'


class DriveList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drives: window.localStorage.getItem(this.props.name) ? JSON.parse(window.localStorage.getItem(this.props.name)) : [],
            activeDrive: {
                Caption: 'C:'
            }
        }

        setInterval(() => {
            let newDrives = getDrivesSync();
            this.setState({drives: newDrives});
            window.localStorage.setItem(this.props.name, JSON.stringify(newDrives));
            // this.props.updateDrive(newDrives);
        }, 10000)

    }

    setActiveDrive(drive) {
        this.setState({activeDrive: drive})
        this.props.click(drive.DeviceId)
    }

    showDrives() {
        return (
            this.state.drives.map((drive, index) => {
                return (
                    <Button variant={drive.Caption === this.state.activeDrive.Caption ? 'contained' : 'outlined'}
                            size='small'
                            color='primary'
                            key={'drive' + index}
                            style={{margin: '3px'}}
                            onClick={() => this.setActiveDrive(drive)}>
                        {drive.Caption}
                    </Button>
                );
            })
        )
    }


    render() {
        return (
            <div className='drivesWrapper'>
                {this.state.drives ? this.showDrives() : ''}
                <span
                    className='spaceBlock'>{(this.state.activeDrive.FreeSpace / 1073741824).toFixed(1)}Gb / {(this.state.activeDrive.Size / 1073741824).toFixed(1)}Gb</span>
                <span className='typeBlock'> ({this.state.activeDrive.FileSystem})</span>
                <LinearProgress/>
            </div>
        )

    }
}

export default DriveList;