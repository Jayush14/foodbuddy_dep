import React, { createContext, useContext, useReducer } from "react";

// Create Context
const GlobalStateContext = createContext();

// Reducer Function (Example)
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            id: action.id,
            name: action.name,
            qty: action.qty,
            size: action.size,
            price: action.price,
            img: action.img,
          },
        ],
      };
    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((_, index) => index !== action.index),
      };
    case "UPDATE":
      return {
        ...state,
        cart: state.cart.map((food) =>
          food.id === action.id
            ? {
                ...food,
                qty: parseInt(action.qty) + food.qty,
                price: action.price + food.price,
              }
            : food
        ),
      };
    case "INCREASE":
      return {
        ...state,
        cart: state.cart.map((food) =>
          food.id === action.id
            ? {
                ...food,
                qty: food.qty + 1,
                price: (food.price / food.qty) * (food.qty + 1),
              }
            : food
        ),
      };
    case "DECREASE":
      return {
        ...state,
        cart: state.cart.map((food) =>
          food.id === action.id && food.qty > 1
            ? {
                ...food,
                qty: food.qty - 1,
                price: (food.price / food.qty) * (food.qty - 1),
              }
            : food
        ),
      };
    case "DROP":
      return { ...state, cart: [] };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "TOGGLE_THEME":
      return { ...state, darkMode: !state.darkMode };
    case "SET_LOGIN_STATUS":
      return { ...state, isLoggedIn: action.payload };
    default:
      return state;
  }
};

// Initial State
const initialState = {
  user: {},
  darkMode: false,
  isLoggedIn: false,
  cart: [],
};

// Provider Component
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom Hook
export const useGlobalState = () => useContext(GlobalStateContext);
