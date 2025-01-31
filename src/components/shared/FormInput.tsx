"use client";
import Image from "next/image";
import { useState } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

type FormInputProps = {
  name: string;
  placeholder: string;
  inputType?: string;
  register: UseFormRegister<any>;
  setValue?: any;
  errors: any;
  value: string;
  invertText?: boolean;
  options?: RegisterOptions<any, string> | undefined;
  selectOptions?: string[];
};

function FormInput({
  name = "input",
  placeholder,
  inputType = "text",
  register,
  setValue = null,
  errors,
  value,
  invertText = false,
  options = {},
  selectOptions,
}: FormInputProps) {
  const handleInputType = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(true);
    switch (inputType) {
      case "text":
        return (
          <input
            placeholder={placeholder}
            {...register(name, options)}
            id={name}
            type={inputType}
            className={`bg-transparent border-b-[1px] py-1 outline-none ${
              value.length > 0 ? "pt-7" : ""
            }`}
          />
        );
      case "textarea":
        return (
          <textarea
            placeholder={placeholder}
            {...register(name, options)}
            id={name}
            maxLength={180}
            className={`bg-transparent border-b-[1px] py-1 outline-none resize-none h-[100px] ${
              value.length > 0 ? "pt-7" : ""
            }`}
          ></textarea>
        );

      case "time":
        return (
          <input
            placeholder={placeholder}
            {...register(name, options)}
            id={name}
            type={inputType}
            className={`bg-transparent border-b-[1px] pt-2 pb-1 outline-none ${
              value.length > 0 ? "pt-8" : ""
            }`}
          />
        );
      case "number":
        return (
          <input
            placeholder={placeholder}
            {...register(name, options)}
            id={name}
            type={inputType}
            className={`bg-transparent border-b-[1px] pt-2 pb-1 outline-none ${
              value.length > 0 ? "pt-8" : ""
            }`}
          />
        );
      case "password":
        return (
          <div
            className={`bg-transparent w-full flex-center border-b-[1px] py-1 outline-none ${
              value.length > 0 ? "pt-7" : ""
            }`}
          >
            <input
              placeholder={placeholder}
              {...register(name, options)}
              id={name}
              type={showPassword ? "text" : inputType}
              autoComplete="new-password"
              className={`bg-transparent w-full border-none outline-none`}
            />

            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Image
                  src="/eye-slash.svg"
                  alt="hide password"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src="/eye.svg"
                  alt="show password"
                  width={24}
                  height={24}
                />
              )}
            </span>
          </div>
        );

      case "optin":
        return (
          <div className="relative flex gap-2 items-start">
            <input
              type="checkbox"
              id={name}
              {...register(name, options)}
              className="sr-only peer"
              checked={isChecked}
            />

            {/* Custom checkbox */}
            <div
              className="w-5 h-5 flex-shrink-0 bg-white border-2 border-gray-300 rounded-md relative transition-colors flex items-center justify-center"
              onClick={(e) => {
                setIsChecked((prev) => {
                  const newValue = !prev;
                  setValue(name, newValue);
                  return !prev;
                });
              }}
            >
              {isChecked && (
                <Image
                  src="/tick-mark.svg"
                  alt="Tick mark"
                  width={12}
                  height={12}
                />
              )}
            </div>

            <p className="text-sm">
              I would like to receive exclusive communications about products,
              events, and travel-related products from thedxberience.com
            </p>
          </div>
        );

      case "select":
        return (
          <select
            {...register(name, options)}
            id={name}
            className={`bg-transparent border-b-[1px] py-1 outline-none ${
              value.length > 0 ? "pt-7" : ""
            }`}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {selectOptions?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <input
            placeholder={placeholder}
            {...register(name, options)}
            id={name}
            type={inputType}
            className={`bg-transparent border-b-[1px] py-1 outline-none ${
              value.length > 0 ? "pt-7" : ""
            }`}
          />
        );
    }
  };

  return (
    <div
      className={`relative flex flex-col w-full ${
        invertText ? "text-black" : "text-white"
      }`}
    >
      <label
        htmlFor={name}
        className={`absolute ${value.length > 0 ? "" : "hidden"}`}
      >
        {placeholder}
        {errors && errors[name] && <span className="text-red-500"> *</span>}
      </label>
      {handleInputType()}
      {errors && errors[name] && (
        <span className="text-red-500">
          {errors[name].message ? errors[name].message : `${name} is not valid`}
        </span>
      )}
    </div>
  );
}

export default FormInput;
