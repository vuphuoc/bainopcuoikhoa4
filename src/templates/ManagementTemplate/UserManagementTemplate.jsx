import React, { Fragment } from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { Layout } from 'antd';
import Menu from '../../components/UserManagement/Menu';
import SideBar from '../../components/UserManagement/SideBar';
import { useSelector } from 'react-redux';

const { Header, Footer, Sider, Content } = Layout;


export default function UserManagementTemplate(props) {


    //tách component từ props
    const { Component, ...restParams } = props;

    return <Route path={restParams.path} render={(propsRoute) => {
        return <Fragment>
            <div style={{ height: '100vh' }}>



                <Layout style={{ height: '100%' }}>

                    {/* SIDE BAR */}
                    <SideBar />

                    <Layout className='site-layout'>
                        <Header style={{ background: '#fff' }}>
                            {/* MENU */}

                            <Menu />
                        </Header>
                        <Content>
                            {/* MAIN */}
                            <Component {...propsRoute} />
                        </Content>

                    </Layout>
                </Layout>

            </div>

        </Fragment>
    }} />
}
