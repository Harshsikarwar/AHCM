import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../supabase/supabase";
import "./PatientRecords.css";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";

const PatientRecords = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [centre, setCentre] = useState("All Centres");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("patient_footfall")
      .select(`
        id,
        entry_date,
        opd_count,
        ipd_count,
        total_patients,
        health_centre:centre_id(name),
        user:entered_by(full_name)
      `)
      .order("entry_date", { ascending: false });

    if (!error) {
      setRecords(data || []);
      setFilteredRecords(data || []);
    }

    setLoading(false);
  };

  const centres = useMemo(() => {
    const unique = [
      ...new Set(
        records.map((r) => r.health_centre?.name).filter(Boolean)
      ),
    ];

    return unique;
  }, [records]);

  useEffect(() => {
    let temp = [...records];

    if (search) {
      temp = temp.filter((r) =>
        r.health_centre?.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (centre !== "All Centres") {
      temp = temp.filter(
        (r) => r.health_centre?.name === centre
      );
    }

    if (date) {
      temp = temp.filter((r) => r.entry_date === date);
    }

    setFilteredRecords(temp);
  }, [search, centre, date, records]);

  return (
    <div className="patient-records">
      <div className="records-header">
        <h2>Daily Patient Records</h2>

        <button>Add Record</button>
      </div>

      <div className="records-filter">
        <div className="search-box">
          <FaSearch />

          <input
            type="text"
            placeholder="Search Health Centre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={centre}
          onChange={(e) => setCentre(e.target.value)}
        >
          <option>All Centres</option>

          {centres.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <div className="date-box">
          <FaCalendarAlt />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="records-table">
        <table>
          <thead>
            <tr>
              <th>Record ID</th>
              <th>Health Centre</th>
              <th>Entry Date</th>
              <th>OPD Count</th>
              <th>IPD Count</th>
              <th>Total Patients</th>
              <th>Entered By</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
            ) : filteredRecords.length === 0 ? (
              <tr>
                <td colSpan="7">No records found.</td>
              </tr>
            ) : (
              filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.id.slice(0, 8)}</td>

                  <td>{record.health_centre?.name}</td>

                  <td>
                    {new Date(record.entry_date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>

                  <td>{record.opd_count}</td>

                  <td>{record.ipd_count}</td>

                  <td>
                    <span className="patient-count">
                      {record.total_patients}
                    </span>
                  </td>

                  <td>{record.user?.full_name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientRecords;