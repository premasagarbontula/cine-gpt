import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // This callback will be triggered whenever the user's authentication state changes
      // It can be when the user signs in, signs out, or the auth state is initialized
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));

        // console.log("User is signed in:", user);
      } else {
        dispatch(removeUser());

        // console.log("No user is signed in.");
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return null; // No need to return any JSX here
};

export default AuthListener;
