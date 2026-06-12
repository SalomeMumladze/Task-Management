import { Drawer, Menu } from "antd";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
  items: {
    key: string;
    icon: React.ReactNode;
    label: string;
    disabled?: boolean;
  }[];
}

export const MobileSidebar = ({ open, onClose, items }: Props) => {
  const navigate = useNavigate();

  return (
    <Drawer placement="left" open={open} onClose={onClose}>
      <Menu
        mode="inline"
        items={items}
        onClick={(item) => {
          navigate(item.key);
          onClose();
        }}
      />
    </Drawer>
  );
};
