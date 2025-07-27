import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button, Form, Input, Space, Select } from "antd";
import { useNavigate } from "react-router-dom";
import validateLogin from "../validation/validateLogin";

export default function Register() {
    const { users, setUsers, setUser, roles } = useContext(UserContext);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { sourcesUser, setSourcesUser } = useContext(UserContext);

    const onFinish = async ({ username, password, role }) => {

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
        setUsers([...users, { username, password, role, sourcesUser }]);
        setUser({ username, role, sourcesUser });

        fetch("https://localhost:7243/api/lr/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                role: role
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error("Register error:", error));

        console.log("Користувач зареєстрований:", users);
        navigate("/home");
    };

    return (
        <Form form={form} onFinish={onFinish} style={{ maxWidth: 400, margin: "40px auto" }}>
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