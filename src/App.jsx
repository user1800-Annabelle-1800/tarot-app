import './App.css';
import React, { useState, useEffect, useRef } from 'react';

// Audio Imports
import drawSound from './assets/sounds/draw.wav';
import shuffleSound from './assets/sounds/shuffle.mp3';
import backgroundMusic from './assets/sounds/background.mp3';

// Major Arcana Tarot Cards (All PNGs)
import theFool from './assets/cards/the-fool.png';
import theMagician from './assets/cards/the-magician.png';
import theHighPriestess from './assets/cards/the-priestess.png';
import theEmpress from './assets/cards/the-empress.png';
import theEmperor from './assets/cards/the-emperor.png';
import theHierophant from './assets/cards/the-hierophant.png';
import theLovers from './assets/cards/the-lovers.png';
import theChariot from './assets/cards/the-chariot.png';
import strength from './assets/cards/strength.png';
import theHermit from './assets/cards/the-hermit.png';
import wheelOfFortune from './assets/cards/wheel-of-fortune.png';
import justice from './assets/cards/justice.png';
import theHangedMan from './assets/cards/the-hanged-man.png'; // Added missing card
import death from './assets/cards/death.png'; // JPG → PNG
import temperance from './assets/cards/temperance.png'; // JPG → PNG
import theDevil from './assets/cards/the-devil.png'; // JPG → PNG
import theTower from './assets/cards/the-tower.png'; // JPG → PNG
import theStar from './assets/cards/the-star.png'; // JPG → PNG
import theMoon from './assets/cards/the-new-moon.png'; // JPG → PNG
import theSun from './assets/cards/the-sun.png'; // JPG → PNG
import judgement from './assets/cards/judgement.png'; // JPG → PNG
import theWorld from './assets/cards/the-world.png'; // JPG → PNG

