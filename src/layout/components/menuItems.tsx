import { DashboardOutlined, SettingOutlined } from "@ant-design/icons";
import { P } from "@/router/path";

export const getMenuItems = (canEdit: boolean) => [
  {
    key: P.DASHBOARD.INDEX,
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: P.SETTINGS,
    icon: <SettingOutlined />,
    label: "Settings",
    disabled: !canEdit,
  },
];
