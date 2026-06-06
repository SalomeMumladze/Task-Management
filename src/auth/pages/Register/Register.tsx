import { Button, Card, Checkbox, Form, Input, Typography, message } from "antd";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";

import { registerApi } from "@/auth/api/auth.api";
import { registerSchema } from "./register.schema";
import type { RegisterSchema } from "./register.schema";
import { authStorage } from "@/auth/storage";
import { P } from "@/router/path";

const { Title } = Typography;

export const Register = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const { user, token } = await registerApi({
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
      });

      message.success("Account created");

      authStorage.setToken(token);
      authStorage.setUser(user);

      message.success("Account created");

      navigate(P.DASHBOARD.INDEX);
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Registration failed",
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <Card className="sm:w-[450px] m-4">
        <Title level={3}>Create Account</Title>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Name"
            validateStatus={errors.name ? "error" : ""}
            help={errors.name?.message}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Surname"
            validateStatus={errors.surname ? "error" : ""}
            help={errors.surname?.message}
          >
            <Controller
              name="surname"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input.Password {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            validateStatus={errors.confirmPassword ? "error" : ""}
            help={errors.confirmPassword?.message}
          >
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => <Input.Password {...field} />}
            />
          </Form.Item>

          <Form.Item
            validateStatus={errors.acceptTerms ? "error" : ""}
            help={errors.acceptTerms?.message}
          >
            <Controller
              name="acceptTerms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                >
                  I agree to Terms & Conditions
                </Checkbox>
              )}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={isSubmitting}>
            Create Account
          </Button>

          <div style={{ marginTop: 16, textAlign: "center" }}>
            Already have account? <Link to="/login">Login</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};
