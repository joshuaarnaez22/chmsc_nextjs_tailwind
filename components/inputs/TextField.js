import React, { useMemo } from "react";
import { useFormContext, useFormState } from "react-hook-form";

const TextField = ({ label, name }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name] && errors[name].message;
  console.log(error);
  return (
    <>
      <label>{label}</label>
      <input {...register(name)} />
      {!!error && <span className="text-red-600">{error}</span>}
    </>
  );
};

export default React.memo(TextField);
