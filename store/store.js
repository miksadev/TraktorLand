import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

let store;

const initialState = {
  isCartOpened: false,
  items: [],
  price: 0,
  shipping: {}
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "EMPTY_CART":
      return {
        ...state,
        price: 0,
        items: [],
      };
    case "TOGGLE_CART":
      return {
        ...state,
        isCartOpened: !state.isCartOpened,
      };
      case "UND_ITEM":
      return{
        ...state,
        isItemOpened:undefined
      };
    case "TOGGLE_ITEM":
      return {
        ...state,
        isItemOpened: !state.isItemOpened,
      };
    case "ADD":

      let plusitem = state.items.filter((item) => item.id == payload.id);
      let newItems = [...state.items];

      if(plusitem.length > 0){
          newItems.forEach(item => {
           if(item.id == payload.id){
             item.qty += payload.qty;
           }
         });
         console.log("PAYLOAD1")
      console.log(payload)
         return {
          ...state,
          price: state.price + (payload.price2 * payload.qty),
          isCartOpened: true,
          items: newItems,
        };
      }
      else{
        console.log("PAYLOAD2")
      console.log(state.price)
        return {
          ...state,
          price: state.price + payload.price2 * payload.qty,
          isCartOpened: true,
          items: [...state.items, payload],
        };
      }
    case "ADD_ONE":
      newItems = [...state.items];

      newItems.forEach(item => {
        if(item.id == payload.id){
          item.qty++;
        }
      });
      return {
        ...state,
        price: state.price + payload.price2,
        items: newItems,
      };
    case "REMOVE_ONE":
    newItems = [...state.items];
    let newPrice = state.price;
    newItems.forEach(item => {
      if(item.id == payload.id){
        if(item.qty > 1){
          item.qty--;
          newPrice-=payload.price2;
        }
      }
    });
    return {
      ...state,
      price: newPrice,
      items: newItems,
    };
    case "REMOVE":
      return {
        ...state,
        price: state.price - payload.price2*payload.qty,
        items: state.items.filter(
          (item) => item.id !== payload.id
        ),
      };
    case "SET_SHIPPING":
      return {
        ...state,
        shipping: payload,
      };
    default:
      return state;
  }
};

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState) => {
  if(typeof window == "undefined"){
    console.log("SERVER")
    console.log(store)
  }else{
    console.log("CLIENT")
    console.log(store)
  }
  let _store = store ?? initStore(preloadedState);
  
  
  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
