import React, { useState, useContext } from 'react';
import { Input, Select } from 'antd';
import { AllNewsContext } from '../context/AllContext';
import NewsCards from './NewsCards';
import { SourcesContext } from '../context/SourcesContext';
import { UserContext } from '../context/UserContext';

const { Search } = Input;

const sortOptions = [
    { value: 'title', label: 'Назва' },
    { value: 'publishedAt', label: 'Дата' },
    { value: 'author', label: 'Автор' },
];

export default function NewsByAuthor() {
    const { value } = useContext(AllNewsContext);
    const { sources } = useContext(SourcesContext);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('publishedAt');
    const [selectedSource, setSelectedSource] = useState('');
     const {user,sourcesUser } = useContext(UserContext);
    


    const filtered = sourcesUser.length === 0
        ? []
        : value.filter(news =>
            (news.title?.toLowerCase().includes(search.toLowerCase()) ||
                news.description?.toLowerCase().includes(search.toLowerCase())) &&
             
            sourcesUser.includes(news.source?.name)
        );

    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === 'publishedAt') {
            return new Date(b.publishedAt) - new Date(a.publishedAt);
        }
        if (sortBy === 'title' || sortBy === 'author') {
            return (a[sortBy] || '').localeCompare(b[sortBy] || '');
        }
        return 0;
    });

    return (
         <>
            {user ?
                <>
                    <div style={{ marginBottom: 24 }}>
            <Search
                placeholder="Пошук новин..."
                allowClear
                onChange={e => setSearch(e.target.value)}
                style={{ width: 300, marginRight: 16 }}
            />
            <Select
                value={sortBy}
                onChange={setSortBy}
                options={sortOptions}
                style={{ width: 180, marginRight: 16 }}
            />
            <Select
                value={selectedSource}
                onChange={setSelectedSource}
                options={[
                    { value: '', label: 'Всі видання' },
                    ...sources.map(src => ({ value: src, label: src }))
                ]}
                style={{ width: 180, marginRight: 16 }}
                placeholder="Виберіть видання"
            />
            {sorted.length === 0
                ? (<><h2>Новин за виданням немає</h2> <h3>Оберіть видання у модальних вікнах новин</h3></>)
                : <NewsCards customNews={sorted} />}
        </div>
                </>
                :
                <h2>Увійдіть щоб бачити інформацію</h2>
            }
        </>
    );
}