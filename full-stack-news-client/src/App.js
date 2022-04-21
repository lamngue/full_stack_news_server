import React from "react";
import "./App.css";
import AllPosts from "./components/allPosts";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateNews from "./components/createNews";
import { useSelector } from "react-redux";
import { Layout, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer, Sider } = Layout;

function App() {
  const posts = useSelector((state) => state.post);
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
              <Menu.Item key="2">
                <span>Category</span>
                <Link to="/" />
              </Menu.Item>
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
                <Breadcrumb.Item>Category</Breadcrumb.Item>
                <Breadcrumb.Item></Breadcrumb.Item>
              </Breadcrumb>
              <div
                className="site-layout-background"
                style={{
                  padding: 24,
                  minHeight: 360,
                }}
              >
                <Routes>
                  <Route path="/" element={<AllPosts />} />
                  <Route path="/create" element={<CreateNews />} />
                </Routes>
              </div>
            </Content>
            <Footer
              style={{
                textAlign: "center",
              }}
            >
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
