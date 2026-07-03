import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../supabase/supabase";
import "./CenterList.css";

import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

const CentreList = () => {
  const [centres, setCentres] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("All");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("ASC");

  useEffect(() => {
    fetchCentres();
  }, []);

  const fetchCentres = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("health_centers")
      .select("*")
      .order("name");

    if (error) {
      console.error(error);
    } else {
      setCentres(data);
    }

    setLoading(false);
  };

  const districts = [...new Set(centres.map((c) => c.district))];

  const types = [...new Set(centres.map((c) => c.centre_type))];

  const filteredCentres = useMemo(() => {
    let data = [...centres];

    if (search) {
      data = data.filter((centre) =>
        centre.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (district !== "All") {
      data = data.filter((centre) => centre.district === district);
    }

    if (type !== "All") {
      data = data.filter((centre) => centre.centre_type === type);
    }

    if (status !== "All") {
      data = data.filter((centre) =>
        status === "Active"
          ? centre.is_active
          : !centre.is_active
      );
    }

    data.sort((a, b) =>
      sort === "ASC"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    return data;
  }, [centres, search, district, type, status, sort]);

  return (
    <div className="centre-card">
      <div className="centre-header">
        <h2>Health Centres</h2>

        <button className="add-btn">
          <FaPlus />
          Add Centre
        </button>
      </div>

      <div className="filter-section">
        <div className="search-box">
          <FaSearch />

          <input
            type="text"
            placeholder="Search Centre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option value="All">All Districts</option>

          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="All">All Types</option>

          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="ASC">Sort : Name A-Z</option>
          <option value="DESC">Name Z-A</option>
        </select>
      </div>

      <div className="table-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>District</th>
                <th>Type</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCentres.map((centre) => (
                <tr key={centre.id}>
                  <td>{centre.name}</td>

                  <td>{centre.district}</td>

                  <td>{centre.centre_type}</td>

                  <td>{centre.address}</td>

                  <td>{centre.contact_number}</td>

                  <td>
                    <span
                      className={
                        centre.is_active
                          ? "status active"
                          : "status inactive"
                      }
                    >
                      {centre.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td>
                    <button className="icon-btn edit">
                      <FaEdit />
                    </button>

                    <button className="icon-btn delete">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}

              {!filteredCentres.length && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No Health Centres Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CentreList;