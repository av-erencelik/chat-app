import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import addAvatar from "../imgs/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

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
    file: yup
      .mixed()
      .nullable()
      .test("required", "You need to provide a file", (file) => {
        if (file[0]) return true;
        return false;
      }),
  })
  .required();
export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data) => {
    setError("");
    try {
      const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const storageRef = ref(storage, data.displayName);
      console.log(data.file[0]);
      await uploadBytesResumable(storageRef, data.file[0]).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(response.user, {
              displayName: data.displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName: data.displayName,
              email: data.email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "usersChat", response.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
          }
        });
      });
    } catch (err) {
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("Email already in use!");
      } else {
        setError("Something Happened!");
        console.log(err);
      }
    }
  };
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
          <p className="errors">{errors.file?.message}</p>
          <p className="error">{error}</p>
          <button type="submit">Sign Up</button>
        </form>
        <span className="link">
          You do have an account? <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
}
