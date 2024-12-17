import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { globalReducer } from './globalReducer';
import { GlobalState, GlobalAction } from './types';

// 配置 Redux Store
const store = createStore(
    globalReducer,
    applyMiddleware(thunk as ThunkMiddleware<GlobalState, GlobalAction>)
);

export default store;
