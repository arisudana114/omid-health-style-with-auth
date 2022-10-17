import Image from "next/image";
import React, { useReducer, useState, useContext } from "react";
import { Store } from "../utils/Store";

const ProductCard = ({ product }) => {
  const [cardModal, setCardModal] = useState(false);

  const { cartState, cartDispatch } = useContext(Store);

  const handleModal = () => {
    setCardModal(!cardModal);
  };

  const initialState = {
    priceIndex: 0,
    quantityIndex: 0,
    currentPrice: product.price[0],
  };

  const productReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_PRICE_INDEX":
        return { priceIndex: action.payload };
      // case 'CHANGE_QUANTITY_INDEX':
      // 	return { quantityIndex: state.quantityIndex + 1 };
      default:
        break;
    }
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  const handleChangeQuantity = (value) => {
    setCardModal(!cardModal);
    dispatch({ type: "CHANGE_PRICE_INDEX", payload: value });
  };

  const addToCartHandler = () => {
    const existItem = cartState.cart.cartItems.find(
      (x) =>
        x.slug === product.slug && x.price === product.price[state.priceIndex]
    );
    const itemQuantity = existItem ? existItem.itemQuantity + 1 : 1;
    cartDispatch({
      type: "CART_ADD_ITEM",
      payload: {
        ...product,
        price: product.price[state.priceIndex],
        quantity: product.quantity[state.priceIndex],
        itemQuantity,
      },
    });
  };

  return (
    <div className="flex flex-col items-center max-w-[12rem]">
      {product.isDiscount ? (
        <p>{product.discount}% off</p>
      ) : (
        <p className="opacity-0">no discount</p>
      )}
      <div className="bg-white text-black text-center p-1 rounded-md relative w-full h-full overflow-hidden z-0">
        <div className={cardModal ? "opacity-0" : ""}>
          <Image
            src={product.image[0]}
            alt={product.slug}
            width={200}
            height={200}
          />

          <div className="flex flex-col justify-between">
            <p>{product.name}</p>
            {product.isDiscount ? (
              <>
                <p className="text-xs">
                  <s>Rp. {product.price[state.priceIndex]}</s>
                </p>
                <p className="text-lg -mb-2">
                  Rp.{" "}
                  {product.price[state.priceIndex] -
                    (product.price[state.priceIndex] * product.discount) / 100}
                </p>
              </>
            ) : (
              <>
                <p className="opacity-0">no discount</p>
                <p className="text-lg -mb-2">
                  Rp. {product.price[state.priceIndex]}
                </p>
              </>
            )}
          </div>
        </div>
        <button
          className="bg-green-500 text-white px-3 py-1 m-2 rounded-md shadow-md"
          onClick={handleModal}
        >
          Choose Quantity
        </button>

        <div
          className={cardModal ? "cart-modal-active" : "cart-modal-inactive"}
        >
          {product.quantity.map((quantity) => {
            return (
              <button
                className={
                  cardModal
                    ? "rounded-sm outline outline-offset-2 outline-gray-500 w-1/2 font-bold"
                    : "rounded-sm outline outline-offset-2 outline-gray-500 w-1/2 font-bold opacity-0"
                }
                value={product.quantity.indexOf(quantity)}
                key={quantity}
                onClick={(e) => handleChangeQuantity(e.target.value)}
              >
                {quantity} gr
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex w-full">
        <button className="bg-red-400 text-white my-2 mr-2 rounded-md w-[20%]">
          &#9829;
        </button>
        <button
          onClick={addToCartHandler}
          className="bg-green-500 text-white py-1 my-2 rounded-md w-[80%]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
