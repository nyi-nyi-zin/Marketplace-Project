import { useEffect, useState } from "react";
import { getAllProducts } from "../../apicalls/product";
import { message } from "antd";
import { Tabs } from "antd";
import Products from "./Products";
import AddProduct from "./AddProduct";
import General from "./General";

const Index = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const getProducts = async () => {
    try {
      const response = await getAllProducts();
      if (response.isSuccess) {
        setProducts(response.productDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(
    (_) => {
      getProducts();
    },
    [activeTabKey]
  );
  const items = [
    {
      key: "1",
      label: "Products",
      children: (
        <Products
          products={products}
          setActiveTabKey={setActiveTabKey}
          setEditMode={setEditMode}
          setEditProductId={setEditProductId}
          getProducts={getProducts}
        />
      ),
    },
    {
      key: "2",
      label: "Manage Product",
      children: (
        <AddProduct
          setActiveTabKey={setActiveTabKey}
          getProducts={getProducts}
          editMode={editMode}
          editProductId={editProductId}
        />
      ),
    },
    {
      key: "3",
      label: "Notification",
      children: "Content of Tab Pane 3",
    },
    {
      key: "4",
      label: "General",
      children: <General />,
    },
  ];

  const onChangeHandler = (key) => {
    setActiveTabKey(key);
    setEditMode(false);
  };
  return (
    <Tabs
      activeKey={activeTabKey}
      onChange={(key) => onChangeHandler(key)}
      items={items}
      tabPosition="left"
      size="large"
    />
  );
};
export default Index;
