import { useForm } from "react-hook-form";
import Field from "../components/common/Field";
import { useAxios } from "../hooks/useAxios";
import { useProduct } from "../hooks/useProduct";
import { actions } from "../actions";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CreateForm = ({ setIsProductPopupOpen, onEditMode }) => {
  const { api } = useAxios();
  const { dispatch } = useProduct();
  const [isAdd] = useState(Object.is(onEditMode, null));

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (!isAdd && onEditMode) {
      setValue("title", onEditMode.title || "");
      setValue("rating", onEditMode.rating || 1);
      setValue("stock", onEditMode.stock || 0);
      setValue("price", onEditMode.price || 0);
    }
  }, [isAdd, onEditMode, setValue]);

  const onClosePopup = () => {
    setIsProductPopupOpen(false);
  };

  const handleFormData = async (formData) => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("rating", formData.rating);
    data.append("stock", formData.stock);
    data.append("price", formData.price);
    if (formData.cover && formData.cover.length > 0) {
      data.append("cover", formData.cover[0]);
    }

    try {
      if (isAdd) {
        dispatch({ type: actions.products.DATA_FETCH_ERROR });
        const response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/products`,
          data
        );
        if (response.status === 201) {
          dispatch({ type: actions.products.DATA_CREATE, data: response.data });
          setIsProductPopupOpen(false);
          toast.success("Product Added Successfully");
        }
      } else {
        const response = await api.put(
          `${import.meta.env.VITE_SERVER_BASE_URL}/products/${onEditMode.id}`,
          data
        );

        if (response.status === 200) {
          dispatch({
            type: actions.products.DATA_UPDATED,
            data: response.data,
          });
        }
        setIsProductPopupOpen(false);
        reset();
        toast.success("Product Updated Successfully");
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
          {isAdd ? "Add New Product" : "Update Product"}
        </h3>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(handleFormData)}
        >
          <Field htmlFor="title" error={errors.title}>
            <input
              {...register("title", { required: "The required field" })}
              type="text"
              id="title"
              placeholder="Title"
              className="p-3 rounded border border-gray-300 text-gray-800 w-full"
            />
          </Field>

          <Field htmlFor="cover" error={errors.cover}>
            <input
              {...register("cover", {
                required: isAdd ? "The required file" : false,
              })}
              type="file"
              id="cover"
              className="p-3 rounded border border-gray-300 text-gray-800 w-full"
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
              className="p-3 rounded border border-gray-300 text-gray-800 w-full"
            />
          </Field>

          <Field htmlFor="stock" error={errors.stock}>
            <input
              {...register("stock", { required: "The required field" })}
              type="number"
              id="stock"
              placeholder="Stock"
              className="p-3 rounded border border-gray-300 text-gray-800 w-full"
            />
          </Field>

          <Field htmlFor="price" error={errors.price}>
            <input
              {...register("price", { required: "The required field" })}
              type="number"
              id="price"
              placeholder="Price"
              className="p-3 rounded border border-gray-300 text-gray-800 w-full"
            />
          </Field>

          <div className="flex justify-between gap-3 mt-2">
            <button
              onClick={onClosePopup}
              type="button"
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              {isAdd ? "Add Product" : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
