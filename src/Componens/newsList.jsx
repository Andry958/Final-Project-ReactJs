import React, { useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { useContext } from 'react';
import { AllNewsContext } from './context/AllContext';

const columns = [
    {
        title: 'Img',
        dataIndex: 'urlToImage',
        key: 'image',
        render: (text, record) => <img src={text} alt="??" style={{ width: 100, height: 100 }} />,
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: text => <span>{text}</span>,
    },
    {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
        render: text => <a>{text}</a>,
    },
    // {
    //     title: 'Description',
    //     dataIndex: 'description',
    //     key: 'description',
    //     render: text => <span>{text}</span>,
    // },

    {
        title: 'PublsihedAt',
        dataIndex: 'publishedAt',
        key: 'publishedAt',
        render: text => <span>{text}</span>,
    },

];
// f596c55597b748049467bb00fd96ecae
const apiNews = "https://newsapi.org/v2/top-headlines?country=us&apiKey=f596c55597b748049467bb00fd96ecae"


const NewsList = () => {

    // const [news, setNews] = React.useState([]);

    // useEffect(() => {
    //     fetchNews()
    // }, []);
    const { value, setValue } = useContext(AllNewsContext);


    async function fetchNews() {
        const res = await fetch(apiNews);
        const data = await res.json();
        console.log(data);
        setNews(data.articles)
    }
    return (
        <>
            <h2>News List</h2>
            <Table columns={columns} dataSource={value} />
        </>
    )
};
export default NewsList;