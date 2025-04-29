import React, { useState } from 'react';
import axios from 'axios';

const PlantDiagnosis = () => {
  const [file, setFile] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/api/plants/diagnose', formData);
      setDiagnosis(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="plant-diagnosis">
      <h2>Plant Disease Diagnosis</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Diagnose Plant</button>
      </form>
      {diagnosis && (
        <div className="diagnosis-result">
          <h3>Diagnosis Result:</h3>
          <p>{diagnosis.disease}</p>
          <p>{diagnosis.description}</p>
        </div>
      )}
    </div>
  );
};

export default PlantDiagnosis; 