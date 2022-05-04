import { useEffect, useState, Suspense } from "react";
import "../App.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Layout, Menu, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { fetchCategories, logoutUser } from "../redux/action_creators";
import useWindowSize from "../utils/useWindowSize";

import { PlusSquareOutlined, ReadOutlined } from "@ant-design/icons";
// import

const { Content, Sider } = Layout;

const MainPage = () => {
  const { width } = useWindowSize();
  const [current, setCurrent] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && Object.keys(user).length === 0) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout
      className="main-layout"
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider breakpoint="md">
        <Menu
          theme="dark"
          onClick={onClick}
          defaultSelectedKeys={[current]}
          mode="inline"
        >
          <Menu.Item icon={width < 750 ? <PlusSquareOutlined /> : null} key="1">
            <span>{width >= 750 ? "Create News" : null}</span>
            <Link to="/main/create" />
          </Menu.Item>
          <Menu.SubMenu
            icon={width < 750 ? <ReadOutlined /> : null}
            key="2"
            title={
              <>
                <span>{width >= 750 ? "All Categories" : null}</span>
              </>
            }
          >
            <Menu.Item key="all">
              <Link to="/main/all-post" />
              all
            </Menu.Item>
            <Menu.Item key="sports">
              <Link to="/main/category/sports" />
              sports
            </Menu.Item>
            <Menu.Item key="business">
              <Link to="/main/category/business" />
              business
            </Menu.Item>
            <Menu.Item key="politics">
              <Link to="/main/category/politics" />
              politics
            </Menu.Item>
            <Menu.Item key="entertainment">
              <Link to="/main/category/entertainment" />
              entertainment
            </Menu.Item>
            <Menu.Item key="tech">
              <Link to="/main/category/tech" />
              tech
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainPage;
