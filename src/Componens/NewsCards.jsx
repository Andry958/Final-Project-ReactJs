// import React, { useContext } from 'react'
// import { Card } from 'antd';
// import CardItem from './CardItem';
// import { AllNewsContext } from './context/AllContext';
// import { useEffect } from 'react';
// const { Meta } = Card;

// // const apiNews = "https://newsapi.org/v2/top-headlines?country=us&apiKey=f596c55597b748049467bb00fd96ecae"

// export default function NewsCards() {

//     const { value, setValue } = useContext(AllNewsContext);

//     // useEffect(() => {
//     //     fetchNews()
//     // }, []);


//     // async function fetchNews() {
//     //     const res = await fetch(apiNews);
//     //     const data = await res.json();
//     //     console.log(data);
//     //     setValue(data.articles)
//     // }

//     return (
//         <div className='divCard'>
//             {value.map((i, index) =>  <CardItem key = {index} img = {i.urlToImage} title={i.title} data={i.publishedAt}/>)}
//         </div>
//     )
// }
//--------------
import React, { useContext } from 'react'
import { Card } from 'antd';
import CardItem from './CardItem';
import { AllNewsContext } from './context/AllContext';
import { useEffect } from 'react';
import { useState } from 'react';
const { Meta } = Card;

// const apiNews = "https://newsapi.org/v2/top-headlines?country=us&apiKey=f596c55597b748049467bb00fd96ecae"

export default function NewsCards() {

    const { value, setValue } = useContext(AllNewsContext);

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    return (
        <div className='divCard'>

            {value.map((i, index) => <CardItem key={index} obj={i} openModal={openModal} />)}
            {isOpen && (
                <div style={modalStyles.backdrop}>
                    <div style={modalStyles.modal}>
                        <h2>Це спливаюче вікно</h2>
                        <button onClick={closeModal} >Закрити</button>
                    </div>
                </div>
            )}

        </div>
    )
}
const modalStyles = {
    backdrop: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
    },
    modal: {
        background: '#fff', padding: '20px', borderRadius: '8px',
    },
};