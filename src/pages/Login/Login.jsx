import React from 'react'
import { Button, Input } from 'antd';
import './SignUp.scss';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LOGIN_SAGA } from '../../redux/constants/UserConst';

function Login(props) {


    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;


    return (
        <form
            onSubmit={handleSubmit}
            className='signup__container container d-flex justify-content-center align-items-center'>
            <div>
                <h3 className='text-center'>Login Cyber</h3>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor='email' />
                            <Input type="email" name='email' className="form-control" placeholder='Email' aria-describedby="emailError" onChange={handleChange} />
                            <small id="emailError" className="text-danger">{errors.email}</small>
                        </div>

                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor='passWord' />
                            <Input type="password" name='passWord' className="form-control" placeholder='Password' aria-describedby="passWordError" onChange={handleChange} />
                            <small id="passWordError" className="text-danger">{errors.passWord}</small>
                        </div>

                    </div>

                    <div className="col-12">
                        <Button type="primary" htmlType='submit'>Login</Button>
                    </div>
                </div>
            </div>

        </form >
    )
}


//wrapping Login with Formik
const LoginWithFormik = withFormik({

    //field values
    mapPropsToValues: () => ({
        email: '',
        passWord: '',

    }),

    validationSchema: Yup.object().shape({
        //validate form field
        email: Yup.string().required('Email is required!').email('Email is invalid!'),
        passWord: Yup.string().min(6, 'Password length require 6-32 characters!').max(32, 'Password length require 6-32 characters!'),

    }),

    handleChange: (e) => {
        const { name, value } = e.target;
        console.log(`name: ${name}, value: ${value}`);
    },
    //handle submit form
    handleSubmit: (values, { props, setSubmitting }) => {

        // let action = {
        //     type: USER_SIGNIN_API,
        //     userLogin: {
        //         email: values.email,
        //         password: values.password
        //     }
        // };
        props.dispatch({
            type: LOGIN_SAGA,
            userLogin: values
        })

    },

    displayName: 'Login',
})(Login);

export default connect()(LoginWithFormik);