import {createStore, combineReducers, compose} from 'redux';
import {app, IState as AppState} from '@/pages/App/store';
import chat, {IState as ChatState} from '@/pages/Chat/store';

export interface State {
  app: AppState
  chat: ChatState[]
}

const reducers = combineReducers<State>({
  app,
  chat
});


declare const window: any;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers());
export default store;
