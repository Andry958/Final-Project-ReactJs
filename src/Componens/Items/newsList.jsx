import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import { useContext } from 'react';
import { AllNewsContext } from '../context/AllContext';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import { message } from 'antd';

// f596c55597b748049467bb00fd96ecae
const apiNews = "https://newsapi.org/v2/top-headlines?country=us&apiKey=f596c55597b748049467bb00fd96ecae"


const NewsList = () => {

    const { value, setValue, selectedItem, setSelectedItem } = useContext(AllNewsContext);
    const { user } = useContext(UserContext);
    const [messageApi, contextHolder] = message.useMessage();

    const isAuthor = user?.role === 'author';
    const tableData = isAuthor
        ? value.filter(i => i.author === user.username)
        : value;


    const columns = [
        {
            title: 'Img',
            dataIndex: 'urlToImage',
            key: 'image',
            render: (text, record) => <img src={text} alt="??" style={{ width: 100, height: 100 }} />,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: text => <span>{text}</span>,
        },

        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: text => <span>{text}</span>,
        },

        {
            title: 'PublsihedAt',
            dataIndex: 'publishedAt',
            key: 'publishedAt',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Actions',
            // dataIndex: 'rating',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Link to="/edit">
                        <Button onClick={() => setSelectedItem(record)} type="primary">Edit News</Button>
                    </Link>
                    <Popconfirm
                        title="Delete the product"
                        description={`Are you sure to delete ${record.title}?`}
                        onConfirm={() => onDelete(record.title)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },

    ];

    function onDelete(title) {
        setValue(value.filter(i => i.title != title))
    }



    return (
        <>
            {contextHolder}
            
            {user ?
                <>
                    <Link to="/create">
                        <Button type="primary" style={{ marginBottom: '12px' }}>Create New Product</Button>
                    </Link>
                    <h2>News List</h2>
                    <Table columns={columns} dataSource={tableData.map((item, index) => ({ ...item, key: item.title || index }))} />
                </>
                :
                <h2>Login to see the news list</h2>
            }

        </>
    )
};
export default NewsList;