const tarotDeck = [
  {
    name: "The Fool (0)",
    image: theFool,
    upright: "New beginnings, spontaneity, adventure, innocence, a leap of faith",
    reversed: "Hesitation, recklessness, fear of the unknown, naive choices",
    expanded: {
      essence: "The sacred spark of potential. A soul unshaped by the world, led by instinct and divine trust.",
      upright: [
        "New beginnings or leap-of-faith moments",
        "Freedom and spontaneity",
        "Innocence or trust in the unknown",
        "A call to follow your soul, not your fear"
      ],
      reversed: [
        "Fear of taking a risk or being stuck in indecision",
        "Naivety or carelessness",
        "Miscalculations, poor timing",
        "Avoiding a necessary change out of fear"
      ],
      tip: "Listen to your spirit before the world gets too loud."
    }
  },
  {
    name: "The Magician (I)",
    image: theMagician,
    upright: "Manifestation, power, skill, action, using your resources",
    reversed: "Manipulation, illusion, untapped potential, trickery",
    expanded: {
      essence: "The manifestor, the bridge between thought and reality. As above, so below.",
      tip: "The power's in your hands—but only if your heart's aligned with your will"
    }
  },
  {
    name: "The High Priestess (II)",
    image: theHighPriestess,
    upright: "Intuition, mystery, sacred knowledge, the subconscious, divine feminine",
    reversed: "Secrets revealed, disconnection from intuition, shallow understanding",
    expanded: {
      essence: "Keeper of secrets, inner knowing, and moonlit truths.",
      tip: "Quiet your mind and let your knowing rise like mist off the river."
    }
  },
  {
    name: "The Empress (III)",
    image: theEmpress,
    upright: "Fertility, abundance, nurturing, beauty, creativity",
    reversed: "Smothering, creative block, dependency, imbalance in self-care",
    expanded: {
      essence: "The mother, the creatrix, the bloom of life and beauty.",
      tip: "Tend to yourself like a garden—what you water will grow."
    }
  },
  {
    name: "The Emperor (IV)",
    image: theEmperor,
    upright: "Authority, protection, logic, discipline, foundation",
    reversed: "Control issues, rigidity, domination, chaos",
    expanded: {
      essence: "Structure, stability, and the sacred father archetype.",
      tip: "Lead with honor, not fear. Strength and compassion walk hand in hand."
    }
  },
  {
    name: "The Hierophant (V)",
    image: theHierophant,
    upright: "Faith, institutions, teaching, conformity, spiritual guidance",
    reversed: "Rebellion, dogma, unorthodox paths, inner teacher",
    expanded: {
      essence: "Tradition, spiritual authority, and shared belief.",
      tip: "Sometimes spirit whispers through tradition, and sometimes it shouts from the wild woods."
    }
  },
  {
    name: "The Lovers (VI)",
    image: theLovers,
    upright: "Love, harmony, values alignment, union, meaningful decisions",
    reversed: "Imbalance, conflict, temptation, difficult choices",
    expanded: {
      essence: "Sacred union, choices of the heart, soul alignment.",
      tip: "The heart knows, but it must also be brave enough to choose."
    }
  },
  {
    name: "The Chariot (VII)",
    image: theChariot,
    upright: "Triumph, direction, control, ambition, progress",
    reversed: "Lack of control, opposition, aggression, stagnation",
    expanded: {
      essence: "Willpower, movement, and victorious control.",
      tip: "Reins in hand, eyes on the horizon—your strength lies in steering both heart and mind."
    }
  },
  {
    name: "Strength (VIII)",
    image: strength,
    upright: "Bravery, resilience, compassion, quiet strength, influence through love",
    reversed: "Self-doubt, weakness, fear, repression of emotion",
    expanded: {
      essence: "Inner power, grace under pressure, courage with kindness.",
      tip: "True power whispers, not shouts. Let your love be fiercer than your fear."
    }
  },
  {
    name: "The Hermit (IX)",
    image: theHermit,
    upright: "Soul-searching, reflection, spiritual guidance, inner light",
    reversed: "Isolation, loneliness, refusing introspection, disconnection",
    expanded: {
      essence: "Solitude, wisdom, and the inner Lantern of truth.",
      tip: "Step away from the noise—sometimes the only voice worth hearin' is your own."
    }
  },
  {
    name: "Wheel of Fortune (X)",
    image: wheelOfFortune,
    upright: "Turning points, luck, change, karma, divine timing",
    reversed: "Delays, resistance to change, bad luck, lessons unlearned",
    expanded: {
      essence: "Fate, cycles, destiny's dance.",
      tip: "What rises will fall and rise again—ride the wheel with faith, not fear."
    }
  },
  {
    name: "Justice (XI)",
    image: justice,
    upright: "Integrity, accountability, legal matters, clarity, truth revealed",
    reversed: "Dishonesty, injustice, avoidance of truth, imbalance",
    expanded: {
      essence: "Truth, fairness, and karmic balance.",
      tip: "Life keeps a ledger, sugar—live true and let the scales find their balance."
    }
  },
  {
    name: "The Hanged Man (XII)",
    image: theHangedMan,
    upright: "Letting go, suspension, seeing things differently, spiritual awakening",
    reversed: "Resistance to change, martyrdom, stagnation, fear of release",
    expanded: {
      essence: "Surrender, new perspectives, sacred pause.",
      tip: "What if the stillness is the miracle? Surrender now, and wisdom will come."
    }
  },
  {
    name: "Death (XIII)",
    image: death,
    upright: "Release, transition, rebirth, closure, profound change",
    reversed: "Clinging to the past, fear of change, stagnation, resistance",
    expanded: {
      essence: "Transformation, endings that birth beginnings.",
      tip: "Ain't nothin' to fear, darlin': Death clears the path for somethin' better to grow."
    }
  },
  {
    name: "Temperance (XIV)",
    image: temperance,
    upright: "Moderation, purpose, patience, healing, blending opposites",
    reversed: "Imbalance, excess, conflict, poor timing",
    expanded: {
      essence: "Balance, harmony, and divine timing.",
      tip: "Stir your spirit like sweet tea—slow, steady, and just the right amount of everything."
    }
  },
  {
    name: "The Devil (XV)",
    image: theDevil,
    upright: "Addiction, materialism, unhealthy attachments, illusions",
    reversed: "Breaking free, reclaiming power, detachment, awareness",
    expanded: {
      essence: "Temptation, bondage, and shadow desires.",
      tip: "That chain around your neck? It might just be unlocked. Look again, sugar."
    }
  },
  {
    name: "The Tower (XVI)",
    image: theTower,
    upright: "Upheaval, chaos, truth exposed, forced transformation",
    reversed: "Fear of change, clinging to false structures, delayed upheaval",
    expanded: {
      essence: "Sudden change, revelation, and divine destruction.",
      tip: "Sometimes the storm tears down what was never meant to last—and that's your chance to rebuild true."
    }
  },
  {
    name: "The Star (XVII)",
    image: theStar,
    upright: "Renewal, faith, peace, healing, purpose",
    reversed: "Despair, lack of faith, disconnection, missed opportunities",
    expanded: {
      essence: "Hope, inspiration, and spiritual clarity.",
      tip: "Even when the night is darkest, your star still shines. Trust that light."
    }
  },
  {
    name: "The Moon (XVIII)",
    image: theMoon,
    upright: "Intuition, mystery, subconscious fears, confusion",
    reversed: "Clarity, truth surfacing, overcoming deception",
    expanded: {
      essence: "Illusion, dreams, and hidden depths.",
      tip: "When the path feels foggy, walk slow and let your instincts guide you."
    }
  },
  {
    name: "The Sun (XIX)",
    image: theSun,
    upright: "Happiness, positivity, success, abundance, clarity",
    reversed: "Delayed gratification, burnout, clouded joy",
    expanded: {
      essence: "Joy, vitality, and radiant success.",
      tip: "Let your light shine, sugar. Don't dim for no one, not even the clouds."
    }
  },
  {
    name: "Judgement (XX)",
    image: judgement,
    upright: "Self-evaluation, inner calling, renewal, absolution",
    reversed: "Doubt, avoidance, fear of change, stalling transformation",
    expanded: {
      essence: "Awakening, reckoning, and soulful rebirth.",
      tip: "The past calls not to haunt, but to heal. Answer the call, sweet soul."
    }
  },
  {
    name: "The World (XXI)",
    image: theWorld,
    upright: "Fulfillment, achievement, unity, travel, celebration of a journey",
    reversed: "Incompletion, delays, unfinished business, lack of closure",
    expanded: {
      essence: "Completion, wholeness, and triumphant closure.",
      tip: "You've walked the spiral path and come full circle. Celebrate, then begin anew."
    }
  }
];

