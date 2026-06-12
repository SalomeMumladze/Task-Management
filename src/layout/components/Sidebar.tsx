import { Menu, Layout, Tooltip } from "antd";
import type { SiderProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

interface Props {
  sidebarOpen: boolean;
  toggleSidebar: SiderProps["onCollapse"];
  items: {
    key: string;
    icon: React.ReactNode;
    label: string;
    disabled?: boolean;
  }[];
}

export const Sidebar = ({ sidebarOpen, toggleSidebar, items }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
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
        selectedKeys={[location.pathname]}
        onClick={(item) => navigate(item.key)}
        items={items.map((item) => ({
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
  );
};
