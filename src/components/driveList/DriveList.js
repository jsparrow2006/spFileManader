import React, {Component} from 'react';
import {getDrivesSync} from '../../modules/Drive'
import Button from '@material-ui/core/Button';
import ReactLoading from 'react-loading';
import './style.css'


class DriveList extends Component {

    setActiveDrive(drive) {
        this.props.click(drive.DeviceId)
    }

    showDrives() {
        return (
            this.props.drives.map((drive, index) => {
                return (
                    <Button variant={drive.Caption === this.props.activeDrive ? 'contained' : 'outlined'}
                            size='small'
                            color='primary'
                            key={'drive' + index}
                            style={{margin: '3px'}}
                            onClick={() => this.setActiveDrive(drive)}>
                        {drive.Caption[0]}
                    </Button>
                );
            })
        )
    }

    render() {
        return (
            <div className='drivesWrapper'>
                {this.props.drives ? this.showDrives() : <ReactLoading type='cylon' color={'#3f51b5'}/>}
                <span
                    className='spaceBlock'>{(this.props.drives[this.props.number].FreeSpace / 1073741824).toFixed(1)}Gb / {(this.props.drives[this.props.number].Size / 1073741824).toFixed(1)}Gb</span>
                <span className='typeBlock'> ({this.props.drives[this.props.number].FileSystem})</span>

            </div>
        )

    }
}

export default DriveList;