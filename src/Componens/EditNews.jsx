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
import { useNavigate } from 'react-router-dom';
import { useMessage } from './hooks/useMessage';
import { useContext } from 'react';
import { AllNewsContext } from './context/AllContext';
import { Link } from 'react-router-dom';
const { TextArea } = Input;

const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};



const EditNews = () => {

    const { value, setValue } = useContext(AllNewsContext)
    const { selectedItem, setSelectedItem } = useContext(AllNewsContext)
    const [form] = Form.useForm();
    const navigate = useNavigate();
    
    const onSubmit = async (item) => {
        const onSubmit = async (values) => {
            // Створюємо об'єкт з вкладеним source
           
          
            console.log(newProduct);
            setValue([newProduct, ...value]);
            form.resetFields();
          };
        console.log(item)
        setValue(prevValue => {
            const index = prevValue.findIndex(v => v.title === selectedItem.title);
            if (index === -1) {
               
                return [item, ...prevValue];
            } else {
                // Замінюємо айтем
                const newArr = [...prevValue];
                console.log( "New arr",newArr)
                item = {
                    author: item.author,
                    
                    description: item.description,
                    publishedAt: item.publishedAt,
                    source: {
                      id: item.id,
                      name: item.name,
                    },
                    title: item.title,
                    url: item.url,
                    urlToImage: item.urlToImage,
                  };
                newArr[index] = item;
                console.log("new arr index",newArr[index])
                return newArr;
            }
        });
        console.log("edit arr")
        console.log(value)

        //setValue([item, ...value])

        navigate('/newslist');
    }

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
                {console.log(selectedItem)}
                <Form.Item label="Title" name="title" initialValue={selectedItem.title}>
                    <Input />
                </Form.Item>
                <Form.Item label="Author" name="author" initialValue={selectedItem.author}>
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description" initialValue={selectedItem.description}>
                    <TextArea rows={3} />
                </Form.Item>
                <Form.Item label="PublishedAt" name="publishedAt" initialValue={selectedItem.publishedAt}>
                    <Input />
                </Form.Item>
                <h3>source</h3>
                <Form.Item label="Id" name="id" initialValue={selectedItem.source.id ?? 0}>
                    <Input />
                </Form.Item>
                <Form.Item label="Name" name="name" initialValue={selectedItem.source.name}>
                    <Input />
                </Form.Item>
                <h3>Url</h3>
                <Form.Item label="Url for news" name="url" initialValue={selectedItem.url}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="urlToImage"
                    label="UrlToImage"
                    initialValue={selectedItem.urlToImage}
                >
                    <Input placeholder="Enter product image URL" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Space>
                        
                            <Button type="primary" htmlType="submit">
                                Edit
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
export default () => <EditNews />;