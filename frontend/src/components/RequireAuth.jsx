import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.type !== "renter") {
    return <Navigate to="/login" />;
  }
  
  return children;
}

export default RequireAuth;
