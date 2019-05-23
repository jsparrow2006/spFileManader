import {getDrivesSync} from '../modules/Drive';
import {getFilesSync} from '../modules/Files'
import * as type from '../constants/index'

export const watchDrives = () => {
    let newDrives = getDrivesSync();
    return (dispatch) => {
        dispatch({
            type: type.NEW_DRIVES,
            payload: newDrives
        });
    }
}

export const reloadFiles = (panel, fullPath = null) => {
    return (dispatch, getState) => {
        dispatch({
            type: type.LOADING_FILES,
            payload: {panel: panel}
        })
        let path = `${getState().main[panel].activeDrive}\\`;
        let fileList = getFilesSync(!fullPath ? path : fullPath);
        dispatch({
            type: type.NEW_FILE_LIST,
            payload: {panel: panel, fileList: fileList}
        })
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
