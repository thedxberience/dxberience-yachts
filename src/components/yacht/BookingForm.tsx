"use client";
import { useForm } from "react-hook-form";
import FormInput from "../shared/FormInput";
import CustomButton from "../shared/CustomButton";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { useEffect, useState } from "react";
import { prices } from "@/data/types";

type BookingPayload = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productName: string;
  productSlug: string;
  productPrice?: number;
  country?: string;
  date?: string;
  time?: string;
  noOfTickets?: number;
  partnerId?: string;
  sortBy?: string;
};

type BookingFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactMethod?: string;
};

type BookingFormProps = {
  slug: string;
  yachtName: string;
  yachtDescription: string;
  prices: prices[];
};

const BookingForm = ({
  slug,
  yachtName,
  yachtDescription,
  prices,
}: BookingFormProps) => {
  const [showStatus, setShowStatus] = useState(false);
  // const [bookingError, setBookingError] = useState<string>("");

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

  // console.log(prices);

  const formValues = watch();

  const { mutateAsync, error, isError, isSuccess, isPending } = useMutation({
    mutationKey: ["make-bookings", formValues.email, yachtName, slug],
    mutationFn: async (data: BookingPayload) => {
      const dataReq = await makeRequest("/booking", {
        method: "POST",
        data: data,
      });
      return dataReq;
    },
    onError: () => {
      setShowStatus(true);
      // setBookingError(error.message);
    },
  });

  const handleSubmitForm = async (data: BookingFormInputs) => {
    const now = new Date();
    const timestamp = now.getTime();
    const formattedTime = new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Set to true for AM/PM format
    });
    const payload: BookingPayload = {
      customerEmail: data.email,
      customerName: data.firstName + " " + data.lastName,
      customerPhone: data.phone,
      productName: yachtName,
      productSlug: slug,
      country: "united arab emirates",
      date: now.toISOString(),
      noOfTickets: 1,
      partnerId: "",
      productPrice: prices["0"].price,
      time: formattedTime,
    };

    await mutateAsync(payload);
    setShowStatus(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowStatus(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [showStatus]);

  return (
    <div className="booking-form-container flex flex-col items-center justify-center xl:h-[608px] w-full py-10 z-10">
      <div className="booking-form w-11/12 h-full flex flex-col items-center justify-center gap-4">
        <div className="form-header text-white text-center flex justify-center items-center flex-col gap-6 w-full">
          <h1 className="text-3xl xl:text-5xl font-IvyPresto text-white">
            {yachtName}
          </h1>
          <p className="text-sm xl:text-base font-noah">{yachtDescription}</p>
        </div>
        {showStatus && isSuccess && (
          <span className="text-green-300 text-sm">
            Thank you for submitting your booking request. We will get back to
            you shortly.
          </span>
        )}
        {showStatus && isError && (
          <span className="text-red-500 text-sm">{error.message}</span>
        )}
        <form
          className="form w-full h-full flex justify-center items-center flex-col gap-6"
          onSubmit={handleSubmit(handleSubmitForm)}
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
          {/* <div className="form-body flex flex-col justify-center items-center gap-6 w-full">
            <FormInput
              errors={errors}
              placeholder="Contact Method*"
              register={register}
              value={formValues.contactMethod}
              selectOptions={["Email", "Phone"]}
              name="contactMethod"
              inputType="select"
            />
          </div> */}
          <div className="flex justify-center items-center w-full">
            <CustomButton btnName="Book now" isPending={isPending} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
