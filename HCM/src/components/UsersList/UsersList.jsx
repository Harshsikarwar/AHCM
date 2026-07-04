import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaPlus } from "react-icons/fa";
import { supabase } from "../../supabase/supabase";
import "./UsersList.css";

const UsersList = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [centres, setCentres] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [centreFilter, setCentreFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    fetchUsers();
    fetchDistricts();
    fetchCentres();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("Users")
      .select(`
        id,
        employee_id,
        full_name,
        email,
        phone,
        role,
        is_active,
        specialization,
        created_at,
        district:district_id(name),
        centre:center_id(name)
      `);

    if (!error) {
      setUsers(data || []);
    }

    setLoading(false);
  };

  const fetchDistricts = async () => {
    const { data } = await supabase
      .from("district")
      .select("id,name")
      .order("name");

    if (data) setDistricts(data);
  };

  const fetchCentres = async () => {
    const { data } = await supabase
      .from("centre")
      .select("id,name")
      .order("name");

    if (data) setCentres(data);
  };

  const filteredUsers = useMemo(() => {
    let data = [...users];

    if (search) {
      const value = search.toLowerCase();

      data = data.filter(
        (user) =>
          user.employee_id?.toLowerCase().includes(value) ||
          user.full_name?.toLowerCase().includes(value) ||
          user.email?.toLowerCase().includes(value)
      );
    }

    if (roleFilter) {
      data = data.filter(
        (user) => user.role === roleFilter
      );
    }

    if (districtFilter) {
      data = data.filter(
        (user) =>
          user.district?.name === districtFilter
      );
    }

    if (centreFilter) {
      data = data.filter(
        (user) =>
          user.centre?.name === centreFilter
      );
    }

    if (statusFilter !== "") {
      data = data.filter(
        (user) =>
          String(user.is_active) === statusFilter
      );
    }

    switch (sortBy) {
      case "employee":
        data.sort((a, b) =>
          a.employee_id.localeCompare(
            b.employee_id
          )
        );
        break;

      case "date":
        data.sort(
          (a, b) =>
            new Date(b.created_at) -
            new Date(a.created_at)
        );
        break;

      default:
        data.sort((a, b) =>
          a.full_name.localeCompare(
            b.full_name
          )
        );
    }

    return data;
  }, [
    users,
    search,
    roleFilter,
    districtFilter,
    centreFilter,
    statusFilter,
    sortBy,
  ]);

  return (
    <div className="users-page">

      <div className="users-header">

        <div>
          <h2>Users</h2>
          <p>Manage all system users</p>
        </div>

        <button
          className="create-user-btn"
          onClick={() =>
            navigate("/users/create")
          }
        >
          <FaPlus />
          Create User
        </button>

      </div>

      <div className="users-filters">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Employee ID, Name or Email"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <select
          value={roleFilter}
          onChange={(e) =>
            setRoleFilter(e.target.value)
          }
        >
          <option value="">
            All Roles
          </option>

          <option value="DISTRICT_ADMIN">
            District Admin
          </option>

          <option value="CENTER_ADMIN">
            Center Admin
          </option>

          <option value="DOCTOR">
            Doctor
          </option>

          <option value="PHARMACIST">
            Pharmacist
          </option>

          <option value="LAB_TECHNICIAN">
            Lab Technician
          </option>

          <option value="DATA_ENTRY_OPERATOR">
            Data Entry Operator
          </option>

        </select>

        <select
          value={districtFilter}
          onChange={(e) =>
            setDistrictFilter(e.target.value)
          }
        >
          <option value="">
            All Districts
          </option>

          {districts.map((district) => (
            <option
              key={district.id}
              value={district.name}
            >
              {district.name}
            </option>
          ))}

        </select>

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
              key={centre.id}
              value={centre.name}
            >
              {centre.name}
            </option>
          ))}

        </select>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="">
            All Status
          </option>

          <option value="true">
            Active
          </option>

          <option value="false">
            Inactive
          </option>

        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          <option value="name">
            Sort by Name
          </option>

          <option value="employee">
            Sort by Employee ID
          </option>

          <option value="date">
            Sort by Created Date
          </option>

        </select>

      </div>

      <div className="users-table">

        <table>

          <thead>

            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>District</th>
              <th>Centre</th>
              <th>Specialization</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td colSpan="11">
                  Loading...
                </td>
              </tr>

            ) : filteredUsers.length === 0 ? (

              <tr>
                <td colSpan="11">
                  No Users Found
                </td>
              </tr>

            ) : (

              filteredUsers.map((user) => (

                <tr key={user.id}>

                  <td>{user.employee_id}</td>

                  <td>{user.full_name}</td>

                  <td>{user.email}</td>

                  <td>{user.phone}</td>

                  <td>{user.role}</td>

                  <td>
                    {user.district?.name || "-"}
                  </td>

                  <td>
                    {user.centre?.name || "-"}
                  </td>

                  <td>
                    {user.specialization || "-"}
                  </td>

                  <td>

                    <span
                      className={
                        user.is_active
                          ? "status active"
                          : "status inactive"
                      }
                    >
                      {user.is_active
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </td>

                  <td>
                    {new Date(
                      user.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td>

                    <div className="action-buttons">

                      <button
                        className="view-btn"
                      >
                        View
                      </button>

                      <button
                        className="edit-btn"
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                      >
                        Delete
                      </button>

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

export default UsersList;