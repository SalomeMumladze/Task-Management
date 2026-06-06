import { Table, Button, Tag } from "antd";
import { useMembers, useRemoveMember } from "@/auth/hooks/useMembers";

export const InviteUsersList = ({ projectId }: { projectId: number }) => {
  const { data = [], isLoading } = useMembers(projectId);
  const { mutate: removeMember } = useRemoveMember(projectId);

  return (
    <Table
      rowKey="id"
      loading={isLoading}
      dataSource={data}
      columns={[
        {
          title: "Email",
          dataIndex: "email",
        },

        {
          title: "Role",
          dataIndex: "role",
          render: (role: string) => <Tag>{role}</Tag>,
        },

        {
          title: "Action",
          render: (_, record: any) => (
            <Button danger onClick={() => removeMember(record.id)}>
              Remove
            </Button>
          ),
        },
      ]}
    />
  );
};
