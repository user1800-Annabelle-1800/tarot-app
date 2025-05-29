import React, { useState } from 'react';

const tarotDeck = [
  { name: "The Fool", upright: "New beginnings, innocence, spontaneity, a free spirit", reversed: "Holding back, recklessness, risk-taking" },
  { name: "The Magician", upright: "Manifestation, resourcefulness, power", reversed: "Manipulation, poor planning, untapped talents" },
  { name: "The High Priestess", upright: "Intuition, sacred knowledge, divine feminine", reversed: "Secrets, disconnected from intuition" },
  { name: "The Empress", upright: "Femininity, beauty, nature, nurturing", reversed: "Dependence, smothering, emptiness" },
  { name: "The Emperor", upright: "Authority, structure, control", reversed: "Domination, excessive control, rigidity" },
  { name: "The Hierophant", upright: "Tradition, spiritual wisdom", reversed: "Rebellion, unconventionality" },
  { name: "The Lovers", upright: "Love, harmony, relationships", reversed: "Imbalance, disharmony, conflict" },
  { name: "The Chariot", upright: "Willpower, determination, success", reversed: "Lack of direction, aggression" },
  { name: "Strength", upright: "Courage, influence, compassion", reversed: "Self-doubt, weakness, insecurity" },
  { name: "The Hermit", upright: "Soul-searching, introspection", reversed: "Loneliness, isolation" },
  { name: "Wheel of Fortune", upright: "Good luck, karma, life cycles", reversed: "Bad luck, resistance to change" },
  { name: "Justice", upright: "Fairness, truth, law", reversed: "Dishonesty, unfairness" },
  { name: "The Hanged Man", upright: "Pause, surrender, new perspective", reversed: "Delays, resistance" },
  { name: "Death", upright: "Endings, transformation", reversed: "Resistance to change, fear" },
  { name: "Temperance", upright: "Balance, moderation, patience", reversed: "Imbalance, excess" },
  { name: "The Devil", upright: "Shadow self, addiction", reversed: "Releasing limiting beliefs" },
  { name: "The Tower", upright: "Sudden change, upheaval", reversed: "Avoidance of disaster, fear of change" },
  { name: "The Star", upright: "Hope, faith, purpose", reversed: "Despair, disconnection" },
  { name: "The Moon", upright: "Illusion, intuition, dreams", reversed: "Fear, confusion" },
  { name: "The Sun", upright: "Joy, success, celebration", reversed: "Negativity, depression" },
  { name: "Judgement", upright: "Reflection, reckoning", reversed: "Self-doubt, ignoring the call" },
  { name: "The World", upright: "Completion, travel, achievement", reversed: "Lack of closure, delays" }
];


export default function App() {
  const [card, setCard] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const drawCard = () => {
    const index = Math.floor(Math.random() * tarotDeck.length);
    const reversed = Math.random() < 0.5;
    setCard(tarotDeck[index]);
    setIsReversed(reversed);
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>🔮 Tarot Reading App</h1>
      <p>Start your tarot journey here!</p>
      <button onClick={drawCard}>Draw a Card</button>

      {card && (
        <div style={{ marginTop: '2rem' }}>
          <h2>{card.name} {isReversed && "(Reversed)"}</h2>
          <p>{isReversed ? card.reversed : card.upright}</p>
        </div>
      )}
    </div>
  );
}
