import React, { useEffect, lazy, Suspense } from "react";
import "./App.css";
import AllPosts from "./components/allPosts";
import ViewAPost from "./components/viewAPost";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import CreateNews from "./components/createNews";
import { Layout, Menu } from "antd";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./redux/action_creators";
import LoadingBar from "./components/loadingBar";
import useWindowSize from "./utils/useWindowSize";
import { PlusSquareOutlined, ReadOutlined } from "@ant-design/icons";
// import

const { Header, Content, Footer, Sider } = Layout;

const AllPostModule = lazy(() => import("./components/allPosts"));
const ViewAPostModule = lazy(() => import("./components/viewAPost"));
const CreateNewsModule = lazy(() => import("./components/createNews"));

const AppRoutes = () =>
  useRoutes([
    { path: "/", element: <AllPostModule /> },
    { path: "/news/:title", element: <ViewAPostModule /> },
    { path: "/category/:type", element: <AllPostModule /> },
    { path: "/create", element: <CreateNewsModule /> },
    { path: "/edit/:id", element: <CreateNewsModule /> },
  ]);

function App() {
  const { width } = useWindowSize();
  const [current, setCurrent] = React.useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className="App">
      <Router>
        <Layout
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
              <Menu.Item
                icon={width < 750 ? <PlusSquareOutlined /> : null}
                key="1"
              >
                <span>{width >= 750 ? "Create News" : null}</span>
                <Link to="/create" />
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
                <Suspense fallback={<LoadingBar />}>
                  <AppRoutes />
                </Suspense>
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
