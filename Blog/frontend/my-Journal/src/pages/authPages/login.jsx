import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { loginUser } from "../../services/authService";
import "./Auth.css";

function Login() {

  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm();

  const onSubmit=(data)=>{
    loginUser(data);
  };

  return(

    <div className="auth-page">

      <div className="auth-left">

        <h1>
          Welcome Back
        </h1>

        <p>
          Continue your journey
          through thoughts,
          technology and philosophy.
        </p>

      </div>

      <div className="auth-right">

        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >

          <h2>Login</h2>

          <input
            type="email"
            placeholder="Email"
            {...register(
              "email",
              {
                required:"Email required"
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
                required:"Password required"
              }
            )}
          />

          <p>{errors.password?.message}</p>

          <button>

            Login

          </button>

          <span>

            New here?

            <Link to="/register">

              Register

            </Link>

          </span>

        </form>

      </div>

    </div>
  );
}

export default Login;