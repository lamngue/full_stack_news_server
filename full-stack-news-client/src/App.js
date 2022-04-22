import React from "react";
import "./App.css";
import AllPosts from "./components/allPosts";
import ViewAPost from "./components/viewAPost";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import CreateNews from "./components/createNews";
import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const AppRoutes = () =>
  useRoutes([
    { path: "/", element: <AllPosts /> },
    { path: "/info/:title", element: <ViewAPost /> },
    { path: "/category/:type", element: <AllPosts /> },
    { path: "/create", element: <CreateNews /> },
  ]);

function App() {
  const [current, setCurrent] = React.useState("");
  const [collapsed, setCollapsed] = React.useState(false);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  return (
    <div className="App">
      <Router>
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu
              theme="dark"
              onClick={onClick}
              defaultSelectedKeys={[current]}
              mode="inline"
            >
              <Menu.Item key="1">
                <span>Create News</span>
                <Link to="/create" />
              </Menu.Item>
              <Menu.SubMenu
                key="2"
                title={
                  <>
                    <span>All Categories</span>
                  </>
                }
              >
                <Menu.Item key="all">
                  <Link to="/" />
                  all
                </Menu.Item>
                <Menu.Item key="sports">
                  <Link to="/category/sports" />
                  sports
                </Menu.Item>
                <Menu.Item key="business">
                  <Link to="/category/business" />
                  business
                </Menu.Item>
                <Menu.Item key="politics">
                  <Link to="/category/politics" />
                  politics
                </Menu.Item>
                <Menu.Item key="entertainment">
                  <Link to="/category/entertainment" />
                  entertainment
                </Menu.Item>
                <Menu.Item key="tech">
                  <Link to="/category/tech" />
                  tech
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{
                padding: 0,
              }}
            />
            <Content
              style={{
                margin: "0 16px",
              }}
            >
              <Breadcrumb
                style={{
                  margin: "16px 0",
                }}
              >
                <Breadcrumb.Item>All Categories</Breadcrumb.Item>
              </Breadcrumb>
              <div
                className="site-layout-background"
                style={{
                  padding: 24,
                  minHeight: 360,
                }}
              >
                <AppRoutes />
              </div>
            </Content>
            <Footer
              style={{
                textAlign: "center",
              }}
            >
              ©2022 Created by Lam Nguyen
            </Footer>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
