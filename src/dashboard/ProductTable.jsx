import React, { useEffect } from "react";
import { useAxios } from "../hooks/useAxios";
import { useProduct } from "../hooks/useProduct";
import { actions } from "../actions";
import { FaPen, FaTrash } from "react-icons/fa";

const ProductTable = () => {
  const { api } = useAxios();
  const { state, dispatch } = useProduct();
  const productTableData = state?.products?.sort((a, b)=> b.id - a.id);
  useEffect(() => {
    const productDataFeched = async () => {
      dispatch({ type: actions.products.DATA_FETCHING });
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/products`
        );
        console.log(response.data);

        if (response.status === 200) {
          dispatch({
            type: actions.products.DATA_FETCHED,
            data: response.data.products,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    productDataFeched();
  }, []);

  //delete code
  const handleDelete = async(delteId) =>{
    dispatch({ type: actions.products.DATA_FETCH_ERROR });
    try {
      const response = await api.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/products/${delteId}`)
      if(response.status === 200){
        dispatch({type: actions.products.DATA_DELETE, data: delteId})
      }
    } catch (error) {
      dispatch({type: actions.products.DATA_FETCH_ERROR, error: error.message})
    }
  }

  if (state?.loading) return <div>Weating for data....</div>;
  if (state?.error) return <div>Error in fatching posts {state?.error}</div>;
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-gray-600">ID</th>
          <th className="px-6 py-3 text-left text-gray-600">Title</th>
          <th className="px-6 py-3 text-left text-gray-600">Cover</th>
          <th className="px-6 py-3 text-left text-gray-600">Rating</th>
          <th className="px-6 py-3 text-left text-gray-600">Stock</th>
          <th className="px-6 py-3 text-left text-gray-600">Price</th>
          <th className="px-6 py-3 text-left text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {productTableData?.map((p) => (
          <tr key={p.id} className="hover:bg-gray-50 transition">
            <td className="px-6 py-3">{p.id}</td>
            <td className="px-6 py-3 font-medium">{p.title}</td>
            <td className="px-6 py-3">
              <img
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${p.cover}`}
                alt={p.title}
                className="w-16 h-16 object-cover rounded-lg shadow"
              />
            </td>
            <td className="px-6 py-3">{p.rating}</td>
            <td className="px-6 py-3">{p.stock}</td>
            <td className="px-6 py-3">${p.price}</td>
            <td className="px-6 py-3 flex gap-3">
              <button className="text-blue-500 hover:text-blue-700 transition">
                <FaPen size={16} />
              </button>
              <button className="text-red-500 hover:text-red-700 transition" onClick={()=>handleDelete(p.id)}>
                <FaTrash size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
