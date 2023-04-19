import { SET_TOKEN, SET_FILE } from "../actions";

const AuthTokenInitialState = {
    authorization: null
}

const FileInitialState = {
    file: null,
    headers: null,
    lines: null,
    invalid: 0
}

const AuthReducer = (state = AuthTokenInitialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                authorization: action.payload.authorization
            }
        default:
            return state;
    }
};


const FileReducer = (state = FileInitialState, action) => {
    switch (action.type) {
        case SET_FILE:
            return {
                file: action.payload.file,
                header: action.payload.header,
                lines: action.payload.lines,
                invalid: action.payload.invalid
            }
        default:
            return state;
    }
}

export {
    FileReducer,
    AuthReducer
}