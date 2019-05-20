import {getDrivesSync} from '../modules/Drive';
import * as type from '../constants/index'

export const watchDrives = () => {
    return (dispatch) => {
        setInterval(() => {
            let newDrives = getDrivesSync();
            console.log(newDrives)
            dispatch({
                type: type.NEW_DRIVES,
                payload: newDrives
            });
        }, 10000)
    }
}

export const setActiveDrive = (panel, drive) => {
    return (dispatch) => {
        dispatch({
            type: type.SET_ACTIVE_DRIVE,
            payload: {panel: panel, activeDrive: drive}
        })
    }
};
