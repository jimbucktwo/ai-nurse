"use client"
const severityColors = (score: number) => {
    if (score >= 8) return "bg-red-500"; // High severity
    if (score >= 5) return "bg-yellow-500"; // Medium severity
    return "bg-green-500"; // Low severity
};

export default function Diagnosis() {

    // Mock data
    const data = {
        age: 25,
        gender : "Female",
        symptoms : "Coughing, fever, fatigue",
        "pre-diagnosis" : [
            {
                name : "Covid-19",
                description : "Covid-19 is a respiratory illness caused by a virus. Symptoms include fever, coughing, sore throat, fatigue, and shortness of breath.",
                severityScore : 5,
                confidence : 0.8
            }, 
            {
                name : "Common Cold",
                description : "Infection of the upper respiratory tract caused by a virus. Symptoms include runny nose, sneezing, coughing, and sore throat.",
                severityScore : 2,
                confidence: 0.1
            },
            { 
                name: "Pneumonia", 
                description: "Severe lung infection", 
                severityScore: 9,
                confidence: 0.1
            }]
    }

    return (
        <div className="flex flex-col w-full justify-center overflow-y-scroll">
                <h1 className="flex text-3xl font-bold justify-center">Diagnosis Report</h1>
                <div className="flex flex-col items-center justify-center h-full">
                <div className="p-6 max-w-4xl mx-auto">
                    {/* Patient Details Card */}
                    <div className="card bg-base-100 shadow-xl p-6 mb-6">
                        <h2 className="card-title text-xl">Patient Details</h2>
                        <p><strong>Age:</strong> {data.age}</p>
                        <p><strong>Gender:</strong> {data.gender}</p>
                        <p><strong>Symptoms:</strong> {data.symptoms}</p>
                    </div>

                    {/* Pre-Diagnosis Cards */}
                    <h3 className="text-xl font-bold mb-4">Suggested Diagnosis</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data["pre-diagnosis"].map((item, index) => (
                            <div key={index} className="card shadow-xl">
                                <div className={`card-body rounded-lg ${severityColors(item.severityScore)}`}>
                                    <h4 className="card-title">{item.name} <span className="badge badge-neutral">{(item.confidence * 100).toFixed(0)}%</span></h4>
                                    <p><strong>Severity:</strong> {item.severityScore}</p>
                                    <p><strong>Description:</strong> {item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </div>
    )
}