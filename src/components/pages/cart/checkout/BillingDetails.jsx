import { useForm } from "react-hook-form";
import Field from "../../../common/Field";

const BillingDetails = ({ handleCheckoutFrom }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
      <form id="checkoutFrom" className="space-y-4" onSubmit={handleSubmit(handleCheckoutFrom)}>
        <Field label="Name" className="text-xl" error={errors.name}>
          <input
            {...register("name", { required: "The name field is required" })}
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </Field>
        <Field label="Phone" className="text-xl" error={errors.phone}>
          <input
            {...register("phone", { required: "The phone field is required" })}
            type="number"
            name="phone"
            id="phone"
            placeholder="Your Phone"
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </Field>
        <Field label="City Select" className="text-xl" error={errors.phone}>
          <select
            {...register("city_select", {
              required: "The city select field is required",
            })}
            id="city_select"
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Bagerhat">Bagerhat</option>
            <option value="Bandarban">Bandarban</option>
            <option value="Barguna">Barguna</option>
            <option value="Barisal">Barisal</option>
            <option value="Bhola">Bhola</option>
            <option value="Bogra">Bogra</option>
            <option value="Brahmanbaria">Brahmanbaria</option>
            <option value="Chandpur">Chandpur</option>
            <option value="Chapai Nawabganj">Chapai Nawabganj</option>
            <option value="Chattogram">Chattogram</option>
            <option value="Chuadanga">Chuadanga</option>
            <option value="Comilla">Comilla</option>
            <option value="Cox's Bazar">Cox's Bazar</option>
            <option value="Dhaka - City Corporation">
              Dhaka - City Corporation
            </option>
            <option value="Dhaka - Outside City Corporation">
              Dhaka - Outside City Corporation
            </option>
            <option value="Dinajpur">Dinajpur</option>
            <option value="Faridpur">Faridpur</option>
            <option value="Feni">Feni</option>
            <option value="Gaibandha">Gaibandha</option>
            <option value="Gazipur">Gazipur</option>
            <option value="Gopalganj">Gopalganj</option>
            <option value="Habiganj">Habiganj</option>
            <option value="Jamalpur">Jamalpur</option>
            <option value="Jashore">Jashore</option>
            <option value="Jhalokathi">Jhalokathi</option>
            <option value="Jhenaidah">Jhenaidah</option>
            <option value="Joypurhat">Joypurhat</option>
            <option value="Khagrachari">Khagrachari</option>
            <option value="Khulna">Khulna</option>
            <option value="Kishoreganj">Kishoreganj</option>
            <option value="Kurigram">Kurigram</option>
            <option value="Kushtia">Kushtia</option>
            <option value="Lakshmipur">Lakshmipur</option>
            <option value="Lalmonirhat">Lalmonirhat</option>
            <option value="Madaripur">Madaripur</option>
            <option value="Magura">Magura</option>
            <option value="Manikganj">Manikganj</option>
            <option value="Meherpur">Meherpur</option>
            <option value="Moulvibazar">Moulvibazar</option>
            <option value="Munshiganj">Munshiganj</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Naogaon">Naogaon</option>
            <option value="Narail">Narail</option>
            <option value="Narayanganj">Narayanganj</option>
            <option value="Narsingdi">Narsingdi</option>
            <option value="Natore">Natore</option>
            <option value="Netrokona">Netrokona</option>
            <option value="Nilphamari">Nilphamari</option>
            <option value="Noakhali">Noakhali</option>
            <option value="Pabna">Pabna</option>
            <option value="Panchagarh">Panchagarh</option>
            <option value="Patuakhali">Patuakhali</option>
            <option value="Pirojpur">Pirojpur</option>
            <option value="Rajbari">Rajbari</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Rangamati">Rangamati</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Satkhira">Satkhira</option>
            <option value="Shariatpur">Shariatpur</option>
            <option value="Sherpur">Sherpur</option>
            <option value="Sirajganj">Sirajganj</option>
            <option value="Sunamganj">Sunamganj</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Tangail">Tangail</option>
            <option value="Thakurgaon">Thakurgaon</option>
          </select>
        </Field>
        <Field
          label="Full Address"
          className="text-xl"
          error={errors.fullAddress}
        >
          <input
            {...register("fullAddress", {
              required: "The fullAddress field is required",
            })}
            type="text"
            name="fullAddress"
            id="fullAddress"
            placeholder="Your Address"
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </Field>
      </form>
    </div>
  );
};

export default BillingDetails;
