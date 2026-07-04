import { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { supabase } from "../../supabase/supabase";
import "./MedicineStock.css";

const MedicineStock = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [centreFilter, setCentreFilter] = useState("");
  const [medicineFilter, setMedicineFilter] = useState("");
  const [sortBy, setSortBy] = useState("centre");

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    setLoading(true);

    let query = supabase
      .from("medicine_stock")
      .select(`
        id,
        quantity,
        last_updated,
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
      query = query.eq("centre_id", user.center_id);
    }

    const { data, error } = await query;

    if (!error) {
      setStocks(data || []);
    }

    setLoading(false);
  };

  const centres = [
    ...new Set(
      stocks
        .map((item) => item.centre?.name)
        .filter(Boolean)
    ),
  ];

  const medicines = [
    ...new Set(
      stocks
        .map((item) => item.medicine?.name)
        .filter(Boolean)
    ),
  ];

  const filteredData = useMemo(() => {
    let data = [...stocks];

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

      default:
        break;
    }

    return data;
  }, [
    stocks,
    search,
    centreFilter,
    medicineFilter,
    sortBy,
    user.role,
  ]);

  return (
    <div className="medicine-stock">
      <div className="stock-header">
        <h2>Medicine Stock</h2>
      </div>

      <div className="stock-filters">
        <div className="search-box">
          <FaSearch />

          <input
            type="text"
            placeholder="Search..."
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

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {user.role ===
                "DISTRICT_ADMIN" && (
                <th>Centre</th>
              )}
              <th>Medicine</th>
              <th>Quantity</th>
              <th>Last Updated</th>
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
            ) : filteredData.length === 0 ? (
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
              filteredData.map((stock) => (
                <tr key={stock.id}>
                  {user.role ===
                    "DISTRICT_ADMIN" && (
                    <td>{stock.centre?.name}</td>
                  )}

                  <td>{stock.medicine?.name}</td>

                  <td>{stock.quantity}</td>

                  <td>
                    {stock.last_updated
                      ? new Date(
                          stock.last_updated
                        ).toLocaleString()
                      : "-"}
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

export default MedicineStock;