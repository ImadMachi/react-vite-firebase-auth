import Link from "@components/Link";
import Loader from "@components/Loader";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import styles from "@styles/pages/register.module.scss";
import useUser from "@hooks/useUser";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [fbError, setFbError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user, loading: userLoading } = useUser();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (err: any) {
      setLoading(false);
      setFbError("something went wrong");
    }
  };

  if (userLoading) return <Loader />;

  return (
    <div className={styles.container}>
      <form className={`${styles.form} flex-column`} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.heading}>Login</h1>

        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email", { required: "Please enter an Email" })} placeholder="john.doe@gmail.com" />
        {errors.email && <p className={styles.message}>{errors.email?.message}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "Please enter a Password",
          })}
        />
        {errors.password && <p className={styles.message}>{errors.password?.message}</p>}

        <button type="submit">Login {loading && <Loader />}</button>
        {!!fbError && <p className={styles.message}>{fbError}</p>}
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
