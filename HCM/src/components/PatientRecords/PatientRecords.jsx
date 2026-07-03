import "./PatientRecords.css";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";

const records = [
  {
    id: "REC-1001",
    centre: "District Hospital Raipur",
    entryDate: "03 Jul 2026",
    opd: 120,
    ipd: 38,
    total: 158,
    enteredBy: "Harsh Singh",
  },
  {
    id: "REC-1002",
    centre: "CHC Bilaspur",
    entryDate: "03 Jul 2026",
    opd: 85,
    ipd: 24,
    total: 109,
    enteredBy: "Amit Verma",
  },
  {
    id: "REC-1003",
    centre: "PHC Durg",
    entryDate: "03 Jul 2026",
    opd: 62,
    ipd: 14,
    total: 76,
    enteredBy: "Priya Singh",
  },
  {
    id: "REC-1004",
    centre: "Community Hospital Rajnandgaon",
    entryDate: "02 Jul 2026",
    opd: 96,
    ipd: 31,
    total: 127,
    enteredBy: "Rahul Patel",
  },
];

const PatientRecords = () => {
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
          />

        </div>

        <select>
          <option>All Centres</option>
          <option>District Hospital</option>
          <option>CHC</option>
          <option>PHC</option>
        </select>

        <div className="date-box">

          <FaCalendarAlt />

          <input type="date" />

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

            {records.map((record) => (

              <tr key={record.id}>

                <td>{record.id}</td>

                <td>{record.centre}</td>

                <td>{record.entryDate}</td>

                <td>{record.opd}</td>

                <td>{record.ipd}</td>

                <td>

                  <span className="patient-count">
                    {record.total}
                  </span>

                </td>

                <td>{record.enteredBy}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default PatientRecords;