import { CheckOutlined } from '@ant-design/icons';
import React, { useContext, useState } from 'react';
import { SourcesContext } from '../context/SourcesContext';
import { UserContext } from '../context/UserContext';
import { Button, message } from 'antd';

const modalStyles = {
    backdrop: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        background: '#fff', padding: '24px', borderRadius: '12px', maxWidth: '400px', width: '100%',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        textAlign: 'center',
    },
};

export default function NewsModal({ news, isOpen, onClose }) {
    const [messageApi, contextHolder] = message.useMessage();
    const { user, sourcesUser, setSourcesUser } = useContext(UserContext);

    if (!isOpen || !news) return null;

    const isSelected = sourcesUser?.includes(news.source?.name);
    const checkColor = isSelected ? 'green' : 'red';

    const handleCheckClick = (e) => {
    e.stopPropagation();
    if (!isSelected && news.author) {
        setSourcesUser([...sourcesUser, news.source?.name]);
        messageApi.success(`Джерело "${news.source?.name}" додано до обраного`);
    } else {
        setSourcesUser(sourcesUser.filter(author => author !== news.source?.name));
        messageApi.info(`Джерело "${news.source?.name}" видалено з обраного`);
    }
};

    return (


        <div style={modalStyles.backdrop} onClick={onClose}>
            {contextHolder}
            <div style={modalStyles.modal} onClick={e => e.stopPropagation()}>
                <img src={news.urlToImage} alt="news" style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
                <h2>{news.title}</h2>
                <p><b>Автор:</b> {news.author ?? "Невідомий"}</p>
                <p><b>Опис:</b> {news.description}</p>
                <p><b>Дата:</b> {new Date(news.publishedAt).toLocaleString()}</p>
                <p>
                    <b>Джерело:</b> {news.source.name}
                    {user
                        ?
                        <CheckOutlined
                            style={{ color: checkColor, fontSize: 20, margin: 10, cursor: 'pointer' }}
                            onClick={handleCheckClick}
                        />
                        :
                        <></>
                    }

                </p>
                <a href={news.url} target="_blank" rel="noopener noreferrer">Читати повністю</a>
                <br />
                <button onClick={onClose} style={{ marginTop: '16px' }}>Закрити</button>
            </div>
        </div>
    );
}