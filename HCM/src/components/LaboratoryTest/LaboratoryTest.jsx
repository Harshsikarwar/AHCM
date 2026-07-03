import "./LaboratoryTest.css";
import {
  FaFlask,
  FaVial,
  FaSearch,
  FaPlus,
} from "react-icons/fa";

const tests = [
  {
    id: 1,
    name: "Complete Blood Count",
    category: "Hematology",
    price: "₹250",
    duration: "30 min",
    available: true,
  },
  {
    id: 2,
    name: "Blood Sugar",
    category: "Biochemistry",
    price: "₹120",
    duration: "15 min",
    available: true,
  },
  {
    id: 3,
    name: "Liver Function Test",
    category: "Biochemistry",
    price: "₹550",
    duration: "1 hr",
    available: false,
  },
  {
    id: 4,
    name: "Urine Analysis",
    category: "Pathology",
    price: "₹180",
    duration: "20 min",
    available: true,
  },
];

const kits = [
  {
    id: 1,
    name: "COVID-19 Rapid Kit",
    quantity: 150,
    expiry: "10 Oct 2026",
    status: "Available",
  },
  {
    id: 2,
    name: "Malaria Test Kit",
    quantity: 45,
    expiry: "18 Aug 2026",
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Dengue NS1 Kit",
    quantity: 92,
    expiry: "22 Dec 2026",
    status: "Available",
  },
  {
    id: 4,
    name: "Pregnancy Test Kit",
    quantity: 18,
    expiry: "05 Sep 2026",
    status: "Low Stock",
  },
];

const LaboratoryTest = () => {
  return (
    <div className="lab-page">

      <div className="lab-header">

        <h2>Laboratory Management</h2>

        <button className="add-btn">
          <FaPlus />
          Add Test
        </button>

      </div>

      <div className="summary-cards">

        <div className="summary-card">

          <div className="summary-icon orange">
            <FaFlask />
          </div>

          <div>
            <h2>{tests.length}</h2>
            <p>Available Tests</p>
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-icon red">
            <FaVial />
          </div>

          <div>
            <h2>{kits.length}</h2>
            <p>Available Kits</p>
          </div>

        </div>

      </div>

      <div className="toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search test..."
          />

        </div>

        <select>
          <option>All Categories</option>
          <option>Hematology</option>
          <option>Biochemistry</option>
          <option>Pathology</option>
        </select>

      </div>

      <div className="table-card">

        <h3>Available Tests</h3>

        <div className="table-container">

          <table>

            <thead>

              <tr>
                <th>Test Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {tests.map((test) => (

                <tr key={test.id}>

                  <td>{test.name}</td>

                  <td>{test.category}</td>

                  <td>{test.price}</td>

                  <td>{test.duration}</td>

                  <td>

                    <span
                      className={
                        test.available
                          ? "status available"
                          : "status unavailable"
                      }
                    >
                      {test.available
                        ? "Available"
                        : "Unavailable"}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <div className="table-card">

        <h3>Available Kits</h3>

        <div className="table-container">

          <table>

            <thead>

              <tr>
                <th>Kit Name</th>
                <th>Quantity</th>
                <th>Expiry Date</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {kits.map((kit) => (

                <tr key={kit.id}>

                  <td>{kit.name}</td>

                  <td>{kit.quantity}</td>

                  <td>{kit.expiry}</td>

                  <td>

                    <span
                      className={`status ${kit.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {kit.status}
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

export default LaboratoryTest;