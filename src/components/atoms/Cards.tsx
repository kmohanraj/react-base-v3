import { FC } from 'react';
import 'styles/cards.scss';

type CardsType = {
  customClass?: string;
  cardData: any[];
};

const Cards: FC<CardsType> = ({ customClass, cardData }) => {
  return (
    <>
      {cardData.map((card: any) => (
        <div className='card'>
          <h4>{card.label}</h4>
          <h3>{card.amount}</h3>
          <p>Today</p>
        </div>
      ))}
    </>
  );
};
export default Cards;
