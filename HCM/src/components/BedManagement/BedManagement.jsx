import "./BedManagement.css";
import {
  FaBed,
  FaProcedures,
  FaCheckCircle,
  FaHospital,
} from "react-icons/fa";

const wards = [
  {
    id: 1,
    ward: "ICU",
    total: 40,
    occupied: 36,
    available: 4,
  },
  {
    id: 2,
    ward: "General Ward",
    total: 120,
    occupied: 82,
    available: 38,
  },
  {
    id: 3,
    ward: "Emergency",
    total: 35,
    occupied: 30,
    available: 5,
  },
  {
    id: 4,
    ward: "Maternity",
    total: 45,
    occupied: 28,
    available: 17,
  },
];

const totalBeds = wards.reduce((a, b) => a + b.total, 0);
const occupiedBeds = wards.reduce((a, b) => a + b.occupied, 0);
const availableBeds = wards.reduce((a, b) => a + b.available, 0);

const BedManagement = () => {
  return (
    <div className="bed-page">

      <div className="bed-summary">

        <div className="bed-card total">

          <div className="bed-icon">
            <FaHospital />
          </div>

          <div>
            <h2>{totalBeds}</h2>
            <p>Total Beds</p>
          </div>

        </div>

        <div className="bed-card occupied">

          <div className="bed-icon">
            <FaProcedures />
          </div>

          <div>
            <h2>{occupiedBeds}</h2>
            <p>Occupied Beds</p>
          </div>

        </div>

        <div className="bed-card available">

          <div className="bed-icon">
            <FaCheckCircle />
          </div>

          <div>
            <h2>{availableBeds}</h2>
            <p>Available Beds</p>
          </div>

        </div>

      </div>

      <div className="bed-table-card">

        <div className="table-header">
          <h2>Ward Bed Status</h2>
        </div>

        <div className="table-container">

          <table>

            <thead>

              <tr>
                <th>Ward</th>
                <th>Total Beds</th>
                <th>Occupied</th>
                <th>Available</th>
                <th>Occupancy</th>
              </tr>

            </thead>

            <tbody>

              {wards.map((ward) => (

                <tr key={ward.id}>

                  <td>
                    <div className="ward-name">
                      <FaBed />
                      {ward.ward}
                    </div>
                  </td>

                  <td>{ward.total}</td>

                  <td>{ward.occupied}</td>

                  <td>{ward.available}</td>

                  <td>

                    <div className="progress-bar">

                      <div
                        className="progress"
                        style={{
                          width: `${(
                            (ward.occupied / ward.total) *
                            100
                          ).toFixed(0)}%`,
                        }}
                      ></div>

                    </div>

                    <span>
                      {(
                        (ward.occupied / ward.total) *
                        100
                      ).toFixed(0)}
                      %
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default BedManagement;