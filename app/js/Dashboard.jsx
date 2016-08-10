import React from 'react'
import { Link } from 'react-router'
import { Button, Menu, Icon, Row, Col } from 'antd';
import './../less/dashboard.less'
const Dashboard = React.createClass({
  render() {
    return (
      <div>
          <Row>
              <Col span={4}>
                  <Menu mode="inline" style={{minHeight:800}}>
                      <Menu.Item key="1"><Link to="/about">About</Link></Menu.Item>
                      <Menu.Item key="2"><Link to="/person">Person</Link></Menu.Item>
                      <Menu.Item key="3"><Link to="/mapone">MapOne</Link></Menu.Item>
                      <Menu.Item key="4"><Link to="/maptwo">MapTwo</Link></Menu.Item>
                  </Menu>
              </Col>
              <Col span={20}>
                  {this.props.children}
              </Col>
          </Row>
      </div>
    )
  }
})

export default Dashboard
