import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // function to send data on server and recieve response from it
  async function sendData() {
    let data = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let jsonData = await data.json();
    alert(jsonData.message);
    // alert(JSON.stringify(formData))
  }

  return (
    <div>

      <h1>Sign up</h1>

      <input
        onChange={(e) =>
          setformData((prev) => ({ ...prev, name: e.target.value }))
        }
        type="name"
        name=""
        id=""
        placeholder="John"
      />
      <br />
      <br />
      <input
        onChange={(e) =>
          setformData((prev) => ({ ...prev, email: e.target.value }))
        }
        type="email"
        name=""
        id=""
        placeholder="email@gmail.com"
      />
      <br />
      <br />
      <input
        onChange={(e) =>
          setformData((prev) => ({ ...prev, password: e.target.value }))
        }
        type="password"
        name=""
        id=""
        placeholder="password"
      />
      <br />
      <br />
      <input type="submit" onClick={sendData} />
    </div>
  );
}

export default App;
