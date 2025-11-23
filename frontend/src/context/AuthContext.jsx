// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
    name: "Test User",
    email: "test@example.com",
  });

  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Firestore role when app starts
  useEffect(() => {
    const initUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("userData");

        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          const emailKey = parsedUser.email?.toLowerCase(); // always normalize

          if (emailKey) {
            const userRef = doc(db, "users", emailKey);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
              console.log(
                "⚠️ No Firestore doc found, creating one for:",
                emailKey
              );
              await setDoc(userRef, {
                email: parsedUser.email,
                role: "user",
              });
              setUser({ ...parsedUser, role: "user", token });
            } else {
              const userDataFromDb = userSnap.data();
              console.log("✅ Firestore user found:", userDataFromDb);
              setUser({
                _id: parsedUser._id,
                name: parsedUser.name,
                email: parsedUser.email,
                isAdmin: parsedUser.isAdmin,
                role: userDataFromDb.role,
                token,
              });
            }
          }
        } else {
          console.log("ℹ️ No token/userData found in localStorage");
        }
      } catch (error) {
        console.error("❌ Error fetching user role:", error);
      } finally {
        setLoading(false); // ✅ wait until Firestore done
      }
    };

    initUser();
  }, []);

  // ✅ Login (when user logs in)
  const login = async (token, userData = null) => {
    try {
      localStorage.setItem("token", token);
      if (userData) localStorage.setItem("userData", JSON.stringify(userData));

      if (userData?.email) {
        const emailKey = userData.email.toLowerCase(); // ✅ normalize here too
        const userRef = doc(db, "users", emailKey);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          console.log("🆕 Creating Firestore doc for:", emailKey);
          await setDoc(userRef, { email: userData.email, role: "user" });
          setUser({ ...userData, role: "user", token });
        } else {
          const userDataFromDb = userSnap.data();
          console.log("✅ Found Firestore user:", userDataFromDb);
          setUser({
            _id: userData._id, // <-- ensure backend ID stays
            name: userData.name,
            email: userData.email,
            isAdmin: userData.isAdmin,
            role: userDataFromDb.role,
            token,
          });
        }
      } else {
        setUser(userData || { token });
      }
    } catch (error) {
      console.error("❌ Error during login:", error);
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUser(null);
    window.location.reload();
  };

  // ✅ Update user locally & in localStorage
  const updateUser = (updatedData) => {
    setUser((prev) => {
      const newUser = { ...prev, ...updatedData };
      localStorage.setItem("userData", JSON.stringify(newUser)); // Sync with localStorage
      return newUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
