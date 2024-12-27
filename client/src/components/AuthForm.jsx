import { Button, Form, Input } from "antd";

const AuthForm = ({ isLoginPage }) => {
  const handleOnFinish = async (values) => {};
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
            <Button type="primary" htmlType="submit" className="w-full">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};
export default AuthForm;
