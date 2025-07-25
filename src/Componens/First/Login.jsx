import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button, Form, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import validateLogin from "../validation/validateLogin";

export default function Login() {
    const { users, setUser, setSourcesUser } = useContext(UserContext);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async ({ username, password }) => {
        const validMsg = await validateLogin(username, password);

        if (!validMsg.success) {
            alert(validMsg.message);
            return;
        }

        const found = users.find(u => u.username === username && u.password === password);

        if (found) {
            const { role, sourcesUser = [] } = found;
            setSourcesUser(sourcesUser);
            setUser({ username, password, role, sourcesUser });
            navigate("/home");
        } else {
            alert("Невірний логін або пароль");
        }
    };

    return (
        <Form form={form} onFinish={onFinish} style={{ maxWidth: 400, margin: "40px auto" }}>
            <Form.Item label="Username" name="username" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">Увійти</Button>
                    <Button onClick={() => navigate("/")}>Реєстрація</Button>
                </Space>
            </Form.Item>
        </Form>
    );
}
