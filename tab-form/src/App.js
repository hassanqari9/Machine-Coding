import { useState } from "react";
import "./styles.css";
import { Profile, Interest, Settings } from "./components";
import { formValidation } from "./utils/form-validation";

export default function App() {
  const [tabs, setTabs] = useState("Profile");
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    interest: "",
  });
  const [error, setError] = useState("");

  function formChange(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleSubmit() {
    const error = formValidation(form);
    setError(error);
    if (error === "") console.log(form);
  }

  function showTabs() {
    switch (tabs) {
      case "Profile":
        return <Profile form={form} onFormChange={formChange} />;
        break;
      case "Interest":
        return <Interest form={form} onFormChange={formChange} />;
        break;
      case "Settings":
        return <Settings onSubmit={handleSubmit} />;
        break;
    }
  }
  return (
    <div className="App">
      <div>
        <button onClick={() => setTabs("Profile")}>Profile</button>
        <button onClick={() => setTabs("Interest")}>Interest</button>
        <button onClick={() => setTabs("Settings")}>Settings</button>
      </div>
      {showTabs()}
      <br />
      <span className="err">{error ? error : null}</span>
    </div>
  );
}
