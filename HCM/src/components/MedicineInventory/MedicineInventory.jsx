import { useEffect, useState } from "react";
import "./MedicineInventory.css";
import { supabase } from "../../supabase/supabase";
import { FaSearch, FaEdit, FaPlus } from "react-icons/fa";

const MedicineInventory = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMedicines();
  }, []);

  useEffect(() => {
    const filtered = medicines.filter(
      (medicine) =>
        medicine.name.toLowerCase().includes(search.toLowerCase()) ||
        medicine.unit.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredMedicines(filtered);
  }, [search, medicines]);

  const fetchMedicines = async () => {
    const { data, error } = await supabase
      .from("medicine")
      .select("*")
      .order("name");

    if (!error) {
      setMedicines(data);
      setFilteredMedicines(data);
    }
  };

  return (
    <div className="medicine-page">
      <div className="medicine-header">
        <h2>Medicine Inventory</h2>

        <button className="add-medicine-btn">
          <FaPlus />
          Add Medicine
        </button>
      </div>

      <div className="medicine-toolbar">
        <div className="medicine-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search medicine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="medicine-table">
        <table>
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Unit</th>
              <th>Minimum Stock</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMedicines.length > 0 ? (
              filteredMedicines.map((medicine) => (
                <tr key={medicine.id}>
                  <td>{medicine.name}</td>
                  <td>{medicine.unit}</td>
                  <td>{medicine.minimum_stock}</td>
                  <td>{medicine.description}</td>

                  <td>
                    <button className="action-btn update">
                      <FaEdit />
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No medicines found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicineInventory;