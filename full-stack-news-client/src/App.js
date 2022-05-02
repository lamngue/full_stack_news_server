import React, { lazy, Suspense } from "react";
import "./App.css";
import { Routes } from "react-router";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { Layout } from "antd";
import LoadingBar from "./components/loadingBar";
// import

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
              <h1
                style={{
                  textAlign: "center",
                }}
              >
                Welcome to Full Stack News
              </h1>
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
      </Router>
    </div>
  );
}

export default App;
