import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import addAvatar from "../imgs/addAvatar.png";
const schema = yup
  .object({
    displayName: yup
      .string()
      .max(20, "Must be less than 20 characters!")
      .required("Required!")
      .min(6, "Must be more than 6 characters!")
      .matches(/^[a-zA-Z0-9_]+$/, "Must not contain speacial characters other than underscore!"),
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
export default function Register() {
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
        <span className="title">Register</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="formField">
            <input {...register("displayName")} placeholder="Display Name" id="displayName"></input>
            <label htmlFor="displayName" className="label">
              Display Name
            </label>
            <p className="errors">{errors.displayName?.message}</p>
          </div>
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

          <input {...register("file")} type="file" id="file" style={{ display: "none" }}></input>
          <label htmlFor="file" className="label avatar">
            <img src={addAvatar} alt="add"></img>
            <span>Add an avatar</span>
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <span className="link">You do have an account? Login</span>
      </div>
    </div>
  );
}
