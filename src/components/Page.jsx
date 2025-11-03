
import FilterSection from "../Product/FilterSection";
import ProductCart from "../Product/ProductCart";
import CartSection from "../Product/Cart/CartSection";


const Page = ({addToCart, onHandleDelete, data, onHandleSelect}) => {
  
  return (
    
    <main className="container mx-auto px-4 md:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* <!-- Products Section (2/3 width on large screens) --> */}
        <div className="lg:col-span-2">
          <FilterSection onHandleSelect={onHandleSelect}/>

          {/* <!-- Products Grid --> */}
          <div className="product-grid">
            {
              data.map(item=>(
                <ProductCart item={item} key={item.id} addToCart={addToCart} onHandleDelete={onHandleDelete}/>
              ))
            }
            
          </div>
        </div>

        {/* <!-- Cart Section (1/3 width on large screens) --> */}
        <CartSection onHandleDelete={onHandleDelete}/>
      </div>
    </main>
  );
};

export default Page;
