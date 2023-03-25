import Link from "@components/Link";
import Loader from "@components/Loader";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import styles from "@styles/pages/register.module.scss";
import useUser from "@hooks/useUser";

type Inputs = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

const Register = () => {
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
      username: "",
      email: "",
      password: "",
      password2: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      const existingMethods = await fetchSignInMethodsForEmail(auth, data.email);

      if (existingMethods.length > 0) {
        setFbError("User with this email already exists");
        setLoading(false);
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCredential.user, {
        displayName: data.username,
      });
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        displayName: data.username,
        email: data.email,
      });
      navigate("/");
    } catch (err: any) {
      setLoading(false);
      setFbError("something went wrong");
    }
  };

  if (userLoading) return <Loader />;

  return (
    <div className={styles.container}>
      <form className={`${styles.form} flex-column`} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.heading}>Register</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: "Please enter a Username",
            pattern: { value: /^[A-z0-9]{3,}$/, message: "Username should contains only letters and digits, and 3 letters min" },
          })}
          placeholder="John Doe"
        />
        {errors.username && <p className={styles.message}>{errors.username?.message}</p>}
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          {...register("email", {
            required: "Please enter an Email",
            pattern: {
              value: /^[A-z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email",
            },
          })}
          placeholder="john.doe@gmail.com"
        />
        {errors.email && <p className={styles.message}>{errors.email?.message}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "Please enter a Password",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/,
              message: "Password requires at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character",
            },
          })}
        />
        {errors.password && <p className={styles.message}>{errors.password?.message}</p>}
        <label htmlFor="password2">Confirm Password</label>
        <input type="password" id="password2" {...register("password2", { required: "Password does not match", validate: (val: string) => val === watch("password") || "Password does not match" })} />
        {errors.password2 && <p className={styles.message}>{errors.password2?.message}</p>}

        <button type="submit">Register {loading && <Loader />}</button>
        {!!fbError && <p className={styles.message}>{fbError}</p>}
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
