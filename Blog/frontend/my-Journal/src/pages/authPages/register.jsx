import {useForm} from "react-hook-form"
import { Link } from "react-router-dom"
import "./Auth.css"
import { registerUser } from "../../services/authService";

function Register(){

    const {register,handleSubmit,watch,formState:{errors}}=useForm();

    const password=watch("password");

    const onSubmit=(data)=>{
      registerUser(data);
    };

    return (

        <div className="auth-page">

            <div className="auth-left">
                <h1>
                    Join The Journal
                </h1>

                <p>
                    Create an account to comment,discuss idea and participate in conversations.
                </p>

            </div>

            <div className="auth-right">
                <form className="auth-form"
                onSubmit={handleSubmit(onSubmit)}>

                    <h2>Create Account</h2>

                    <input type="text"
                    placeholder="Username"
                    {...register("username",{required:"Username is required"})}
                    />
                    <p>{errors.username?.message}</p>
                <input
            type="email"
            placeholder="Email"
            {...register(
              "email",
              {
                required:"Email is required"
              }
            )}
          />

          <p>{errors.email?.message}</p>

          <input
            type="password"
            placeholder="Password"
            {...register(
              "password",
              {
                required:"Password is required",
                minLength:{
                  value:8,
                  message:"Minimum 8 characters"
                }
              }
            )}
          />

          <p>{errors.password?.message}</p>

          <input
            type="password"
            placeholder="Confirm Password"
            {...register(
              "confirmPassword",
              {
                validate:(value)=>
                  value===password
                  || "Passwords do not match"
              }
            )}
          />

          <p>{errors.confirmPassword?.message}</p>

          <button type="submit">

            Register

          </button>

          <span>

            Already have an account?

            <Link to="/login">

              Login

            </Link>

          </span>
                </form>
            </div>
        </div>
    )
}
export default Register