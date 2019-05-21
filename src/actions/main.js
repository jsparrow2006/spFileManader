import {getDrivesSync} from '../modules/Drive';
import {getFilesSync} from '../modules/Files'
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

export const reloadFiles = (panel) => {
    return (dispatch, getState) => {
        console.log(getState().main[panel])
        let fullPath = `${getState().main[panel].activeDrive}\\${getState().main[panel].fileList.path}`;
        console.log(fullPath)
        let fileList = getFilesSync(fullPath);
        console.log(fileList)
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
