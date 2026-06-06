import { Button, Card, Form, Input, Typography, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import { loginApi } from "@/auth/api/auth.api";
import { authStorage } from "@/auth/storage";

import { P } from "@/router/path";

const { Title } = Typography;

type LoginFormValues = {
  email: string;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const { user, token } = await loginApi(data);

      authStorage.setToken(token);
      authStorage.setUser(user);

      message.success("Welcome back!");

      navigate(P.DASHBOARD.INDEX);
    } catch (error) {
      message.error(error instanceof Error ? error.message : "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Title level={3}>Login</Title>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item label="Email">
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item label="Password">
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input.Password {...field} />}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={isSubmitting}>
            Login
          </Button>

          <div style={{ marginTop: 16, textAlign: "center" }}>
            No account? <Link to="/register">Register</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  card: {
    width: 400,
  },
};
