import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const BASE_AUTH = "http://localhost:3005/auth/";

export default function Login() {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${BASE_AUTH}login`, {
      username: fullName || e.target.username.defaultValue,
      email: email || e.target.email.defaultValue,
    });

    if (res.status === 200) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: fullName || e.target.username.defaultValue,
          email: email || e.target.email.defaultValue,
          token: res.data.token,
        })
      );
      navigate("/main_page", { replace: true });
    }
  };

  return (
    <div className="divCenter">
      <h3>Login Page</h3>
      <form onSubmit={handleSubmit}>
        Username:{" "}
        <input
          type="text"
          id="username"
          defaultValue="Leanne Graham"
          onChange={(e) => setFullName(e.target.value)}
        />
        Password:{" "}
        <input
          type="password"
          id="password"
          defaultValue="Sincere@april.biz"
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
