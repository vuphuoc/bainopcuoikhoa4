import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, Table, Space, Form, Tag, Popconfirm } from 'antd';
import { history } from '../../util/history';
import { DELETE_USER_SAGA, EDIT_USER_SAGA, GET_LIST_USER_SAGA } from '../../redux/constants/UserConst';

const { Search } = Input;

export default function UserManagement() {

    const dispatch = useDispatch();
    const { lstUser } = useSelector(state => state.UserReducer);
    const searchRef = useRef(null);


    //state for editingRow 
    const [editingRowKey, setEditingRowKey] = useState(-1);
    //antd form state
    const [form] = Form.useForm();


    useEffect(() => {

        dispatch({
            type: GET_LIST_USER_SAGA,
            search: ''
        })
    }, [])




    const columns = [
        {
            title: 'STT',
            // dataIndex: 'stt',
            key: 'stt',
            render: (text, record, index) => Number(index) + 1
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text, record, index) => {
                if (editingRowKey == record.userId) {
                    return <Form.Item
                        name='email'
                        rules={[{
                            required: true,
                            type: 'email',
                            message: 'Email is not valid!'
                        }]}
                    >
                        <Input placeholder='Email' />
                    </Form.Item>
                } else {
                    return text;
                }
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record, index) => {
                if (editingRowKey == record.userId) {
                    return <Form.Item
                        name='name'
                        rules={[{
                            required: true,
                            message: 'User name is required!'
                        }]}
                    >
                        <Input placeholder='User name' />
                    </Form.Item>
                } else {
                    return text;
                }
            }
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: (text, record, index) => {
                if (editingRowKey == record.userId) {
                    return <Form.Item
                        name='phoneNumber'
                        rules={[{
                            required: true,
                            message: 'Phone is required!, Ex: 123 456 7890'
                        }]}
                    >
                        <Input placeholder='Phone' />
                    </Form.Item>
                } else {
                    return <Tag color="green">{text}</Tag>
                }
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => {

                if (editingRowKey == record.userId) {
                    return <Space size='middle'>
                        <Button type='primary' onClick={() => {

                            //console.log('fields value', form.getFieldsValue());
                            const { email, name, phoneNumber } = form.getFieldsValue();
                            const updatedUser = {
                                ...record,
                                id: record.userId,
                                email,
                                name,
                                phoneNumber
                            };
                            //console.log('updated user', updatedUser);
                            //dispatch API update user
                            dispatch({
                                type: EDIT_USER_SAGA,
                                updatedUser
                            });

                            setEditingRowKey(-1)

                        }}>Save</Button>
                        <Button onClick={() => setEditingRowKey(-1)}>Cancel</Button>
                    </Space>
                } else return <Space size='middle'>
                    <Button type='primary' onClick={() => {

                        setEditingRowKey(record.userId);
                        //set form fields value
                        form.setFieldsValue({
                            email: record.email,
                            name: record.name,
                            phoneNumber: record.phoneNumber
                        });

                    }}>Edit</Button>
                    <Button type='danger'>
                        <Popconfirm title="Are you sure you want to delete this user？" okText="Yes" cancelText="No" onConfirm={(e) => {
                            //dispatch API delete user
                            dispatch({
                                type: DELETE_USER_SAGA,
                                userId: record.userId
                            })
                        }}>
                            Delete
                        </Popconfirm>
                    </Button>
                </Space>


            }
        }
    ]

    return (
        <div className='container-fluid p-3'>
            <div className='row'>
                <div className="col-12">
                    <Button type='primary' onClick={() => history.push('/')}>Create User</Button>
                </div>

            </div>
            <div className="row mt-3">
                <div className="col-12">
                    <Search placeholder="Type search text and press enter" onSearch={(value) => {
                        dispatch({
                            type: GET_LIST_USER_SAGA,
                            search: value
                        })
                    }} enterButton />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-12">
                    <Form form={form} >
                        <Table columns={columns} rowKey="userId" dataSource={lstUser} />
                    </Form>
                </div>
            </div>
        </div>
    )
}
