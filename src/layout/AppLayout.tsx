import { Layout, Menu, Tooltip } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import { useSidebar } from "@/ui/ui.hooks";
import { DashboardOutlined, AppstoreOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

export default function AppLayout() {
  const navigate = useNavigate();
  const { sidebarOpen, toggleSidebar } = useSidebar();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={!sidebarOpen}
        onCollapse={toggleSidebar}
        width={220}
      >
        <div
          style={{
            color: "white",
            padding: 16,
            fontSize: 18,
            textAlign: "center",
          }}
        >
          {sidebarOpen ? "TaskFlow" : "TF"}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          onClick={(item) => navigate(item.key)}
          items={[
            {
              key: "/dashboard",
              icon: (
                <Tooltip title="Dashboard" placement="right">
                  <DashboardOutlined />
                </Tooltip>
              ),
              label: sidebarOpen ? "Dashboard" : "",
            },
            {
              key: "/projects",
              icon: (
                <Tooltip title="Projects" placement="right">
                  <AppstoreOutlined />
                </Tooltip>
              ),
              label: sidebarOpen ? "Projects" : "",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff" }}>Task Management System</Header>

        <Content style={{ margin: 16, padding: 16, background: "#fff" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
