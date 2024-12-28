import { Tabs } from "antd";
import Products from "./Products";
import AddProduct from "./AddProduct";

const Index = () => {
  const items = [
    {
      key: "1",
      label: "Products",
      children: <Products />,
    },
    {
      key: "2",
      label: "Add Product",
      children: <AddProduct />,
    },
    {
      key: "3",
      label: "Notification",
      children: "Content of Tab Pane 3",
    },
    {
      key: "4",
      label: "Profile",
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <Tabs defaultActiveKey="1" items={items} tabPosition="left" size="large" />
  );
};
export default Index;
