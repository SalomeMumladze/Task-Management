import { Layout, Menu, Tooltip, Drawer, Button } from "antd";
import {
  MenuOutlined,
  DashboardOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useNavigate, Outlet } from "react-router-dom";
import { useSidebar } from "@/ui/ui.hooks";
import { useEffect, useState } from "react";
import { P } from "@/router/path";


const { Header, Sider, Content } = Layout;

export default function AppLayout() {
  const navigate = useNavigate();
  const { sidebarOpen, toggleSidebar } = useSidebar();

  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    checkSize();
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const menuItems = [
    {
      key: P.DASHBOARD.INDEX,
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: P.PROJECTS.INDEX,
      icon: <AppstoreOutlined />,
      label: "Projects",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isMobile && (
        <Header className="flex justify-between items-center gap-4 p-4">
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: "white" }} />}
            onClick={() => setMobileOpen(true)}
          />
          <span className="text-white text-lg">TaskFlow</span>
        </Header>
      )}

      {!isMobile && (
        <Sider
          collapsible
          collapsed={!sidebarOpen}
          onCollapse={toggleSidebar}
          width={220}
        >
          <div className="text-white font-bold text-lg p-4 text-center">
            {sidebarOpen ? "TaskFlow" : "TF"}
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[window.location.pathname]}
            onClick={(item) => navigate(item.key)}
            items={menuItems.map((item) => ({
              ...item,
              icon: (
                <Tooltip title={item.label} placement="right">
                  {item.icon}
                </Tooltip>
              ),
              label: sidebarOpen ? item.label : "",
            }))}
          />
        </Sider>
      )}

      <Drawer
        placement="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Menu
          mode="inline"
          onClick={(item) => {
            navigate(item.key);
            setMobileOpen(false);
          }}
          items={menuItems}
        />
      </Drawer>

      <Layout>
        <Header className="bg-white px-4">
          Task Management System | <button>logout</button>
        </Header>

        <Content className="rounded-sm sm:p-4  p-2 bg-white sm:m-4 m-2">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
