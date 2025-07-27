import React, { use, useContext } from 'react';
import { Breadcrumb, Layout as LayoutAntd, Menu, theme, Button } from 'antd';
import {
    DatabaseFilled,
    HomeFilled,
} from '@ant-design/icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; 


const { Header, Content, Footer } = LayoutAntd;


const Layout = () => {
    const { users, setUsers, setUser } = useContext(UserContext);
    const { sourcesUser, setSourcesUser } = useContext(UserContext);
    const { user, logout } = useContext(UserContext); 

    
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();

    const handleLogout = () => {
        const updatedUsers = users.map(u =>
        u.username === user.username
            ? { ...u, sourcesUser: sourcesUser } 
            : u
    );
        setUsers(updatedUsers);
        setUser(null); 
        setSourcesUser([]); 
        logout(); 
        navigate("/"); 
    };

    

    const items = [
        {
            key: '1',
            label: <Link to="/home">Home</Link>,
            icon: <HomeFilled />
        },
        user?.role !== 'user'  && {
            key: '2',
            label: <Link to="/newslist">News</Link>,
            icon: <DatabaseFilled />,
        },
         {
            key: '3',
            label: <Link to="/newsbyauthor">Selected Edition</Link>,
            icon: <DatabaseFilled />,
        },

    ]


    return (
        <LayoutAntd className='Layout'>
            <Header style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <div className='logo'>
                    <h2>News App</h2>
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                />
                (
                    <Button
                        type="primary"
                        style={{ position: 'absolute', right: 32, top: 16 }}
                        onClick={handleLogout}
                    >
                        Вийти
                    </Button>
                    
                ),
                (
                    <Button
                        type="primary"
                        style={{ position: 'absolute', right: 112, top: 16 }}
                        
                    >
                        <Link to= "pr">
                        Profile
                        </Link>
                    </Button>
                )
            </Header>

            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb
                    style={{ margin: '16px 0' }}
                    items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
                />
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </div>
            </Content>

            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </LayoutAntd>
    );
};
export default Layout;