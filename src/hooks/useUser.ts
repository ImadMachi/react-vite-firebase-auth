import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

interface useUserReturn {
  user: User | null;
  loading: boolean;
}

const useUser = (): useUserReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
};

export default useUser;
