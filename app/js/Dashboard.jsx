import React from 'react'
import { Link } from 'react-router'
import { Button, Menu, Icon, Row, Col } from 'antd';
var $=require('../../bower_components/jquery/dist/jquery');
import './../less/dashboard.less'
import auth from './../utils/auth'
const SubMenu = Menu.SubMenu;
const Dashboard = React.createClass({
    getInitialState() {
        return {
            loggedIn: auth.loggedIn(),
            username:'lalal'
        }
    },
    componentDidMount: function () {
        var token = auth.getToken();
        $.ajax({
            url:"http://123.56.205.244:8022/api/userinfo",
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', "BEARER" + " " + token)
            },
            success: function(data){
                this.setState({
                    username:data.username
                })
            }.bind(this)
        });
    },
    render() {
      return (
          <div>
              <ul className="section-nav clearfix">
                  <li><Button type="primary" icon="logout" style={{marginTop:5}}>退出</Button></li>
                  <li><Button type="primary" icon="mail"  style={{marginTop:5}}>消息</Button></li>
                  <li><Button type="primary" icon="user"  style={{marginTop:5}}>{this.state.username}</Button></li>
              </ul>
              <Row>
                  <Col span={4}>
                      <Menu mode="inline" style={{minHeight:800}}>
                          <Menu.Item key="1"><Link to="/about"><span><Icon type="appstore" /><span>About</span></span></Link></Menu.Item>
                          <Menu.Item key="2"><Link to="/person"><span><Icon type="setting" /><span>Person</span></span></Link></Menu.Item>
                          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Map</span></span>}>
                              <Menu.Item key="3"><Link to="/mapone">MapOne</Link></Menu.Item>
                              <Menu.Item key="4"><Link to="/maptwo">MapTwo</Link></Menu.Item>
                              <Menu.Item key="5"><Link to="/mapthree">MapThree</Link></Menu.Item>
                          </SubMenu>
                      </Menu>
                  </Col>
                  <Col span={20}>
                      {this.props.children}
                  </Col>
              </Row>
          </div>
      )
    }
});

export default Dashboard
