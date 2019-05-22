import * as type from '../constants/index'

let init = {
    drives: [],
    1:{
        activeDrive: '',
        loader: false,
        fileList: {
            files: [],
            catalogs: [],
            path: '',
        },
    },
    2:{
        activeDrive: '',
        loader: false,
        fileList: {
            files: [],
            catalogs: [],
            path: '',
        }
    }
};

if (JSON.parse(window.localStorage.getItem('workPanels'))){
    init = JSON.parse(window.localStorage.getItem('workPanels'))
}

export default function (state = init, action) {
    let tmpState = {};
    switch (action.type) {
        case type.NEW_DRIVES:
            return {
                ...state,
                drives: action.payload
            };

        case type.SET_ACTIVE_DRIVE:
            tmpState = {...state};
            tmpState[action.payload.panel].activeDrive = action.payload.activeDrive;
            return {
                ...tmpState,
            };

        case type.NEW_FILE_LIST:
            tmpState = {...state}
            tmpState[action.payload.panel].fileList = action.payload.fileList;
            tmpState[action.payload.panel].loader = false;
            return {
                ...tmpState,
            };

        case type.LOADING_FILES:
            tmpState = {...state}
            tmpState[action.payload.panel].loader = true;
            return {
                ...tmpState,
            };
        default:
            return state

    }
}