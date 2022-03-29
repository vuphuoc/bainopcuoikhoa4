import React from 'react'
import { Button, Input } from 'antd';
import './SignUp.scss';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { SIGN_UP_SAGA } from '../../redux/constants/UserConst';

function SignUp(props) {


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
                <h3 className='text-center'>Sign up</h3>
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
                        <div className="form-group">
                            <label htmlFor='name' />
                            <Input type="text" name='name' className="form-control" placeholder='User name' aria-describedby="nameError" onChange={handleChange} />
                            <small id="nameError" className="text-danger">{errors.name}</small>
                        </div>

                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor='phoneNumber' />
                            <Input type="text" name='phoneNumber' className="form-control" placeholder='Phone' aria-describedby="phoneNumberError" onChange={handleChange} />
                            <small id="phoneNumberError" className="text-danger">{errors.phoneNumber}</small>
                        </div>

                    </div>
                    <div className="col-12">
                        <Button type="primary" htmlType='submit'>Sign up</Button> Or <NavLink to='/login'>Login</NavLink>
                    </div>
                </div>
            </div>

        </form >
    )
}


//wrapping SignUp with Formik
const SignUpWithFormik = withFormik({

    //field values
    mapPropsToValues: () => ({
        email: '',
        passWord: '',
        name: '',
        phoneNumber: ''
    }),

    validationSchema: Yup.object().shape({
        //validate form field
        email: Yup.string().required('Email is required!').email('Email is invalid!'),
        passWord: Yup.string().min(6, 'Password length require 6-32 characters!').max(32, 'Password length require 6-32 characters!'),
        name: Yup.string().required('Name is required!'),
        phoneNumber: Yup.string().matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Phone number must contain number. Ex: 123 456 7890')
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
        //console.log(values);
        props.dispatch({
            type: SIGN_UP_SAGA,
            userSignUpInfo: values
        })

    },

    displayName: 'SignUp',
})(SignUp);

export default connect()(SignUpWithFormik);