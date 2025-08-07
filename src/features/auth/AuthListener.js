import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { addUser, removeUser } from "../../redux/userSlice";

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Destructure required user data
        const { uid, email, displayName, photoURL } = user;

        // Add user to Redux store
        dispatch(addUser({ uid, email, displayName, photoURL }));
      } else {
        // Remove user from Redux store
        dispatch(removeUser());
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [dispatch]);

  // This component doesn't render anything
  return null;
};

export default AuthListener;
