

const severityColors = (score) => {
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
        <div className="flex flex-col w-full justify-center">
                <h1 className="flex text-3xl font-bold justify-center">Diagnosis Report</h1>
                <div className="flex flex-col items-center justify-center h-screen ">
                    <div className="p-6 max-w-2xl mx-auto">
                        {/* User Details */}
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                            <h2 className="text-lg font-bold">Patient Details</h2>
                            <p><strong>Age:</strong> {data.age}</p>
                            <p><strong>Gender:</strong> {data.gender}</p>
                            <p><strong>Symptoms:</strong> {data.symptoms}</p>
                        </div>

                        {/* Pre-diagnosis Cards */}
                        <h3 className="text-lg font-bold mb-2">Pre-Diagnosis</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data["pre-diagnosis"].map((item, index) => (
                                <div key={index} className={`p-4 rounded-lg shadow-md ${severityColors(item.severityScore)}`}>
                                    <h4 className="text-white font-bold">{item.name} ({item.confidence * 100}%)</h4>
                                    <p className="text-white"><strong>Severity:</strong> {item.severityScore}</p>
                                    <p className="text-white"><strong>Description:</strong> {item.description}</p>
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    )
}