import { call, put, takeLatest, delay } from "redux-saga/effects";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../util/settingSystem';
import { userServices } from '../../services/UserServices';
import { LOGIN_SAGA, GET_LIST_USER, GET_LIST_USER_SAGA, SET_SIGN_IN_USER, SIGN_UP_SAGA, EDIT_USER_SAGA, DELETE_USER_SAGA } from '../constants/UserConst';
import { history } from '../../util/history';

/*
    28/03/2022
    Phước code    
*/
function* signUpSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    });

    yield delay(500);

    try {
        const { data, status } = yield call(() => userServices.signUp(action.userSignUpInfo));


        if (status === STATUS_CODE.SUCCESS) {
            //console.log('Sign up successfully!');
            //redirect to login page
            history.push('/login');
        }

    } catch (error) {
        console.log('error sign up', error);
    } finally {
        yield put({
            type: HIDE_LOADING
        });
    }
}

export function* theoDoiSignUpSaga() {
    yield takeLatest(SIGN_UP_SAGA, signUpSaga);
}

/*
    28/03/2022
    Phước code    
*/
function* loginSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    });

    yield delay(500);


    //console.log('action', action);

    try {
        const { data, status } = yield call(() => userServices.login(action.userLogin));

        if (status === STATUS_CODE.SUCCESS) {
            //console.log('Sign up successfully!');
            //redirect to login page

            //lấy access token và lưu vào localStorage
            //lấy thông tin user trừ password lưu vào state để quản lý        
            localStorage.setItem(TOKEN, data.content.accessToken);
            localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

            yield put({
                type: SET_SIGN_IN_USER,
                userLoginInfo: data.content
            })

            //redirect to UserManagement page
            history.push('/usermanagement');
        }

    } catch (error) {
        console.log('error sign up', error);
    } finally {
        yield put({
            type: HIDE_LOADING
        });
    }
}

export function* theoDoiLoginSaga() {
    yield takeLatest(LOGIN_SAGA, loginSaga);
}


/*
    29/03/2022
    Phước code    
*/
function* getListUserSaga(action) {


    try {
        const { data, status } = yield call(() => userServices.getListUser(action.search));

        if (status === STATUS_CODE.SUCCESS) {

            //console.log('data', data);
            //lấy list user từ API và put vào reducer cho UserManagement
            yield put({
                type: GET_LIST_USER,
                lstUser: data.content
            })

        }

    } catch (error) {
        console.log('error get list user', error);
    } finally {

    }
}

export function* theoDoiGetListUserSaga() {
    yield takeLatest(GET_LIST_USER_SAGA, getListUserSaga)
}

/*
    29/03/2022
    Phước code    
*/
function* editUserSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    });

    yield delay(500);


    //console.log('action', action);

    try {
        const { data, status } = yield call(() => userServices.editUser(action.updatedUser));

        if (status === STATUS_CODE.SUCCESS) {

            //get list user từ API và put vào reducer cho UserManagement
            //để refresh list user mới update
            yield put({
                type: GET_LIST_USER,
                lstUser: data.content
            })

        }

    } catch (error) {
        console.log('error edit user', error);
    } finally {
        yield put({
            type: HIDE_LOADING
        });
    }
}

export function* theoDoiEditUserSaga() {
    yield takeLatest(EDIT_USER_SAGA, editUserSaga);
}

/*
    29/03/2022
    Phước code    
*/
function* deleteUserSaga(action) {


    try {
        const { data, status } = yield call(() => userServices.deleteUser(action.userId));

        if (status === STATUS_CODE.SUCCESS) {

            //get list user từ API và put vào reducer cho UserManagement
            //để refresh list user mới update
            yield put({
                type: GET_LIST_USER,
                lstUser: data.content
            })

        }

    } catch (error) {
        console.log('error delete user', error);
    } finally {

    }
}

export function* theoDoiDeleteUserSaga() {
    yield takeLatest(DELETE_USER_SAGA, deleteUserSaga);
}
