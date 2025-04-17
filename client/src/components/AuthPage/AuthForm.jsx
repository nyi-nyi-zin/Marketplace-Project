import { Form, Input, message } from "antd";
import { loginUser, registerUser } from "../../apicalls/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { setLoader } from "../../store/slices/loaderSlice";
import { useState } from "react"; // Add this import

const AuthForm = ({ isLoginPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localProcessing, setLocalProcessing] = useState(false); // Add local state as backup

  // Still keep Redux state for global loading state
  const { isProcessing } = useSelector((state) => state.reducer.loader);

  const handleOnFinish = async (values) => {
    // Set both the Redux state and the local state
    dispatch(setLoader(true));
    setLocalProcessing(true);

    try {
      if (isLoginPage) {
        const response = await loginUser(values);
        if (response.isSuccess) {
          message.success(response.message);
          localStorage.setItem("token", response.token);
          dispatch(setUser(response.token));
          navigate("/");
        } else {
          throw new Error(response.message);
        }
      } else {
        const response = await registerUser(values);
        if (response.isSuccess) {
          message.success(response.message);
          navigate("/login");
        } else {
          throw new Error(response.message);
        }
      }
    } catch (err) {
      message.error(err.message || "An error occurred");
    } finally {
      // Use finally to ensure this runs even if there's an error
      dispatch(setLoader(false));
      setLocalProcessing(false);
    }
  };

  // Use the local state for UI rendering as the source of truth
  const buttonIsLoading = localProcessing;

  return (
    <section className="h-screen w-full flex mt-40 justify-center">
      <div className="w-[450px]">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          POINT.IO - {isLoginPage ? "LOGIN" : "REGISTER"}
        </h1>
        <Form layout="vertical" onFinish={handleOnFinish}>
          {!isLoginPage && (
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Name must contains.",
                },
                {
                  min: 3,
                  message: "Name must have 3 characters.",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="name ..."></Input>
            </Form.Item>
          )}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Email must contains.",
              },
              {
                type: "email",
                message: "Enter a valid E-mail !",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="email ..."></Input>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Password must contains.",
              },
              {
                min: 5,
                message: "Password must have 5 characters.",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="password ..."></Input.Password>
          </Form.Item>
          <Form.Item>
            <button
              className="w-full outline-none bg-blue-600 text-white py-2 rounded-md"
              disabled={buttonIsLoading}
            >
              {isLoginPage && !buttonIsLoading && "Login"}
              {!isLoginPage && !buttonIsLoading && "Register"}
              {buttonIsLoading && isLoginPage && "Logging in ..."}
              {buttonIsLoading && !isLoginPage && "Registering ..."}
            </button>
          </Form.Item>
          <Form.Item>
            {isLoginPage ? (
              <p>
                Don't have an account?{" "}
                <Link
                  to={"/register"}
                  className="font-medium text-blue-600 hover:text-blue-600"
                >
                  Register here
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-blue-600 hover:text-blue-600"
                >
                  Login here
                </Link>
              </p>
            )}
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default AuthForm;
