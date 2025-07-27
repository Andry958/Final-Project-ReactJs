import React, { useContext } from "react";
import { Card, Avatar, Button, Descriptions, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  const userr = {
    name: user.username,
    email: "ivanov@example.com",
    bio: "Розробник фронтенду, люблю React і UI/UX дизайн.",
    avatarUrl: "https://i.pravatar.cc/150?img=11",
    stats: {
      posts: 34,
      followers: 120,
      following: 45,
    },
  };

  return (
    <div style={{ padding: "24px", maxWidth: 600, margin: "0 auto" }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: "100%", alignItems: "center" }}>
          <Avatar size={120} src={userr.avatarUrl} />
          <div style={{ textAlign: "center" }}>
            <h2>{userr.name}</h2>
            <p>{userr.email}</p>
            <p>{userr.bio}</p>
            <Button icon={<EditOutlined />} type="primary">
              Редагувати профіль
            </Button>
          </div>
          <Descriptions title="Статистика" column={1}>
            <Descriptions.Item label="Пости">{userr.stats.posts}</Descriptions.Item>
            <Descriptions.Item label="Підписники">{userr.stats.followers}</Descriptions.Item>
            <Descriptions.Item label="Підписки">{userr.stats.following}</Descriptions.Item>
          </Descriptions>
        </Space>
      </Card>
    </div>
  );
};

export default Profile;
