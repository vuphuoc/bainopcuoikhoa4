import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom';
import { Button, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export default function UserSignUpTemplate(props) {

    let { Component, ...restRoute } = props;
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(() => {
        window.onresize = () => {
            setSize({
                width: Math.round(window.innerWidth),
                height: Math.round(window.innerHeight)
            })
        }
    }, [])

    return (
        <Route {...restRoute} render={(propsRoute) => {
            return <>
                <Layout>
                    <Sider width={size.width / 2} style={{
                        height: window.innerHeight,
                        backgroundImage: `url(${require('../../assets/imgCyberBugs/bg_signup_login.jpg')})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    }}>

                    </Sider>
                    <Content>
                        <Component {...propsRoute} />
                    </Content>
                </Layout>

            </>
        }} />
    )
}
