import { useEffect } from 'react';
import Card from "./Card";
import "../../index.css";
import { useCardStore } from '../../store/cards';
import { useAuthStore } from '../../store/auth';

const CardList = () => {
  const profile = useAuthStore((state) => state.profile);
  const { cards, getCards } = useCardStore();

  var fullName = `${profile.firstName} ${profile.lastName}`

  useEffect(() => {
    const fetchData = async () => {
      await getCards(profile.id);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="card-list">
        {cards.map((card, index) => (
          <Card key={index} {...card} fullName={fullName} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
