import "../styles/healthcenters.css";
import CenterList from "../components/CenterList/CenterList";
import CenterDetails from "../components/CenterDetails/CenterDetails";

export default function HealthCenters() {
    const user = JSON.parse(localStorage.getItem("user"));

    const role = user?.role;

    return (
        <>
            {role === "DISTRICT_ADMIN" && (
                <>
                    <div className="HCCard">
                        <CenterList />
                    </div>

                    <div className="HCCard">
                        <CenterDetails />
                    </div>
                </>
            )}

            {role === "CENTRE_ADMIN" && (
                <div className="HCCard">
                    <CenterDetails />
                </div>
            )}

            {[
                "DOCTOR",
                "PHARMACIST",
                "LAB_TECHNICIAN",
                "DATA_ENTRY_OPERATOR",
            ].includes(role) && (
                <div className="HCCard">
                    <CenterDetails />
                </div>
            )}
        </>
    );
}
