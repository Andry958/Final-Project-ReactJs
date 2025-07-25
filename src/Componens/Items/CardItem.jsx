import React from 'react'
import { Card } from 'antd';
const { Meta } = Card;

export default function CardItem({ obj, openModal }) {
    const isHot = (() => {
        const now = new Date();
        const published = new Date(obj.publishedAt);
        const diffHours = (now - published) / (1000 * 60 * 60);

        
        return diffHours < 25;
    })();

    return (
        <Card
            hoverable
            style={{ width: 240, position: 'relative' }}
            cover={<img alt="?" src={obj.urlToImage} />}
            onClick={openModal}
        >
            {isHot && (
                <div style={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    background: 'red',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    zIndex: 2
                }}>
                    Гаряча новина!
                </div>
            )}
            <Meta title={obj.title} description={obj.publishedAt} />
        </Card>
    )
}