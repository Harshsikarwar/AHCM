import "./DoctorAttendance.css";
import {
  FaUserMd,
  FaPlus,
  FaCheckCircle,
  FaTimesCircle,
  FaHistory,
  FaSearch,
} from "react-icons/fa";

const doctors = [
  {
    id: 1,
    name: "Dr. Amit Sharma",
    specialization: "General Physician",
    status: "Present",
    checkIn: "09:02 AM",
  },
  {
    id: 2,
    name: "Dr. Priya Singh",
    specialization: "Pediatrician",
    status: "Absent",
    checkIn: "--",
  },
  {
    id: 3,
    name: "Dr. Rahul Verma",
    specialization: "Orthopedic",
    status: "Present",
    checkIn: "08:45 AM",
  },
  {
    id: 4,
    name: "Dr. Sneha Patel",
    specialization: "Gynecologist",
    status: "Present",
    checkIn: "09:15 AM",
  },
];

const DoctorAttendance = () => {
  return (
    <div className="doctor-page">

      <div className="doctor-header">

        <h2>Doctors</h2>

        <button className="create-btn">
          <FaPlus />
          Create Doctor
        </button>

      </div>

      <div className="doctor-toolbar">

        <div className="doctor-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search Doctor..."
          />
        </div>

        <select>
          <option>All Specializations</option>
          <option>General Physician</option>
          <option>Pediatrician</option>
          <option>Orthopedic</option>
          <option>Gynecologist</option>
        </select>

      </div>

      <div className="doctor-table">

        <table>

          <thead>

            <tr>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Attendance</th>
              <th>Check In</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {doctors.map((doctor) => (

              <tr key={doctor.id}>

                <td>

                  <div className="doctor-name">

                    <FaUserMd />

                    {doctor.name}

                  </div>

                </td>

                <td>{doctor.specialization}</td>

                <td>

                  <span
                    className={`attendance ${doctor.status.toLowerCase()}`}
                  >
                    {doctor.status}
                  </span>

                </td>

                <td>{doctor.checkIn}</td>

                <td>

                  <button className="present-btn">
                    <FaCheckCircle />
                    Present
                  </button>

                  <button className="absent-btn">
                    <FaTimesCircle />
                    Absent
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="history-card">

        <div className="history-title">

          <FaHistory />

          <h3>Attendance History</h3>

        </div>

        <table>

          <thead>

            <tr>
              <th>Date</th>
              <th>Doctor</th>
              <th>Status</th>
              <th>Time</th>
            </tr>

          </thead>

          <tbody>

            <tr>
              <td>02 Jul 2026</td>
              <td>Dr. Amit Sharma</td>
              <td><span className="attendance present">Present</span></td>
              <td>09:02 AM</td>
            </tr>

            <tr>
              <td>02 Jul 2026</td>
              <td>Dr. Priya Singh</td>
              <td><span className="attendance absent">Absent</span></td>
              <td>--</td>
            </tr>

            <tr>
              <td>01 Jul 2026</td>
              <td>Dr. Rahul Verma</td>
              <td><span className="attendance present">Present</span></td>
              <td>08:58 AM</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default DoctorAttendance;