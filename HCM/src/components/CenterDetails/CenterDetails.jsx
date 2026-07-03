import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabase";
import "./CenterDetails.css";

import {
  FaHospital,
  FaMapMarkerAlt,
  FaPhone,
  FaCheckCircle,
  FaCalendarAlt,
  FaMapPin,
  FaEdit,
} from "react-icons/fa";

const CenterDetails = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role;
  const centreId = user?.centre_id ?? user?.centreId;

  const [centres, setCentres] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCentres();
  }, []);

  const fetchCentres = async () => {
    setLoading(true);

    let query = supabase.from("health_centers").select("*");

    if (role !== "DISTRICT_ADMIN") {
      query = query.eq("id", centreId);
    }

    const { data, error } = await query.order("name");

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setCentres(data);

    if (data.length > 0) {
      setSelectedId(data[0].id);
    }

    setLoading(false);
  };

  const centre = centres.find((c) => c.id === selectedId);

  if (loading) {
    return <div className="centre-details">Loading...</div>;
  }

  if (!centre) {
    return <div className="centre-details">No Centre Found</div>;
  }

  return (
    <div className="centre-details">
      <div className="details-header">
        <h2>Health Centre Details</h2>

        {role === "DISTRICT_ADMIN" && (
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(Number(e.target.value))}
          >
            {centres.map((centre) => (
              <option key={centre.id} value={centre.id}>
                {centre.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="details-card">
        <h3>Centre Information</h3>

        <div className="details-grid">
          <div>
            <FaHospital />
            <span>Name</span>
            <p>{centre.name}</p>
          </div>

          <div>
            <FaHospital />
            <span>Centre Type</span>
            <p>{centre.centre_type}</p>
          </div>

          <div>
            <FaMapMarkerAlt />
            <span>District</span>
            <p>{centre.district}</p>
          </div>

          <div>
            <FaPhone />
            <span>Contact</span>
            <p>{centre.contact_number}</p>
          </div>

          <div>
            <FaCheckCircle />
            <span>Status</span>
            <p className={centre.is_active ? "active" : "inactive"}>
              {centre.is_active ? "Active" : "Inactive"}
            </p>
          </div>

          <div>
            <FaCalendarAlt />
            <span>Created</span>
            <p>{new Date(centre.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="details-card">
          <h3>Address</h3>

          <div className="address-box">
            <FaMapMarkerAlt />
            <p>{centre.address}</p>
          </div>
        </div>

        <div className="details-card">
          <h3>Location</h3>

          <div className="location-item">
            <FaMapPin />
            <span>Latitude</span>
            <p>{centre.latitude}</p>
          </div>

          <div className="location-item">
            <FaMapPin />
            <span>Longitude</span>
            <p>{centre.longitude}</p>
          </div>
        </div>
      </div>

      {(role === "DISTRICT_ADMIN" || role === "CENTRE_ADMIN") && (
        <button className="edit-centre-btn">
          <FaEdit />
          Edit Centre
        </button>
      )}
    </div>
  );
};

export default CenterDetails;