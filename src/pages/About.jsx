import React, {useState} from 'react';

const About = () => {
    const [cardList, setCardList] = useState([
        {
            id: 1,
            text: 'head',
            img: 'https://st2.depositphotos.com/4323461/10136/v/450/depositphotos_101362218-stock-illustration-emoticon-happy-emoji-robot-head.jpg'
        },
        {
            id: 2,
            text: 'body',
            img: 'https://t3.ftcdn.net/jpg/03/27/58/70/240_F_327587022_giLMzBfX560TtUDklKQWFUpLa7GnWQd3.jpg'
        },
        {
            id: 3,
            text: 'legs',
            img: 'https://previews.123rf.com/images/rastudio/rastudio1901/rastudio190100049/114499722-mechanical-robot-legs-of-android-hand-drawn-outline-doodle-icon-biotechnology-futuristic-medicine-co.jpg'
        },
        {
            id: 4,
            text: 'head',
            img: 'https://previews.123rf.com/images/djvstock/djvstock1711/djvstock171109647/90402173-icono-de-cabeza-de-robot-de-dibujos-animados-sobre-fondo-blanco-ilustraci%C3%B3n-de-vector-de-dise%C3%B1o-colo.jpg'
        },
        {
            id: 5,
            text: 'body',
            img: 'https://t3.ftcdn.net/jpg/03/27/58/52/240_F_327585288_TKRM1EGTWxmDEsfuG7Cnt9xlt7dmdoow.jpg'
        },
        {
            id: 6,
            text: 'legs',
            img: 'https://thumbs.dreamstime.com/b/mechanical-robot-legs-android-hand-drawn-outline-doodle-icon-biotechnology-futuristic-medicine-concept-vector-sketch-136116601.jpg'
        },
        {
            id: 7,
            text: 'head',
            img: 'https://static.turbosquid.com/Preview/2014/11/10__06_15_21/RHG_p1_signat.jpg552fcd7a-a49e-43bf-bcfe-11dd89282789Large.jpg'
        },
        {
            id: 8,
            text: 'body',
            img: 'https://t3.ftcdn.net/jpg/03/27/58/76/240_F_327587607_ecUIayUOrn0aHeoKPgSOEif4cmugo5hJ.jpg'
        },
        {
            id: 9,
            text: 'legs',
            img: 'https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/c36e098ccf5028d9316e9b20fd729f2a/large.jpg'
        },
    ])
    const [robot, setRobot] = useState([
        {
            id: 11,
            text: 'head',
            img: ''
        },
        {
            id: 22,
            text: 'body',
            img: ''
        },
        {
            id: 33,
            text: 'legs',
            img: ''
        },])
    const [currentCard, setCurrentCard] = useState(null)

    function dragStartHandler(event, card) {
        setCurrentCard(card)
    }

    function dragEndHandler(event) {
        event.target.style.background = 'white'
    }

    function dragOverHandler(event) {
        event.preventDefault();
        event.target.style.background = 'lightgray'
    }

    function dropHandler(event, card) {
        event.preventDefault()
        setRobot(robot.map(c => {
            if (c.id === card.id) {
                return currentCard
            }
            if (c.id === currentCard.id) {
                return card
            }
            return c;
        }))
        setCardList(cardList.map(c => {
            if (c.id === card.id) {
                return currentCard
            }
            if (c.id === currentCard.id) {
                return card
            }
            return c;
        }))
        event.target.style.background = 'white'
        console.log(robot);
        console.log(cardList)
    }

    // const sortCards = (a, b) => {
    //     if (a.text === b.text) {
    //         return 1;
    //     } else {
    //         return -1;
    //     }
    // }
    return (
        <div className={'am'}>
            <div className={'card-container'}>
                {cardList.map(card =>
                    <div
                        onDragStart={(event => dragStartHandler(event, card))}
                        onDragLeave={(event => dragEndHandler(event))}
                        onDragEnd={(event => dragEndHandler(event))}
                        onDragOver={(event => dragOverHandler(event))}
                        onDrop={(event => dropHandler(event, card))}
                        draggable={true}
                        key={card.id}
                        className={'card'}>
                        <img src={card.img} alt="" className={'robot'}/>
                    </div>)}
            </div>
            <hr style={{margin: '15px 0'}}/>
            <div className={'card-container2'}>
                {robot.map(card =>
                    <div
                        onDragStart={(event => dragStartHandler(event, card))}
                        onDragLeave={(event => dragEndHandler(event))}
                        onDragEnd={(event => dragEndHandler(event))}
                        onDragOver={(event => dragOverHandler(event))}
                        onDrop={(event => dropHandler(event, card))}
                        draggable={true}
                        key={card.id}
                        className={'card'}>
                        <img src={card.img} alt="" className={'robot'}/>
                    </div>)}
            </div>


        </div>
    );
};

export default About;
