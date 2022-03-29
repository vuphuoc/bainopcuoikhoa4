import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import './userManagement.scss';

const { Sider } = Layout;



export default function SideBar() {

    //collapse sideBar state
    const [state, setState] = useState({
        collapsed: false,
    })


    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };

    return (
        <Sider theme='light' trigger={null} collapsible collapsed={state.collapsed} style={{ height: '100%' }}>
            <div className="logo">
                {state.collapsed ? '' : <span className='mb-0 logoTitle' style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Dashboard</span>}

                {state.collapsed ? <span className='toggleDashboard' onClick={toggle}> <i className="fa fa-align-justify"></i></span> : <span className='toggleDashboard' onClick={toggle}><i className="fa fa-arrow-left"></i></span>}
            </div>

            <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    Cyber board
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    Project management
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                    Create Project
                </Menu.Item>
                <Menu.Item key="4" icon={<UploadOutlined />}>
                    User management
                </Menu.Item>
            </Menu>
        </Sider>
    )
}
