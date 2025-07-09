// import React from 'react'
// import { Card } from 'antd';
// const { Meta } = Card;
// export default function CardItem({img, title, data}) {
//     return (
//         <Card
//             hoverable
//             style={{ width: 240 }}
//             cover={<img alt="?" src={img} />}
//         >
//             <Meta title={title} description={data} />
//        </Card>
//     )
// }
import React from 'react'
import { Card } from 'antd';
const { Meta } = Card;
export default function CardItem({obj, openModal}) {



    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="?" src={obj.urlToImage} />}
            onClick={openModal}
        >
            <Meta title={obj.title} description={obj.publishedAt} />
       </Card>
    )
}