import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

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
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (err) {
      setError("Something went wrong!");
    }
  };
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
          <p className="error">{error}</p>
          <button type="submit">Login</button>
        </form>
        <span className="link">
          You don't have an account? <Link to="/register">Register</Link>
        </span>
      </div>
    </div>
  );
}
