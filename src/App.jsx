import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://kltoaldepxydsbelhhda.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsdG9hbGRlcHh5ZHNiZWxoaGRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNzQ3NTIsImV4cCI6MjA2NDY1MDc1Mn0.raPq7Q7kxLAFwuJvES6oKFOkSuIuJRcYf5wAkhsamLw"
);

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userData, setUserData] = useState();

  useEffect(() => {
    async function checkAuth() {
      const { data, error } = await supabase.auth.getSession();
      setUserData(data);
    }
    checkAuth();
  }, []);

  async function signUp() {
    console.log(email, password);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      alert("Error signing up!");
    } else {
      setUserData(data);
      console.log(data);
    }
  }
  async function logIn() {
    console.log(email, password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log("Error logging in.");
    } else {
      setUserData(data);
      console.log(data);
    }
  }

  async function logout() {
    const { data, error } = await supabase.auth.signOut();
    setUserData(null);
  }

  return userData?.session != null ? (
    <div>
      <h1>Hello, {userData.session.user.email}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <div>
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="text"
        placeholder="Enter your email..."
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="Choose a password..."
      />
      <button onClick={signUp}>Sign up!</button>
      <hr />
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="text"
        placeholder="Enter your email..."
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="Enter your password..."
      />
      <button onClick={logIn}>Login!</button>
    </div>
  );
}

export default App;
