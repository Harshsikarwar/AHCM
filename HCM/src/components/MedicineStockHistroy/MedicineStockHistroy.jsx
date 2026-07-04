import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import { supabase } from "../../supabase/supabase";
import "./MedicineStockHistroy.css";

const MedicineStockHistory = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [centreFilter, setCentreFilter] = useState("");
  const [medicineFilter, setMedicineFilter] = useState("");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);

    let query = supabase
      .from("medicine_stock_history")
      .select(`
        id,
        quantity,
        recorded_at,
        district_id,
        centre_id,
        medicine:medicine_id(
          id,
          name
        ),
        centre:centre_id(
          id,
          name
        )
      `);

    if (user.role === "DISTRICT_ADMIN") {
      query = query.eq("district_id", user.district_id);
    } else {
      query = query.eq(
        "centre_id",
        user.center_id || user.centre_id
      );
    }

    const { data, error } = await query;

    if (!error) {
      setHistory(data || []);
    }

    setLoading(false);
  };

  const centres = [
    ...new Set(
      history
        .map((item) => item.centre?.name)
        .filter(Boolean)
    ),
  ];

  const medicines = [
    ...new Set(
      history
        .map((item) => item.medicine?.name)
        .filter(Boolean)
    ),
  ];

  const filteredHistory = useMemo(() => {
    let data = [...history];

    if (search) {
      data = data.filter(
        (item) =>
          item.centre?.name
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          item.medicine?.name
            ?.toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (
      user.role === "DISTRICT_ADMIN" &&
      centreFilter
    ) {
      data = data.filter(
        (item) =>
          item.centre?.name === centreFilter
      );
    }

    if (medicineFilter) {
      data = data.filter(
        (item) =>
          item.medicine?.name ===
          medicineFilter
      );
    }

    switch (sortBy) {
      case "centre":
        data.sort((a, b) =>
          (a.centre?.name || "").localeCompare(
            b.centre?.name || ""
          )
        );
        break;

      case "medicine":
        data.sort((a, b) =>
          (a.medicine?.name || "").localeCompare(
            b.medicine?.name || ""
          )
        );
        break;

      case "quantity":
        data.sort(
          (a, b) => b.quantity - a.quantity
        );
        break;

      case "date":
        data.sort(
          (a, b) =>
            new Date(b.recorded_at) -
            new Date(a.recorded_at)
        );
        break;

      default:
        break;
    }

    return data;
  }, [
    history,
    search,
    centreFilter,
    medicineFilter,
    sortBy,
    user.role,
  ]);

  return (
    <div className="medicine-history">
      <div className="history-header">
        <h2>Medicine Stock History</h2>
      </div>

      <div className="history-filters">
        <div className="search-box">
          <FaSearch />

          <input
            type="text"
            placeholder="Search Centre or Medicine..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {user.role === "DISTRICT_ADMIN" && (
          <select
            value={centreFilter}
            onChange={(e) =>
              setCentreFilter(e.target.value)
            }
          >
            <option value="">
              All Centres
            </option>

            {centres.map((centre) => (
              <option
                key={centre}
                value={centre}
              >
                {centre}
              </option>
            ))}
          </select>
        )}

        <select
          value={medicineFilter}
          onChange={(e) =>
            setMedicineFilter(e.target.value)
          }
        >
          <option value="">
            All Medicines
          </option>

          {medicines.map((medicine) => (
            <option
              key={medicine}
              value={medicine}
            >
              {medicine}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          <option value="date">
            Sort By Date
          </option>

          {user.role ===
            "DISTRICT_ADMIN" && (
            <option value="centre">
              Sort By Centre
            </option>
          )}

          <option value="medicine">
            Sort By Medicine
          </option>

          <option value="quantity">
            Sort By Quantity
          </option>
        </select>
      </div>

      <div className="history-table">
        <table>
          <thead>
            <tr>
              {user.role ===
                "DISTRICT_ADMIN" && (
                <th>Centre</th>
              )}
              <th>Medicine</th>
              <th>Quantity</th>
              <th>Recorded Date</th>
            </tr>
          </thead>

          <tbody>
                        {loading ? (
              <tr>
                <td
                  colSpan={
                    user.role === "DISTRICT_ADMIN"
                      ? 4
                      : 3
                  }
                >
                  Loading...
                </td>
              </tr>
            ) : filteredHistory.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    user.role === "DISTRICT_ADMIN"
                      ? 4
                      : 3
                  }
                >
                  No Records Found
                </td>
              </tr>
            ) : (
              filteredHistory.map((item) => (
                <tr key={item.id}>
                  {user.role ===
                    "DISTRICT_ADMIN" && (
                    <td>{item.centre?.name}</td>
                  )}

                  <td>{item.medicine?.name}</td>

                  <td>
                    <span className="quantity-badge">
                      {item.quantity}
                    </span>
                  </td>

                  <td>
                    <div className="date-cell">
                      <FaCalendarAlt />

                      {item.recorded_at
                        ? new Date(
                            item.recorded_at
                          ).toLocaleDateString()
                        : "-"}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicineStockHistory;