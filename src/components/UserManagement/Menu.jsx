import React from 'react'
import { useSelector } from 'react-redux';
import { USER_LOGIN } from '../../util/settingSystem';
import { history } from '../../util/history';

export default function Menu(props) {

    const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));

    if (userLogin) {
        return (
            <div className='text-right'>

                <span>Chào !, {userLogin.name}</span>
                <img src={userLogin.avatar} style={{ width: 32, height: 32, borderRadius: '50%', marginLeft: '5px' }} />
                <span style={{ marginLeft: '5px' }}><i className="fa fa-caret-down"></i></span>

            </div>
        )
    } else {
        history.push('/login');
    }
}
