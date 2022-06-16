import { styled, TextField, FormControl, Button } from "@mui/material";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { getInputState } from "../utils/getInputState";
import { required, validatePassword, authValues } from "../utils/validators";

const Wrapper = styled("form")`
  width: 400px;
  height: auto;
  border: 1px solid #c1c2c3;
  padding: 16px;
  border-radius: 4px;
  h4 {
    margin-top: 0;
  }
  margin-top: 50px;
`;

export const AuthorizationForm = () => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: JSON.parse(localStorage.getItem("values")) || {}
  });

  const onSubmit = useCallback((values) => {
    if (authValues(values)) {
      alert("User sucessfully authorized");
    } else {
      alert("No user exist");
    }
  }, []);

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <h4>Authorization</h4>
      <FormControl sx={{ width: "100%", mb: 1 }}>
        <TextField
          label="e-mail"
          type="email"
          variant="outlined"
          {...register("email", { required: required() })}
          {...getInputState(formState, "email")}
        />
      </FormControl>
      <FormControl sx={{ width: "100%", mb: 1 }}>
        <TextField
          label="Пароль"
          type="password"
          variant="outlined"
          {...register("password", {
            required: required(),
            validate: validatePassword
          })}
          {...getInputState(formState, "password")}
        />
      </FormControl>
      <FormControl sx={{ width: "100%", mb: 1 }}>
        <Button type="submit" variant="outlined">
          Авторизоваться
        </Button>
      </FormControl>
    </Wrapper>
  );
};
