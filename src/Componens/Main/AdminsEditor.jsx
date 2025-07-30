import React, { useContext } from 'react';
import { Button, Popconfirm, Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { message } from 'antd';
import { Switch } from 'antd';
export default function AdminsEditor() {
  const { user, users, setUsers } = useContext(UserContext);
  const [messageApi, contextHolder] = message.useMessage();

  const onDelete = (username) => {
    setUsers(users.filter(u => u.username !== username));
    messageApi.success("Користувача видалено");
  };

  const columns = [
    {
      title: 'Імʼя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Опис',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Пароль',
      dataIndex: 'password',
      key: 'password',
     
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Дії',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Switch checked={record.role === "admin"} onChange={onChange(record)} />
          <Link to="/edit-user">
            {record.username == user.username ?
              <Button type="primary" disabled>Редагувати (не можна)</Button>
              : <Button type="primary">Редагувати</Button>
            }
          </Link>
          <Popconfirm
            title="Видалити користувача?"
            description={`Ви впевнені, що хочете видалити ${record.username}?`}
            onConfirm={() => onDelete(record.username)}
            okText="Так"
            cancelText="Ні"
          >
            {record.username === user.username ? (
              <Button danger disabled>Видалити (не можна)</Button>
            ) : (
              <Button danger>Видалити</Button>
            )}
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const onChange = (record) => (checked) => {

  const updatedUsers = users.map(u =>
    u.username === record.username
      ? { ...u, role: checked ? 'admin' : 'user' }
      : u
  );
  setUsers(updatedUsers);
  messageApi.success(`Роль користувача ${record.username} змінено`);
};
  return (

    <>
      {contextHolder}
      <h2>Список користувачів</h2>
      <Link to="/register">
        <Button type="primary" style={{ marginBottom: '16px' }}>
          Додати нового користувача
        </Button>
      </Link>
      <Table
        columns={columns}
        dataSource={users.map((u, i) => ({ ...u, key: u.username || i }))}
      />
    </>
  );
}
