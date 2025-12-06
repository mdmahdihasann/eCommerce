import { useReducer } from 'react'
import { ProductContext } from '../context'
import { initialState, ProductReducers } from '../reducres/ProductReducres'

const ProductProvider = ({children}) => {
    const [state, dispatch] = useReducer(ProductReducers, initialState)
  return (
    <ProductContext.Provider value={{state, dispatch}}>
        {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider