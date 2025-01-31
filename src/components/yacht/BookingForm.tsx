"use client";
import { useForm } from "react-hook-form";
import FormInput from "../shared/FormInput";
import CustomButton from "../shared/CustomButton";

type BookingFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactMethod: string;
};

const BookingForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormInputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      contactMethod: "",
    },
  });

  const formValues = watch();

  return (
    <div className="booking-form-container flex flex-col items-center justify-center xl:h-[608px] w-full py-10 z-10">
      <div className="booking-form w-11/12 h-full flex flex-col items-center justify-center gap-4">
        <div className="form-header text-white text-center flex justify-center items-center flex-col gap-6 w-full">
          <h1 className="text-3xl xl:text-5xl font-IvyPresto text-white">
            Lamborghini 63 Yacht
          </h1>
          <p className="text-sm xl:text-base font-noah">
            The lamborghini 63 Yacht offers you with the ultimate yachting
            experience. With 18 cabins accommodating 36 guests. This Yacht will
            give you the ultimate experience
          </p>
        </div>
        <form
          className="form w-full h-full flex justify-center items-center flex-col gap-6"
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <div className="form-body flex flex-col xl:flex-row justify-center items-center gap-6 w-full">
            <FormInput
              errors={errors}
              placeholder="First Name*"
              register={register}
              value={formValues.firstName}
              name="firstName"
              options={{
                required: "First name is required",
              }}
            />
            <FormInput
              errors={errors}
              placeholder="Last Name*"
              register={register}
              value={formValues.lastName}
              name="lastName"
              options={{
                required: "Last name is required",
              }}
            />
          </div>
          <div className="form-body flex flex-col justify-center items-center gap-6 w-full">
            <FormInput
              errors={errors}
              placeholder="Email Address*"
              register={register}
              value={formValues.email}
              name="email"
              options={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              }}
            />
            <FormInput
              errors={errors}
              placeholder="Phone*"
              register={register}
              value={formValues.phone}
              name="phone"
            />
          </div>
          <div className="form-body flex flex-col justify-center items-center gap-6 w-full">
            <FormInput
              errors={errors}
              placeholder="Contact Method*"
              register={register}
              value={formValues.contactMethod}
              selectOptions={["Email", "Phone"]}
              name="contactMethod"
              inputType="select"
            />
          </div>
          <div className="flex justify-center items-center w-full">
            <CustomButton btnName="Book now" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
