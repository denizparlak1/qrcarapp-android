import { signInWithEmailAndPassword as signIn } from "firebase/auth";
import { auth } from "../config/firebase";
import { signOut as firebaseSignOut } from "firebase/auth";


export const signInWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await signIn(auth, email, password);
        const user = userCredential.user;
        const idTokenResult = await user.getIdTokenResult();
        return { user, customClaims: idTokenResult.claims };

    } catch (error) {
        throw error;
    }
};

export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
};


