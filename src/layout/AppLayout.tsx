import { Layout, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSidebar } from "@/ui/ui.hooks";
import { usePermissions } from "@/members/hooks/usePermissions";

import { authStorage } from "@/auth/storage";
import { P } from "@/router/path";

import { Sidebar } from "./components/Sidebar";
import { MobileSidebar } from "./components/MobileSidebar";
import { getMenuItems } from "./components/menuItems";

export default function AppLayout() {
  const navigate = useNavigate();
  const { Header, Sider, Content } = Layout;

  const { sidebarOpen, toggleSidebar } = useSidebar();
  const { canEdit } = usePermissions();

  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    checkSize();

    window.addEventListener("resize", checkSize);

    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  const menuItems = getMenuItems(canEdit);

  const handleLogout = () => {
    authStorage.clear();
    navigate(P.LOGIN);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isMobile && (
        <Header className="flex justify-between items-center gap-4 px-4">
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: "white" }} />}
            onClick={() => setMobileOpen(true)}
          />

          <span className="text-white text-lg font-semibold">TaskFlow</span>
        </Header>
      )}

      {!isMobile && (
        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          items={menuItems}
        />
      )}

      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={menuItems}
      />

      <Layout>
        <Header className="bg-white px-4 flex justify-between items-center">
          <span>Task Management System</span>

          <Button danger onClick={handleLogout}>
            Logout
          </Button>
        </Header>

        <Content className="bg-white rounded-sm sm:m-4 m-2 sm:p-4 p-2">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
