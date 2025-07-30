import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button, Form, Input, Space, Select } from "antd";
import { useNavigate } from "react-router-dom";
import validateLogin from "../validation/validateLogin";
import { AllNewsContext } from "../context/AllContext";

export default function Register() {
    const { users, setUsers, setUser, roles } = useContext(UserContext);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { setSourcesUser } = useContext(UserContext);
    const { passwordForAdmin } = useContext(AllNewsContext);

    const onFinish = async ({ name, description, email, username, password, role }) => {

        const validMsg = await validateLogin(username, password);

        if (!validMsg.success) {
            alert(validMsg.message);
            return;
        }

        let sourcesUser = [];
        setSourcesUser(sourcesUser);
        if (users.find(u => u.username === username)) {
            alert("Користувач вже існує");
            return;
        }
        if (role === "admin") {
            let password_ = prompt("Введіть пароль для адміністратора:");
            if (password_ !== passwordForAdmin) {
                alert("Невірний пароль адміністратора");
                return;
            }
            setUsers([...users, { name, description, username, password, role, sourcesUser }]);
            setUser({ name, description, email, username, role, sourcesUser });


            navigate("/home");
            return;
        }
        else {
            setUsers([...users, { name, description, username, password, role, sourcesUser }]);
            setUser({ name, description, email, username, role, sourcesUser });
            navigate("/home");
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 600, margin: "40px auto" }}
        >
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: true }]}>
                <Input style={{ height: 60 }} />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Username" name="username" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item label="Role" name="role" rules={[{ required: true }]}>
                <Select options={roles.map(r => ({ value: r, label: r }))} />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">Реєстрація</Button>
                    <Button onClick={() => navigate("/login")}>Увійти</Button>
                </Space>
            </Form.Item>
        </Form>
    );
}