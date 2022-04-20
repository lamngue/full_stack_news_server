import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
const { Header, Content, Footer, Sider } = Layout;
const items = [
  {
    label: 'Category',
    key: 'Category',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
      }
    ],
  }
];

const AllPosts = () => {
  const posts = useSelector(state => state.post)
  const [current, setCurrent] = React.useState('');
  const [collapsed, setCollapsed] = React.useState(false);

  const onClick = (e) => {
    setCurrent(e.key);
  };
  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };
    return (
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" onClick={onClick} defaultSelectedKeys={[current]} mode="inline" items={items} />
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
              margin: '0 16px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
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
              Bill is a cat.
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
        </Layout>
    );
}

export default AllPosts;