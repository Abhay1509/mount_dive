import { API_URL } from "../api"; 

export async function signupUser(userData) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json(); // read backend response

  if (!res.ok) {
    // backend should send { message: "User already exists" } or similar
    throw new Error(data.message || "Signup failed");
  }

  return data; // { token, user }
}

export async function loginUser(userData) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json(); // read backend response

  if (!res.ok) {
    // backend should send { message: "Invalid credentials" } or similar
    throw new Error(data.message || "Login failed");
  }

  return data; // { token, user }
}
