import { useState } from "react";
import {
  FaUserCircle,
  FaSave,
  FaGlobe,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaIdBadge,
  FaUserTag,
} from "react-icons/fa";
import "../styles/settings.css";

const Settings = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [formData, setFormData] = useState({
    full_name: user.full_name || "",
    email: user.email || "",
    phone: user.phone || "",
    language: localStorage.getItem("language") || "English",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveSettings = () => {
    localStorage.setItem("language", formData.language);

    const updatedUser = {
      ...user,
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert("Settings saved successfully.");
  };

  return (
    <div className="settings-page">

      <div className="settings-header">

        <h2>Settings</h2>

        <p>
          Manage your profile and application preferences.
        </p>

      </div>

      <div className="settings-grid">

        <div className="profile-card">

          <div className="profile-top">

            <FaUserCircle className="profile-avatar" />

            <div>

              <h3>{user.full_name}</h3>

              <span>{user.role}</span>

            </div>

          </div>

          <div className="form-group">

            <label>

              <FaUserCircle />

              Full Name

            </label>

            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>

              <FaEnvelope />

              Email

            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>

              <FaPhone />

              Phone

            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>

              <FaIdBadge />

              Employee ID

            </label>

            <input
              type="text"
              value={user.employee_id || ""}
              disabled
            />

          </div>

          <div className="form-group">

            <label>

              <FaUserTag />

              Role

            </label>

            <input
              type="text"
              value={user.role || ""}
              disabled
            />

          </div>

        </div>

        <div className="preferences-card">

          <h3>Application Preferences</h3>

          <div className="form-group">

            <label>

              <FaGlobe />

              AI Response Language

            </label>

            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
              <option>Gujarati</option>
              <option>Tamil</option>
              <option>Telugu</option>
              <option>Kannada</option>
              <option>Punjabi</option>
            </select>

          </div>

          <button className="password-btn">

            <FaLock />

            Change Password

          </button>

          <button
            className="save-btn"
            onClick={saveSettings}
          >

            <FaSave />

            Save Changes

          </button>

        </div>

      </div>

    </div>
  );
};

export default Settings;