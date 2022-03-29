import { GET_LIST_USER, SET_SIGN_IN_USER } from "../constants/UserConst"

const initialState = {
    userLoginInfo: {
        // accessToken: '123',
        // userName: 'khải'
    },
    lstUser: [

    ]
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_SIGN_IN_USER:

            return { ...state, userLoginInfo: action.userLoginInfo }
        case GET_LIST_USER:
            return { ...state, lstUser: action.lstUser };

        default:
            return { ...state };
    }
}
