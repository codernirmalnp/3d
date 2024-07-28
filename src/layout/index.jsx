import { Link, Outlet } from "react-router-dom";

function Layout() {
    return (
      <div>
   
  
        <ul>
          <li>
            <Link to="/">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
  
        <Outlet />
      </div>
    );
  }