import { Button, Card, Form, Input, Upload, message, Tabs } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import { getAuthUserApi, updateAuthUserApi } from "@/auth/api/user.api";
import { useAuth } from "@/auth/hooks/useAuth";

import { InvitePanel } from "@/workspaces/components/InvitePanel";
import { InviteUsersList } from "@/workspaces/components/InviteUsersList";
import { usePermissions } from "@/workspaces/hooks/usePermissions";

export const UserSettings = () => {
  const { user } = useAuth();
  const { canEdit } = usePermissions();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  const loadUser = async () => {
    if (!user?.id) return;

    const freshUser = await getAuthUserApi(user.id);

    form.setFieldsValue({
      name: freshUser.name,
      surname: freshUser.surname,
      email: freshUser.email,
    });

    setAvatar(freshUser.avatar || null);
  };

  useEffect(() => {
    loadUser();
  }, [user?.id]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const updated = await updateAuthUserApi(user!.id, {
        name: values.name,
        surname: values.surname,
        avatar: values.avatar || avatar || undefined,
      });

      form.setFieldsValue({
        name: updated.name,
        surname: updated.surname,
        email: updated.email,
      });

      setAvatar(updated.avatar || null);

      message.success("Profile updated!");
    } catch {
      message.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file: any) => {
      const reader = new FileReader();

      reader.onload = () => {
        setAvatar(reader.result as string);
      };

      reader.readAsDataURL(file);

      return false;
    },
  };

  return (
    <Card title="Settings" style={{ maxWidth: 700 }}>
      <Tabs
        items={[
          {
            key: "profile",
            label: "Profile",
            children: (
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item label="Avatar">
                  <Upload {...uploadProps} showUploadList={false}>
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  </Upload>

                  {avatar && (
                    <img
                      src={avatar}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        marginTop: 10,
                      }}
                    />
                  )}
                </Form.Item>

                <Form.Item name="name" label="Name">
                  <Input />
                </Form.Item>

                <Form.Item name="surname" label="Surname">
                  <Input />
                </Form.Item>

                <Form.Item name="email" label="Email">
                  <Input disabled />
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={loading}>
                  Save
                </Button>
              </Form>
            ),
          },

          ...(canEdit
            ? [
                {
                  key: "team",
                  label: "Team",
                  children: (
                    <>
                      <InvitePanel projectId={1} />
                      <div style={{ marginTop: 20 }}>
                        <InviteUsersList projectId={1} />
                      </div>
                    </>
                  ),
                },
              ]
            : []),
        ]}
      />
    </Card>
  );
};