export default function App() {
  const [cards, setCards] = useState([]);
  const [musicOn, setMusicOn] = useState(true);
  const [sfxOn, setSfxOn] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);

  const bgAudioRef = useRef(null);

  useEffect(() => {
    if (!bgAudioRef.current) {
      bgAudioRef.current = new Audio(backgroundMusic);
      bgAudioRef.current.loop = true;
      bgAudioRef.current.volume = 0.3;
    }
    if (musicOn) {
      bgAudioRef.current.play().catch(e => console.log("Music play blocked:", e));
    } else {
      bgAudioRef.current.pause();
      bgAudioRef.current.currentTime = 0;
    }
    return () => {
      bgAudioRef.current?.pause();
    };
  }, [musicOn]);

  useEffect(() => {
    if (sfxOn) {
      const shuffle = new Audio(shuffleSound);
      shuffle.play().catch(e => console.log("Shuffle blocked:", e));
    }
  }, [sfxOn]);

  const drawCards = () => {
    const selected = [];
    const usedIndices = new Set();

    while (selected.length < 3) {
      const index = Math.floor(Math.random() * tarotDeck.length);
      if (!usedIndices.has(index)) {
        usedIndices.add(index);
        const card = tarotDeck[index];
        const isReversed = Math.random() < 0.5;
        selected.push({ ...card, isReversed });
      }
    }

    setCards(selected);

    if (sfxOn) {
      const draw = new Audio(drawSound);
      draw.play();
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>🔮 Miss Annabelle's Tarot</h1>
      <p>Begin your 3-card reading</p>

      <div style={{ marginBottom: '1.5rem' }}>
        <h3>🎛️ Settings</h3>
        <label style={{ marginRight: '1rem' }}>
          <input type="checkbox" checked={musicOn} onChange={() => setMusicOn(!musicOn)} />
          Background Music
        </label>
        <label>
          <input type="checkbox" checked={sfxOn} onChange={() => setSfxOn(!sfxOn)} />
          Sound Effects
        </label>
      </div>

      <button onClick={drawCards}>Draw Cards</button>

      {cards.length === 3 && (
        <div className="card-spread">
          {cards.map((card, index) => (
            <div className="card-container" key={index}>
              <h3>{["Past", "Present", "Future"][index]}</h3>
              <img 
                src={card.image} 
                alt={card.name} 
                onClick={() => setSelectedCard(card)} 
                style={{ 
                  transform: card.isReversed ? 'rotate(180deg)' : 'none',
                  cursor: 'pointer',
                  maxWidth: '200px'
                }}
              />
              <h4>{card.name} {card.isReversed && "(Reversed)"}</h4>
              <p>{card.isReversed ? card.reversed : card.upright}</p>
            </div>
          ))}
        </div>
      )}

      {selectedCard && (
        <div className="popup-overlay" onClick={() => setSelectedCard(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedCard.name} {selectedCard.isReversed && "(Reversed)"}</h2>
            <p><strong>✨ Essence:</strong> {selectedCard.expanded?.essence}</p>
            <p><strong>{selectedCard.isReversed ? "🌪️ Reversed Insights:" : "🕊️ Upright Insights:"}</strong></p>
            <ul>
              {(selectedCard.isReversed ? selectedCard.expanded?.reversed : selectedCard.expanded?.upright)?.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
            <p><strong>🔮 Miss Annabelle's Wisdom:</strong> {selectedCard.expanded?.tip}</p>
            <button onClick={() => setSelectedCard(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}