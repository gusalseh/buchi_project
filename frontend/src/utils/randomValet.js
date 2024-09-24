export const getRandomValet = () => {
  const min = 1500;
  const max = 3500;
  const step = 500;
  const randomPrice = Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;
  return randomPrice.toLocaleString(); // 천 단위 콤마 추가
};
