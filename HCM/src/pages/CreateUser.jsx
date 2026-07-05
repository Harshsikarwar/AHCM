import { useEffect, useState } from "react";
import "../styles/createuser.css";
import { supabase } from "../supabase/supabase";

const CreateUser = () => {
  const [districts, setDistricts] = useState([]);
  const [centres, setCentres] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    district_id: "",
    center_id: "",
    specialization: "",
    is_active: true,
  });

  useEffect(() => {
    fetchDistricts();
    fetchCentres();
  }, []);

  const fetchDistricts = async () => {
    const { data } = await supabase
      .from("district")
      .select("*")
      .order("name");

    if (data) setDistricts(data);
  };

  const fetchCentres = async () => {
    const { data } = await supabase
      .from("health_centers")
      .select("*")
      .order("name");

    if (data) setCentres(data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "https://mysite-ngn3.onrender.com/api/auth/create-user/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Failed");
      } else {
        alert("User Created Successfully");

        setFormData({
          employee_id: "",
          full_name: "",
          email: "",
          phone: "",
          password: "",
          role: "",
          district_id: "",
          center_id: "",
          specialization: "",
          is_active: true,
        });
      }
    } catch {
      alert("Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="create-user">

      <div className="create-user-card">

        <h2>Create User</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label>Employee ID</label>

              <input
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Full Name</label>

              <input
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Role</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required>
                <option value="">Select Role</option>

                <option value="DISTRICT_ADMIN">
                    District Admin
                </option>

                <option value="CENTER_ADMIN">
                    Center Admin
                </option>

                <option value="DOCTOR">
                    Doctor
                </option>

                <option value="PHARMACIST">
                    Pharmacist
                </option>

                <option value="LAB_TECHNICIAN">
                    Lab Technician
                </option>

                <option value="DATA_ENTRY_OPERATOR">
                    Data Entry Operator
                </option>
            </select>
            </div>

            <div className="form-group">
              <label>District</label>

              <select
                name="district_id"
                value={formData.district_id}
                onChange={handleChange}
                required
              >
                <option value="">Select District</option>

                {districts.map((district) => (
                  <option
                    key={district.id}
                    value={district.id}
                  >
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Health Centre</label>

              <select
                name="center_id"
                value={formData.center_id}
                onChange={handleChange}
              >
                <option value="">Select Centre</option>

                {centres.map((centre) => (
                  <option
                    key={centre.id}
                    value={centre.id}
                  >
                    {centre.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Specialization</label>

              <input
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
              />
            </div>

            <div className="form-group checkbox-group">

              <label>

                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                />

                Active User

              </label>

            </div>

          </div>

          <button
            className="submit-btn"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create User"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateUser;