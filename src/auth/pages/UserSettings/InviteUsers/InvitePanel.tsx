import { Button, Form, Input, Select, message } from "antd";
import { useInviteMember } from "@/auth/hooks/useMembers";

export const InvitePanel = ({ projectId }: { projectId: number }) => {
  const { mutate: invite, isPending } = useInviteMember(projectId);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    invite(
      {
        projectId,
        email: values.email,
        role: values.role,
      },
      {
        onSuccess: () => {
          message.success("Member invited!");
          form.resetFields();
        },
        onError: () => {
          message.error("Failed to invite member");
        },
      },
    );
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        role: "member",
      }}
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Email required" },
          { type: "email", message: "Invalid email" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="role" label="Role">
        <Select
          options={[
            { value: "owner", label: "Owner" },
            { value: "admin", label: "Admin" },
            { value: "viewer", label: "Viewer" },
          ]}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={isPending}>
        Invite
      </Button>
    </Form>
  );
};
