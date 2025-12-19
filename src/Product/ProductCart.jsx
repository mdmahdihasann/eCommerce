import { useState } from "react";
import Rating from "./Rating";


const ProductCart = ({item, addToCart, onHandleDelete}) => {
  const [inCart, setInCart] = useState(false);

  function handleAdd(item){
    addToCart(item);
    setInCart(true)
  }
  function handleDelete(itemId){
    onHandleDelete(itemId);
    setInCart(false)
  }
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <img
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/${item.cover}`}
          alt={item.title}
          className="h-full w-auto object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium">{item.title} </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center my-1">
            <div className="flex">
              <Rating rating={item.rating}/>
            </div>
            <span className="text-xs text-gray-500 ml-1">{item.rating}/5</span>
          </div>
          <span className="text-xs text-gray-700">({item.stock} pcs left)</span>
        </div>
        <p className="font-bold">${item.price} </p>
        {
          inCart ? (<button disabled={item.stock === 0} className="w-full mt-2 bg-red-800 py-1 text-gray-100 rounded flex items-center justify-center" onClick={()=> handleDelete(item.id)}>
          Remove from Cart
        </button> ): (<button disabled={item.stock === 0} onClick={()=> handleAdd(item)} class="disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed w-full mt-2 bg-gray-800 py-1 text-gray-100 rounded flex items-center justify-center active:translate-y-1 transition-all active:bg-gray-900">Add to Cart</button>)
        }
      </div>
    </div>
  );
};

export default ProductCart;
