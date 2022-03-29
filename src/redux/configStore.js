//middleware redux saga
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createMiddleWareSaga from 'redux-saga';
import { UserReducer } from './reducers/UserReducer';

//import rootSaga
import { rootSaga } from './saga/rootSaga';

const middlewareSaga = createMiddleWareSaga();


const rootReducer = combineReducers({
    UserReducer
})

const store = createStore(rootReducer, applyMiddleware(middlewareSaga));

//run saga
middlewareSaga.run(rootSaga);

export default store;