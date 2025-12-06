import { useForm } from "react-hook-form";
import Field from "../components/common/Field";
import { useAxios } from "../hooks/useAxios";

const CreateFrom = ({ setIsProductPopupOpen }) => {

  const {api} = useAxios();

  const {handleSubmit, formState: {errors}, register} = useForm();

  const handleFromData = (formData) =>{
    const data = new FormData();
    try {
      
    } catch (error) {
      console.log(error);
      
    }

    console.log(formData);
    
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Add New Product
        </h3>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(handleFromData)}>
          <Field htmlFor="title" error={errors.title}>
            <input
            {...register("title", {required: "The required field"})}
              type="title"
              id="title"
              placeholder="Title"
              className="p-3 rounded border border-gray-300 text-gray-800"
              required
            />
          </Field>
          <Field htmlFor="cover" error={errors.cover}>

            <input
            {...register("cover", {required: "The required file"})}
              type="file"
              id="cover"
              placeholder="Cover URL"
              className="p-3 rounded border border-gray-300 text-gray-800"
              required
            />
          </Field>

          <Field htmlFor="rating" error={errors.rating}>
            <input
            {...register("rating", {required: "The required field"})}
              type="number"
              id="rating"
              placeholder="Rating"
              min="1"
              max="5"
              className="p-3 rounded border border-gray-300 text-gray-800"
              required
            />
          </Field>
          <Field htmlFor="stock" error={errors.stock}>
            <input
            {...register("stock", {required: "The required field"})}
              type="number"
              id="stock"
              placeholder="Stock"
              className="p-3 rounded border border-gray-300 text-gray-800"
              required
            />
          </Field>
          <Field htmlFor="price" error={errors.price}>
            <input
            {...register("price", {required: "The required field"})}
              type="number"
              id="price"
              placeholder="Price"
              className="p-3 rounded border border-gray-300 text-gray-800"
              required
            />
          </Field>
          <div className="flex justify-end gap-3 mt-2">
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
