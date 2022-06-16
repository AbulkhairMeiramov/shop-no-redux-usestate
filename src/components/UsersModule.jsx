import { IconButton, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { RegistrationForm } from "./RegistrationForm";
import { useFieldArray, useForm } from "react-hook-form";

const RegistrationFormStyled = styled(RegistrationForm)`
  margin-right: 30px;
`;
const Wrapper = styled("div")`
  display: flex;
`;
const List = styled("ul")`
  list-style: none;
  margin: 0;
  padding: 0;

  & > li {
    margin-bottom: 8px;
    border: 1px solid #aaa;
    padding: 8px;
    display: flex;
  }
`;
export const UsersModule = () => {
  const { control } = useForm({
    defaultValues: {
      users: JSON.parse(localStorage.getItem("users")) || {}
    }
  });
  const { fields: users, append, remove } = useFieldArray({
    control,
    name: "users"
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <Wrapper>
      <RegistrationFormStyled onUserCreated={append} />
      <div>
        <h4>Users</h4>
        <List>
          {users.map((user, index) => (
            <li>
              <span>
                {user.lastName} {user.firstName}
                <IconButton aria-label="delete" onClick={() => remove(index)}>
                  <DeleteIcon />
                </IconButton>
              </span>
            </li>
          ))}
        </List>
      </div>
    </Wrapper>
  );
};
