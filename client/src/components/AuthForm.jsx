import { Button, Form, Input, message } from "antd";
import { registerUser, Login } from "../apicalls/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AuthForm = ({ isLoginPage }) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleOnFinish = async (values) => {
    setSubmitting(true);
    if (isLoginPage) {
      try {
        const response = await Login(values);
        if (response.isSuccess) {
          message.success(response.message);
          localStorage.setItem("token", response.token);
          navigate("/");
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        message.error(error.message);
      }
    } else {
      try {
        const response = await registerUser(values);
        if (response.isSuccess) {
          message.success(response.message);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        message.error(error.message);
      }
    }
    setSubmitting(false);
  };

  return (
    <section className="h-screen w-full flex items-center justify-center">
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
                  message: "Name is required",
                },
                {
                  min: 3,
                  message: "Name must have 3 characters",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="name..." />
            </Form.Item>
          )}

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Enter a valid email",
              },
              {
                min: 5,
                message: "Password must have 5 characters",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="email..." />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Password is required",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="password..." />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              disabled={submitting}
            >
              {isLoginPage
                ? submitting
                  ? "Logging"
                  : "Login"
                : submitting
                ? "Submitting"
                : "Register"}
            </Button>
            {isLoginPage ? (
              <p>
                Don't have an account?
                <Link to="/register" className="text-blue-600">
                  {" "}
                  Register now!
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600">
                  Login now!
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
