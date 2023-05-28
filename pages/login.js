import React from "react";
import { loginSchema } from "@/schema/Login";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@/components/inputs/TextField";
const Login = () => {
  const methods = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-2">
            <TextField name="username" type="string" />
            <TextField name="email" type="string" />
            <TextField name="password" type="string" />
            <button type="submit">Submit</button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;
