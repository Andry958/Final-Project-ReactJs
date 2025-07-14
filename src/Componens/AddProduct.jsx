import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
    Upload,
} from 'antd';

import { useMessage } from  './hooks/useMessage';
import { useContext } from 'react';
import { AllNewsContext } from './context/AllContext';
import { Link } from 'react-router-dom';
const { TextArea } = Input;

const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};



const AddProduct = () => {
    const {value, setValue} = useContext(AllNewsContext)
    const [form] = Form.useForm();
    const onSubmit = async (values) => {
        // Створюємо об'єкт з вкладеним source
        const newProduct = {
          author: values.author,
          content: values.content, // Якщо хочеш додати content, треба додати поле в форму
          description: values.description,
          publishedAt: values.publishedAt,
          source: {
            id: values.id,
            name: values.name,
          },
          title: values.title,
          url: values.url,
          urlToImage: values.urlToImage,
        };
      
        console.log(newProduct);
        setValue([newProduct, ...value]);
        form.resetFields();
      };
    return (
        <>
            {/* {contextHolder} */}
            <h2>Create New Product</h2>
            <Form
             form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
                onFinish={onSubmit}
            >
                <Form.Item label="Title" name="title">
                    <Input />
                </Form.Item>
                <Form.Item label="Author" name="author">
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <TextArea rows={3} />
                </Form.Item>
                <Form.Item label="PublishedAt" name="publishedAt">
                    <Input />
                </Form.Item>
                <h3>source</h3>
                <Form.Item label="Id" name="id">
                    <Input />
                </Form.Item>
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <h3>Url</h3>
                <Form.Item label="Url for news" name="url">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="urlToImage"
                    label="UrlToImage"
                >
                    <Input placeholder="Enter product image URL" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                        <Button htmlType="button">
                            Cancel
                        </Button>
                        <Link to="/newslist">Back</Link>
                    </Space>
                </Form.Item>
            </Form >
        </>
    );
};
export default () => <AddProduct />;