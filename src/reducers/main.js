import * as type from '../constants/index'

if (JSON.parse(window.localStorage.getItem('workPanels'))){
    var savesDrives = JSON.parse(window.localStorage.getItem('workPanels')).drives ? JSON.parse(window.localStorage.getItem('workPanels')).drives : []
}

let init = {
    drives: savesDrives,
    1:{
        activeDrive: '',
        filelist: {
            files: [],
            catalogs: [],
            path: '1',
            loader: false,
        },
    },
    2:{
        activeDrive: '',
        filelist: {
            files: [],
            catalogs: [],
            path: '2',
            loader: false,
        }
    }
};

export default function (state = init, action) {
    switch (action.type) {
        case type.NEW_DRIVES:
            return {
                ...state,
                drives: action.payload
            };
        case type.SET_ACTIVE_DRIVE:
            console.log(action)
            let tmpState = {...state}
            tmpState[action.payload.panel].activeDrive = action.payload.activeDrive;
            return {
                ...tmpState,
            };
        default:
            return state

    }
}