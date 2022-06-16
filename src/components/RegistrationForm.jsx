import { useCallback } from "react";
import { styled, TextField, FormControl, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { getInputState } from "../utils/getInputState";
import {
  required,
  validateCPassword,
  validatePassword
} from "../utils/validators";

const Wrapper = styled("form")`
  width: 400px;
  height: auto;
  border: 1px solid #c1c2c3;
  padding: 16px;
  border-radius: 4px;
  h4 {
    margin-top: 0;
  }
`;

export const RegistrationForm = ({ className, onUserCreated }) => {
  const { register, handleSubmit, formState, getValues } = useForm({
    defaultValues: JSON.parse(localStorage.getItem("values")) || {}
  });

  const onSubmit = useCallback(
    (values) => {
      onUserCreated(values);
    },
    [onUserCreated]
  );

  return (
    <Wrapper className={className} onSubmit={handleSubmit(onSubmit)}>
      <h4>Registration</h4>

      <FormControl sx={{ width: "100%", mb: 1 }}>
        <TextField
          label="Фамилия"
          variant="outlined"
          {...register("lastName", { required: required() })}
          {...getInputState(formState, "lastName")}
        />
      </FormControl>

      <FormControl sx={{ width: "100%", mb: 1 }}>
        <TextField
          label="Имя"
          variant="outlined"
          {...register("firstName", { required: required("Прошу введи имя") })}
          {...getInputState(formState, "firstName")}
        />
      </FormControl>

      <FormControl sx={{ width: "100%", mb: 1 }}>
        <TextField
          label="Отчество"
          variant="outlined"
          {...register("middleName")}
          {...getInputState(formState, "middleName")}
        />
      </FormControl>

      <FormControl sx={{ width: "100%", mb: 1 }}>
        <TextField
          label="e-mail"
          variant="outlined"
          type="email"
          {...register("email", { required: required() })}
          {...getInputState(formState, "email")}
        />
      </FormControl>

      <FormControl sx={{ width: "100%", mb: 1 }}>
        <TextField
          label="Пароль"
          variant="outlined"
          type="password"
          {...register("password", {
            required: required(),
            validate: validatePassword
          })}
          {...getInputState(formState, "password")}
        />
      </FormControl>

      <FormControl sx={{ width: "100%", mb: 1 }}>
        <TextField
          label="Повторите пароль"
          variant="outlined"
          type="password"
          {...register("cPassword", {
            required: required(),
            validate: validateCPassword(getValues("password"))
          })}
          {...getInputState(formState, "cPassword")}
        />
      </FormControl>

      <FormControl sx={{ width: "100%", mb: 1 }}>
        <Button type="submit" variant="outlined">
          Зарегистрироваться
        </Button>
      </FormControl>
    </Wrapper>
  );
};
