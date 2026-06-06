import { Button, Card, Form, Input, Typography, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async () => {
    try {
      setLoading(true);
      message.success("Login successful");
      navigate("/dashboard");
    } catch (err: any) {
      message.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Title level={3}>Login</Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Invalid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              { min: 4, message: "Min 4 characters" },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>

          <div style={{ marginTop: 12 }}>
            Don’t have account? <a href="/register">Register</a>
          </div>
        </Form>
      </Card>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  card: {
    width: 380,
  },
};
