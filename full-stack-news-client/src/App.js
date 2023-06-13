import React, { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { Layout } from "antd";
import LoadingBar from "./components/loadingBar";
import { useDispatch, useSelector } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;

const AllPostModule = lazy(() => import("./components/allPosts"));
const ViewAPostModule = lazy(() => import("./components/viewAPost"));
const CreateNewsModule = lazy(() => import("./components/createNews"));
const MainPageModule = lazy(() => import("./components/mainPage"));
const RegisterModule = lazy(() => import("./components/register"));
const LoginModule = lazy(() => import("./components/login"));

export const AppRoutes = () =>
  useRoutes([
    { path: "/", element: <LoginModule /> },
    { path: "/register", element: <RegisterModule /> },
    {
      path: "/main/*",
      element: <MainPageModule />,
      children: [
        { path: "all-post", element: <AllPostModule /> },
        { path: "news/:title", element: <ViewAPostModule /> },
        { path: "category/:type", element: <AllPostModule /> },
        { path: "create", element: <CreateNewsModule /> },
        { path: "edit/:id", element: <CreateNewsModule /> },
      ],
    },
  ]);

function App() {
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user?.data && Object.keys(user.data).length === 0 && window.location.pathname !== "/") {
      window.location.pathname = '/';
    }
  }, [])

  return (
    <div className="App">
      <Router>
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
              <div className={Object.keys(user).length > 0 ? "container": null}>
                <h1
                  style={{
                    textAlign: "center",
                  }}
                >
                  Welcome to Full Stack News
                </h1>
              </div>
              <br />
              <Suspense fallback={<LoadingBar />}>
                <AppRoutes />
              </Suspense>
            </div>
          </Content>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
