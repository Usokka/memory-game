// utils/cardsArray.js
export const createArray = (grid) => {
    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🦆', '🦉'];
    let values = emojis.slice(0, (grid * grid) / 2);
    values = [...values, ...values];
  
    return new Array(grid * grid)
      .fill(0)
      .map((_, i) => {
        const index = Math.floor(Math.random() * values.length);
        const val = values[index];
        values = values.filter((_, j) => j !== index);
        return {
          id: i,
          value: val,
          active: true,
          selected: false,
        };
      });
  };