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