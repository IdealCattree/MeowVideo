import { applyMiddleware, createStore } from "redux";
import reducer, { IRootState } from "./reducers";
import logger from "redux-logger";
import thunk, { ThunkMiddleware } from "redux-thunk";

export const store = createStore(reducer, applyMiddleware(thunk as ThunkMiddleware<IRootState>, logger));
