import { useSelector, useDispatch } from "react-redux";

const useCart = () => {
  const isItemOpened = useSelector((state) => state.isItemOpened);
  const isCartOpened = useSelector((state) => state.isCartOpened);
  const items = useSelector((state) => state.items);
  let isLogged = useSelector((state) => state.isLogged);
  
  const price = useSelector((state) => state.price);
  const shipping = useSelector((state) => state.shipping);
  const dispatch = useDispatch();

  const toggleCart = () => {
    dispatch({
      type: "TOGGLE_CART",
    });
  };
  const toggleLogged = (value) => {
    dispatch({
      type: "TOGGLE_LOGGED",
      payload: value
    });
  };
  const toggleItem = () => {
    dispatch({
      type: "TOGGLE_ITEM",
    });
  };
  const undItem = () => {
    dispatch({
      type: "UND_ITEM",
    });
  }
  const addToCart = (item) =>
    dispatch({
      type: "ADD",
      payload: item,
    });

  const removeFromCart = (item) =>
    dispatch({
      type: "REMOVE",
      payload: item,
    });
  const addOne = (item) =>
  dispatch({
    type: "ADD_ONE",
    payload: item,
  });
  const removeOne = (item) =>
  dispatch({
    type: "REMOVE_ONE",
    payload: item,
  });
  const setShipping = (shipping) => {
    dispatch({
      type: "SET_SHIPPING",
      payload: shipping,
    });
  };

  const emptyCart = () => {
    dispatch({ type: "EMPTY_CART" });
  };

  return {
    items,
    price,
    shipping,
    isCartOpened,
    isItemOpened,
    isLogged,
    toggleLogged,
    setShipping,
    toggleCart,
    toggleItem,
    undItem,
    addToCart,
    addOne,
    removeOne,
    emptyCart,
    removeFromCart,
  };
};

export default useCart;
