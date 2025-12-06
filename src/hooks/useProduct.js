import { useContext } from "react"
import { ProductContext } from "../context"

export const useProduct = ()=>{
    return useContext(ProductContext)
}