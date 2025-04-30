import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
//ddd
function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/identify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResult(response.data);
    } catch (err) {
      setError('An error occurred during identification. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>Plant Disease Identification</h1>
        <p>Upload a plant image to identify diseases and get solutions</p>
      </header>
      <main className="app-main">
        <section className="upload-section">
          <form onSubmit={handleSubmit}>
            <div className="file-input-container">
              <label htmlFor="file-upload" className="custom-file-upload">
                Choose Image
              </label>
              <input 
                id="file-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
              {selectedFile && (
                <span className="file-name">{selectedFile.name}</span>
              )}
            </div>
            
            {previewUrl && (
              <div className="preview-container">
                <img src={previewUrl} alt="Preview" className="image-preview" />
              </div>
            )}
            
            <button 
              type="submit" 
              className="submit-button" 
              disabled={isLoading || !selectedFile}
            >
              {isLoading ? 'Identifying...' : 'Identify Disease'}
            </button>
          </form>
          
          {error && <p className="error-message">{error}</p>}
        </section>
        
        {result && (
          <section className="result-section">
            <div className="result-card">
              <h2>Identification Results</h2>
              <div className="result-item">
                <h3>Plant Name:</h3>
                <p>{result.plantName}</p>
              </div>
              <div className="result-item">
                <h3>Disease Name:</h3>
                <p>{result.diseaseName}</p>
              </div>
              <div className="result-item">
                <h3>Solutions:</h3>
                <ul className="solutions-list">
                  {result.solutions.map((solution, index) => (
                    <li key={index}>{solution}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;