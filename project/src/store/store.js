import { createStore } from 'redux';

// Action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Action creators
export const login = (token) => ({
  type: LOGIN,
  payload: token,
});

export const logout = () => ({
  type: LOGOUT,
});

// Reducer
const initialState = {
  token: localStorage.getItem('token') || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('token', action.payload);
      return { ...state, token: action.payload };
    case LOGOUT:
      localStorage.removeItem('token');
      return { ...state, token: null };
    default:
      return state;
  }
};

// Store
const store = createStore(authReducer);

export default store;