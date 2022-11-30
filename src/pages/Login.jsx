import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import addAvatar from "../imgs/addAvatar.png";
const schema = yup
  .object({
    email: yup.string().email("Invalid email address!").required("Required!"),
    password: yup
      .string()
      .max(15, "Must be 15 characters or less!")
      .required("Required!")
      .min(6, "Must be 6 characters or more!")
      .matches(/[a-z]+/, "Must contain one lowercase character!")
      .matches(/[A-Z]+/, "Must contain one uppercase character!")
      .matches(/\d+/, "Must contain one number!"),
  })
  .required();
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => console.log(data);
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Eren Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="formField">
            <input {...register("email")} placeholder="Email" id="email"></input>
            <label htmlFor="email" className="label">
              Email
            </label>
            <p className="errors">{errors.email?.message}</p>
          </div>
          <div className="formField">
            <input {...register("password")} type="password" placeholder="Password" id="email"></input>
            <label htmlFor="password" className="label">
              Password
            </label>
            <p className="errors">{errors.password?.message}</p>
          </div>
          <button type="submit">Login</button>
        </form>
        <span className="link">You don't have an account? Register</span>
      </div>
    </div>
  );
}
