import { useForm } from "react-hook-form";
import Field from "../components/common/Field";
import { useAxios } from "../hooks/useAxios";
import { useProduct } from "../hooks/useProduct";
import { actions } from "../actions";

const CreateFrom = ({ setIsProductPopupOpen }) => {
  const { api } = useAxios();
  const { dispatch } = useProduct();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const handleFromData = async (formData) => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("rating", formData.rating);
    data.append("stock", formData.stock);
    data.append("price", formData.price);
    if (formData.cover && formData.cover.length > 0) {
      data.append("cover", formData.cover[0]);
    }
    try {
      dispatch({ type: actions.products.DATA_FETCH_ERROR });
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/products`,
        data
      );      
      if (response.status === 201) {
        dispatch({ type: actions.products.DATA_CREATE, data: response.data });
        setIsProductPopupOpen(false)
      }
    } catch (error) {
      dispatch({
        type: actions.products.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Add New Product
        </h3>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(handleFromData)}
        >
          <Field htmlFor="title" error={errors.title}>
            <input
              {...register("title", { required: "The required field" })}
              type="title"
              id="title"
              placeholder="Title"
              className="p-3 rounded border border-gray-300 text-gray-800 w-[100%]"
              required
            />
          </Field>
          <Field htmlFor="cover" error={errors.cover}>
            <input
              {...register("cover", { required: "The required file" })}
              type="file"
              id="cover"
              placeholder="Cover URL"
              className="p-3 rounded border border-gray-300 text-gray-800 w-[100%] w-[100%]"
              required
            />
          </Field>

          <Field htmlFor="rating" error={errors.rating}>
            <input
              {...register("rating", { required: "The required field" })}
              type="number"
              id="rating"
              placeholder="Rating"
              min="1"
              max="5"
              className="p-3 rounded border border-gray-300 text-gray-800 w-[100%]"
              required
            />
          </Field>
          <Field htmlFor="stock" error={errors.stock}>
            <input
              {...register("stock", { required: "The required field" })}
              type="number"
              id="stock"
              placeholder="Stock"
              className="p-3 rounded border border-gray-300 text-gray-800 w-[100%]"
              required
            />
          </Field>
          <Field htmlFor="price" error={errors.price}>
            <input
              {...register("price", { required: "The required field" })}
              type="number"
              id="price"
              placeholder="Price"
              className="p-3 rounded border border-gray-300 text-gray-800 w-[100%]"
              required
            />
          </Field>
          <div className="flex justify-between gap-3 mt-2">
            <button
              onClick={() => setIsProductPopupOpen(false)}
              type="button"
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFrom;
