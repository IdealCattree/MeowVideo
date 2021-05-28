import React from "react";
import "./Layout.scss";
import { NavLink } from "react-router-dom";
import { Route } from "react-router";
import Home from "./Home";
import EditMovie from "./movie/EditMovie";
import AddMovie from "./movie/AddMovie";
import MovieList from "./movie/MovieList";
import { Layout, Menu } from "antd";

export default function _Layout() {
  const { Header, Sider, Content } = Layout;
  return (
    <div className="container">
      <Layout>
        <Header>
          <h1>
            <NavLink to="/">猫眼电影管理系统</NavLink>
          </h1>
        </Header>
        <Layout>
          <Sider>
            <Menu theme="dark">
              <Menu.Item key="2">
                <NavLink to="/movie">电影列表页</NavLink>
              </Menu.Item>
              <Menu.Item key="3">
                <NavLink to="/movie/add">添加电影页</NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content>
            <div className="content">
              <Route path="/" exact component={Home} />
              <Route path="/movie" exact component={MovieList} />
              <Route path="/movie/add" component={AddMovie} />
              <Route path="/movie/edit/:id" component={EditMovie} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
