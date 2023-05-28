import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";

const TextField = ({ label, name }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const error = errors[name] && errors[name].message;

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setValue(name, value, { shouldValidate: true });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <label>{label}</label>
      <input {...register(name)} onChange={handleChange} />
      {!!error && <span className="text-red-600">{error}</span>}
    </>
  );
};

export default React.memo(TextField);
