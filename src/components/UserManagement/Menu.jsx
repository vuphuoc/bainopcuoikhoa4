import React from 'react'
import { useSelector } from 'react-redux';
import { USER_LOGIN } from '../../util/settingSystem';
import { history } from '../../util/history';
import { Dropdown } from 'antd';
import './userManagement.scss';

const menuContainer = (
    <ul className='menu__container'>
        <li className='menu__item'><a href='/accountSetting'><i class="fa fa-user-cog"></i> Account settings</a></li>
        <li className='menu__item'><a href="/changePassword"><i class="fa fa-key"></i> Change password</a></li>
        <li className='menu__item'><a href="/logout"><i class="fa fa-sign-out-alt"></i> Log out</a></li>
    </ul>
)


export default function Menu(props) {

    const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));

    if (userLogin) {
        return (
            <div className='text-right'>

                <span>Chào !, {userLogin.name}</span>
                <img src={userLogin.avatar} style={{ width: 32, height: 32, borderRadius: '50%', marginLeft: '5px' }} />
                <Dropdown overlay={menuContainer} trigger={['click', 'hover']}>

                    <a className='ant-dropdown-link' style={{ marginLeft: '5px' }}>
                        <i className="fa fa-caret-down"></i>
                    </a>
                </Dropdown>


            </div>
        )
    } else {
        history.push('/login');
    }
}
