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
            username:'',
            current: '1',
            openKeys: ['1'],
            heightStyle:{
                height:"auto"
            }
        }
    },
    componentWillMount:function () {
        var mapHeight = document.documentElement.clientHeight - 40;
        this.setState({
            heightStyle:{
                height:mapHeight + 'px'
            },
        })
    },
    handleMenuClick(e) {
        this.setState({
        current: e.key,
        openKeys: e.keyPath.slice(1),
        });
    },
    onToggle(info) {
        this.setState({
        openKeys: info.open ? info.keyPath : info.keyPath.slice(1),
        });
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
    handleLogout:function () {
        auth.logout();
    },
    render() {
      return (
          <div>
              <ul className="section-nav clearfix">
                  <li id="logo"></li>
                  <li><Link to="/login"><Button type="primary" icon="logout" onClick={this.handleLogout} style={{marginTop:5,marginRight:5}}>退出</Button></Link></li>
                  <li><Button type="primary" icon="mail"  style={{marginTop:5,marginRight:5}}>消息</Button></li>
                  <li><Button type="primary" icon="user"  style={{marginTop:5,marginRight:5}}>{this.state.username}</Button></li>
              </ul>
              <Row style={{top:40}}>
                  <Col span={3}>
                      <Menu 
                            mode="inline" 
                            onClick={this.handleMenuClick}
                            style={this.state.heightStyle}
                            openKeys={this.state.openKeys}
                            onOpen={this.onToggle}
                            onClose={this.onToggle}
                            selectedKeys={[this.state.current]}

                      >
                         <SubMenu key="1" title={<span><Icon type="user" /><span>个人</span></span>}>
                              <Menu.Item key="sub11"><Link to="/person">个人中心</Link></Menu.Item>
                              <Menu.Item key="sub12"><Link to="/groundinfo">地块信息</Link></Menu.Item>
                          </SubMenu>
                          <SubMenu key="2" title={<span><Icon type="appstore-o" /><span>地块</span></span>}>
                              <Menu.Item key="sub21"><Link to="/farm">农场</Link></Menu.Item>
                              <Menu.Item key="sub22"><Link to="/area">种植面积</Link></Menu.Item>
                              <Menu.Item key="sub23"><Link to="/groundsearch">地块查询</Link></Menu.Item>
                          </SubMenu>
                          <SubMenu key="3" title={<span><Icon type="shopping-cart" /><span>作物</span></span>}>
                              <Menu.Item key="sub31"><Link to="/growth">作物长势</Link></Menu.Item>
                          </SubMenu>
                          <SubMenu key="4" title={<span><Icon type="book" /><span>农事</span></span>}>
                              <Menu.Item key="sub41"><Link to="/record">农事记录</Link></Menu.Item>
                          </SubMenu>
                          <SubMenu key="5" title={<span><Icon type="cloud-o" /><span><Link to="/weather" style={{color:'#666'}}>气象</Link></span></span>}>
                              <Menu.Item key="sub51">实时气温</Menu.Item>
                              <Menu.Item key="sub52">降水</Menu.Item>
                              <Menu.Item key="sub53">均温</Menu.Item>
                              <Menu.Item key="sub54">相对湿度</Menu.Item>
                              <Menu.Item key="sub55">历史数据</Menu.Item>
                          </SubMenu>
                          <SubMenu key="6" title={<span><Icon type="frown" /><span>病虫害</span></span>}>
                              <Menu.Item key="sub61"><Link to="/insect">晚疫病</Link></Menu.Item>
                          </SubMenu>
                      </Menu>
                  </Col>
                  <Col span={21}>
                      {this.props.children}
                  </Col>
              </Row>
          </div>
      )
    }
});

export default Dashboard
