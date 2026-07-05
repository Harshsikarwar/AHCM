import { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaHospital,
  FaChartLine,
  FaCalendarAlt,
} from "react-icons/fa";
import { supabase } from "../../supabase/supabase";
import "./HealthCenterPerformance.css";

const HealthCenterPerformance = () => {
  const [scores, setScores] = useState([]);
  const [centres, setCentres] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [centreFilter, setCentreFilter] = useState("");
  const [sortBy, setSortBy] = useState("overall");

  useEffect(() => {
    fetchPerformance();
    fetchCentres();
  }, []);

  const fetchPerformance = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("health_score")
      .select(`
        *,
        centre:centre_id(
          id,
          name
        )
      `);

    if (!error) {
      setScores(data || []);
    }

    setLoading(false);
  };

  const fetchCentres = async () => {
    const { data } = await supabase
      .from("centre")
      .select("id,name")
      .order("name");

    if (data) {
      setCentres(data);
    }
  };

  const filteredData = useMemo(() => {
    let data = [...scores];

    if (search) {
      data = data.filter((item) =>
        item.centre?.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (centreFilter) {
      data = data.filter(
        (item) => item.centre_id === centreFilter
      );
    }

    switch (sortBy) {
      case "overall":
        data.sort(
          (a, b) =>
            b.overall_score - a.overall_score
        );
        break;

      case "patient":
        data.sort(
          (a, b) =>
            b.patient_score - a.patient_score
        );
        break;

      case "medicine":
        data.sort(
          (a, b) =>
            b.medicine_score - a.medicine_score
        );
        break;

      case "attendance":
        data.sort(
          (a, b) =>
            b.attendance_score - a.attendance_score
        );
        break;

      default:
        break;
    }

    return data;
  }, [
    scores,
    search,
    centreFilter,
    sortBy,
  ]);

  const performanceBadge = (score) => {
    if (score >= 85)
      return {
        text: "Excellent",
        className: "excellent",
      };

    if (score >= 70)
      return {
        text: "Good",
        className: "good",
      };

    if (score >= 50)
      return {
        text: "Average",
        className: "average",
      };

    return {
      text: "Poor",
      className: "poor",
    };
  };

  const ScoreBar = ({ value }) => (
    <div className="score-bar">

      <div
        className="score-fill"
        style={{
          width: `${value}%`,
        }}
      />

      <span>{value}</span>

    </div>
  );

  return (
    <div className="performance-page">

      <div className="performance-header">

        <div>

          <h2>
            Health Centre Performance
          </h2>

          <p>
            Overall AI calculated
            performance scores of
            healthcare centres.
          </p>

        </div>

      </div>

      <div className="performance-filters">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Centre..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

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
              value={centre.id}
            >
              {centre.name}
            </option>

          ))}

        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          <option value="overall">
            Overall Score
          </option>

          <option value="patient">
            Patient Score
          </option>

          <option value="medicine">
            Medicine Score
          </option>

          <option value="attendance">
            Attendance Score
          </option>

        </select>

      </div>

      <div className="performance-table">

        <table>

          <thead>

            <tr>

              <th>
                Centre
              </th>

              <th>
                Medicine
              </th>

              <th>
                Attendance
              </th>

              <th>
                Beds
              </th>

              <th>
                Patients
              </th>

              <th>
                Laboratory
              </th>

              <th>
                Overall
              </th>

              <th>
                Rating
              </th>

              <th>
                Calculated
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td colSpan="9">
                  Loading...
                </td>

              </tr>

            ) : filteredData.length === 0 ? (

              <tr>

                <td colSpan="9">
                  No Data Found
                </td>

              </tr>

            ) : (

              filteredData.map((item) => {

                const badge =
                  performanceBadge(
                    item.overall_score
                  );

                return (

                  <tr
                    key={item.id}
                  >

                    <td>

                      <div className="centre-name">

                        <FaHospital />

                        <span>
                          {item.centre?.name}
                        </span>

                      </div>

                    </td>

                    <td>
                      <ScoreBar
                        value={
                          item.medicine_score
                        }
                      />
                    </td>

                    <td>
                      <ScoreBar
                        value={
                          item.attendance_score
                        }
                      />
                    </td>

                    <td>
                      <ScoreBar
                        value={
                          item.bed_score
                        }
                      />
                    </td>

                    <td>
                      <ScoreBar
                        value={
                          item.patient_score
                        }
                      />
                    </td>

                    <td>
                      <ScoreBar
                        value={
                          item.lab_score
                        }
                      />
                    </td>

                    <td>

                      <div className="overall-score">

                        <FaChartLine />

                        {item.overall_score}

                      </div>

                    </td>

                    <td>

                      <span
                        className={`performance-badge ${badge.className}`}
                      >
                        {badge.text}
                      </span>

                    </td>

                    <td>

                      <div className="date">

                        <FaCalendarAlt />

                        {new Date(
                          item.calculated_at
                        ).toLocaleDateString()}

                      </div>

                    </td>

                  </tr>

                );

              })

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default HealthCenterPerformance;