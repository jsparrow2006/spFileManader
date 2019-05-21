import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import ReactLoading from 'react-loading';
import './style.css'


class DriveList extends Component {

    setActiveDrive(drive) {
        this.props.click(drive.DeviceId)
    }

    showDrives() {
        return (
            <div className='drivesWrapper'>
                {this.props.drives.map((drive, index) => {
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
            })}
                <span
                    className='spaceBlock'>{(this.props.drives[this.props.number].FreeSpace / 1073741824).toFixed(1)}Gb / {(this.props.drives[this.props.number].Size / 1073741824).toFixed(1)}Gb</span>
                <span className='typeBlock'> ({this.props.drives[this.props.number].FileSystem})</span>
            </div>
        )
    }

    showLoader = () => {
        return(
            <div className='drivesWrapper'>
                <ReactLoading type='bubbles' color={'#3f51b5'}/>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.drives.length > 0 ? this.showDrives() : this.showLoader()}
            </div>
        )

    }
}

export default DriveList;