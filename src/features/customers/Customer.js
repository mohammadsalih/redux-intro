import { useSelector } from "react-redux";

function Customer() {
  const fullName = useSelector((state) => state.customer.fullName);

  return <h2>👋 Welcome, {fullName ? fullName : "Guest"}!</h2>;
}

export default Customer;
