const TransactionNavbar = ({ handleUserInfo, userDetails }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-2">
      <div className="container-fluid  d-flex align-items-center">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link mt-1" href="/home">
              <strong>
                <h2>Walleto</h2>
              </strong>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TransactionNavbar;
