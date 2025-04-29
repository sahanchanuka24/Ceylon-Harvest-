import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlantDiagnosis = () => {
  const [file, setFile] = useState(null);
  const [plantName, setPlantName] = useState('');
  const [diseaseName, setDiseaseName] = useState('');
  const [solutions, setSolutions] = useState(['']);
  const [diagnoses, setDiagnoses] = useState([]);

  // Fetch all diagnoses
  useEffect(() => {
    axios.get('http://localhost:5000/api/plants')
      .then(response => setDiagnoses(response.data))
      .catch(error => console.error(error));
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle solution input changes
  const handleSolutionChange = (index, value) => {
    const newSolutions = [...solutions];
    newSolutions[index] = value;
    setSolutions(newSolutions);
  };

  // Add new solution input
  const addSolution = () => {
    setSolutions([...solutions, '']);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('plantName', plantName);
    formData.append('diseaseName', diseaseName);
    formData.append('solutions', JSON.stringify(solutions));

    try {
      const response = await axios.post('http://localhost:5000/api/plants', formData);
      setDiagnoses([response.data, ...diagnoses]);
      // Reset form
      setFile(null);
      setPlantName('');
      setDiseaseName('');
      setSolutions(['']);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Plant Disease Diagnosis</h1>
      
      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Upload Plant Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Plant Name</label>
          <input
            type="text"
            value={plantName}
            onChange={(e) => setPlantName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Disease Name</label>
          <input
            type="text"
            value={diseaseName}
            onChange={(e) => setDiseaseName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Solutions</label>
          {solutions.map((solution, index) => (
            <input
              key={index}
              type="text"
              value={solution}
              onChange={(e) => handleSolutionChange(index, e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder={`Solution ${index + 1}`}
              required
            />
          ))}
          <button
            type="button"
            onClick={addSolution}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Solution
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit Diagnosis
        </button>
      </form>

      {/* Display Diagnoses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diagnoses.map((diagnosis) => (
          <div key={diagnosis._id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={`http://localhost:5000/${diagnosis.imageUrl}`}
              alt={diagnosis.plantName}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold">{diagnosis.plantName}</h2>
            <p className="text-gray-600 mb-2">Disease: {diagnosis.diseaseName}</p>
            <h3 className="font-semibold">Solutions:</h3>
            <ul className="list-disc pl-5">
              {diagnosis.solutions.map((solution, index) => (
                <li key={index}>{solution}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantDiagnosis;