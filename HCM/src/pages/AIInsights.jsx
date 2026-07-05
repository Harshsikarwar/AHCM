import PatientFootfallPrediction from "../components/PatientFootfallPrediction/PatientFootfallPrediction"
import ResourceRedistribution from "../components/ResourceRedistribution/ResourceRedistribution"
import '../styles/aiinsights.css'
export default function AIInsights(){
    return(
        <>
        <div className="AiCard">
            <ResourceRedistribution/>
        </div>
        <div className="AiCard">
            <PatientFootfallPrediction/>
        </div>
        </>
    )
}