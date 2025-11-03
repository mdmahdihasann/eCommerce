import { getImage } from "../../utils/getImage";


const CartItems = ({item,count, onHandleDelete, onInriment, ondriment}) => {
  
  
  return (
    <div className="flex items-start space-x-4 pb-4 border-b border-gray-200 mb-4">
      <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
        <img
          src={getImage(item.cover)}
          alt={item.title}
          className="h-full w-auto object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="font-medium">{item.title}</h3>
          <button className="text-red-500 text-sm" onClick={()=>onHandleDelete(item.id)}>×</button>
        </div>
        <p className="text-sm text-gray-500">Size: Large</p>
        <p className="text-sm text-gray-500">Color: White</p>
        <div className="flex justify-between items-center mt-2">
          <p className="font-bold">${item.price}</p>
          <div className="flex items-center space-x-2" >
            <button className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center" onClick={()=>ondriment(item.id)}>
              −
            </button>
            <span className="text-sm">{count}</span>
            <button className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center" onClick={()=>onInriment(item.id)}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
