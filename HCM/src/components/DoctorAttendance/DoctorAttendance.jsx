import { useEffect, useMemo, useState } from "react";
import "./DoctorAttendance.css";
import {
  FaUserMd,
  FaPlus,
  FaCheckCircle,
  FaTimesCircle,
  FaHistory,
  FaSearch,
} from "react-icons/fa";
import { supabase } from "../../supabase/supabase";

const DoctorAttendance = () => {
  const [doctors, setDoctors] = useState([]);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const formatTime = (time) => {
    if (!time) return "--";

    const [hour, minute] = time.split(":");

    const h = Number(hour);

    const ampm = h >= 12 ? "PM" : "AM";

    const hr = h % 12 || 12;

    return `${hr}:${minute} ${ampm}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const fetchData = async () => {
    setLoading(true);

    const today = new Date().toISOString().split("T")[0];

    const { data: doctorData } = await supabase
      .from("Users")
      .select("*")
      .eq("role", "DOCTOR")
      .order("full_name");

    const { data: attendanceData } = await supabase
      .from("doctor_attendance")
      .select("*")
      .order("attendance_date", { ascending: false });

    const todayAttendance =
      attendanceData?.filter((item) => item.attendance_date === today) || [];

    const mergedDoctors =
      doctorData?.map((doctor) => {
        const attendance = todayAttendance.find(
          (item) => item.doctor_id === doctor.id
        );

        return {
          ...doctor,
          attendanceId: attendance?.id || null,
          status: attendance?.status || "ABSENT",
          checkIn: attendance?.check_in_time || null,
          checkOut: attendance?.check_out_time || null,
        };
      }) || [];

    const history =
      attendanceData?.map((item) => {
        const doctor = doctorData?.find((d) => d.id === item.doctor_id);

        return {
          id: item.id,
          date: item.attendance_date,
          doctor: doctor?.full_name || "-",
          status: item.status,
          time: item.check_in_time,
        };
      }) || [];

    setDoctors(mergedDoctors);

    setAttendanceHistory(history);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateAttendance = async (doctorId, status) => {
    const today = new Date().toISOString().split("T")[0];

    const currentTime = new Date().toLocaleTimeString("en-GB", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const existing = doctors.find((doctor) => doctor.id === doctorId);

    if (existing?.attendanceId) {
      await supabase
        .from("doctor_attendance")
        .update({
          status,
          check_in_time: status === "PRESENT" ? currentTime : null,
          check_out_time: null,
        })
        .eq("id", existing.attendanceId);
    } else {
      await supabase.from("doctor_attendance").insert({
        doctor_id: doctorId,
        attendance_date: today,
        status,
        check_in_time: status === "PRESENT" ? currentTime : null,
      });
    }

    fetchData();
  };

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) =>
      doctor.full_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [doctors, search]);

  if (loading) {
    return (
      <div className="doctor-page">
        <h3>Loading...</h3>
      </div>
    );
  }
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select>
          <option>All Specializations</option>
          {[...new Set(doctors.map((doctor) => doctor.specialization))]
            .filter(Boolean)
            .map((specialization) => (
              <option key={specialization}>{specialization}</option>
            ))}
        </select>
      </div>

      <div className="doctor-table">
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Attendance</th>
              <th>Check In</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredDoctors.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Doctors Found
                </td>
              </tr>
            ) : (
              filteredDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.employee_id}</td>

                  <td>
                    <div className="doctor-name">
                      <FaUserMd />
                      {doctor.full_name}
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

                  <td>{formatTime(doctor.checkIn)}</td>

                  <td>
                    <button
                      className="present-btn"
                      onClick={() =>
                        updateAttendance(doctor.id, "PRESENT")
                      }
                    >
                      <FaCheckCircle />
                      Present
                    </button>

                    <button
                      className="absent-btn"
                      onClick={() =>
                        updateAttendance(doctor.id, "ABSENT")
                      }
                    >
                      <FaTimesCircle />
                      Absent
                    </button>
                  </td>
                </tr>
              ))
            )}
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
              <th>Check In</th>
            </tr>
          </thead>

          <tbody>
            {attendanceHistory.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No Attendance History
                </td>
              </tr>
            ) : (
              attendanceHistory.map((item) => (
                <tr key={item.id}>
                  <td>{formatDate(item.date)}</td>

                  <td>{item.doctor}</td>

                  <td>
                    <span
                      className={`attendance ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>{formatTime(item.time)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAttendance;