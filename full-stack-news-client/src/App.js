import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { Layout } from "antd";
import LoadingBar from "./components/loadingBar";
// import

const { Header, Content, Footer, Sider } = Layout;

const MainPageModule = lazy(() => import("./components/mainPage"));
const RegisterModule = lazy(() => import("./components/register"));
const LoginModule = lazy(() => import("./components/login"));

const AppRoutes = () =>
  useRoutes([
    { path: "/", element: <LoginModule /> },
    { path: "/register", element: <RegisterModule /> },
    { path: "/main", element: <MainPageModule /> }
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
