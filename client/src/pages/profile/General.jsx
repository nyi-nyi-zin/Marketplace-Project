import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const General = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, name, role } = useSelector((state) => state.reducer.user.user);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  };
  return (
    <section>
      <h1 className="font-bold my-2 text-3xl">General</h1>
      <p className="text-lg font-medium mb-1">Email - {email}</p>
      <p className="text-lg font-medium mb-1">Name - {name}</p>
      <p className="text-lg font-medium mb-1">Role - {role}</p>
      <button
        type="button"
        className="text-white bg-red-600 p-3 rounded-lg"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </section>
  );
};
export default General;
