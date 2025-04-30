//Hansika
//Banne adareta
//wdiya hitanna epa

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

 React.createElement(
          MenuItem,
          { onClick: handleMenuClose },
          React.createElement(
            ListItemIcon,
            null,
            React.createElement(PersonIcon, { fontSize: 'small', sx: { color: '#26580F' } })
          ),
          React.createElement(ListItemText, null, 'Profile')
        ),
        React.createElement(
          MenuItem,
          { onClick: handleLogout },
          React.createElement(
            ListItemIcon,
            null,
            React.createElement(LogoutIcon, { fontSize: 'small', sx: { color: '#26580F' } })
          ),
          React.createElement(ListItemText, null, 'Logout')
        )
      )
    )
  );
}

export default Navbar;
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ceylon Harvest</h1>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
<<<<<<< HEAD
      <main>
        <section id="home" className="hero">
          <h2>Welcome to Ceylon Harvest</h2>
          <p>Your trusted partner in farming solutions.</p>
        </section>
        <section id="about" className="about">
          <h2>About Us</h2>
          <p>We are dedicated to providing the best farming solutions for our community.</p>
        </section>
        <section id="services" className="services">
          <h2>Our Services</h2>
          <ul>
            <li>Organic Farming</li>
            <li>Agricultural Consulting</li>
            <li>Equipment Rental</li>
          </ul>
        </section>
        <section id="contact" className="contact">
          <h2>Contact Us</h2>
          <p>Email: info@ceylonharvest.com</p>
          <p>Phone: (123) 456-7890</p>
=======
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
>>>>>>> 055d1bf8b8d6033c2477ba271dd9489bd5631fac
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Ceylon Harvest. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;