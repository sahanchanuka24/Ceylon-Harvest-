//meke commit krnna 
//comments
//menna me wge
// therunda
//hakii nam codes danna
//chat gpt aran menna me wge

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render (
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
<React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider> 
  
);
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