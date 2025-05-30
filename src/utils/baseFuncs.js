export const checkIsOwner = (role) => {
  if (role?.toLowerCase() === 'owner') {
    return true;
  } else if (role?.toLowerCase() === 'kasir') {
    return false;
  }
  return null;
};



export const getLevelColor = (level) => {
  // Convert the level to lowercase to make the function case-insensitive
  const levelLower = level.toLowerCase();

  switch (levelLower) {
    case 'gold':
      return '#F5D300'; // Soft pastel gold
    case 'platinum':
      return '#D1D8E0'; // Soft platinum color
    case 'silver':
      return '#C0C0C0'; // Soft silver color
    default:
      return '#F5F5F5'; // Soft gray for unknown/other levels
  }
};


export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user')) || {};
  } catch (error) {
    return {};
  }
};


export const privateAccess = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return false;

  try {
    const user = JSON.parse(userStr);
    return user.role === 'owner';
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
    return false;
  }
};



// utils/formatNumber.js
export function formatNumberWithDot(number) {
  if (number === null || number === undefined) return "0";
  if (typeof number === "string") number = parseInt(number.replace(/[^0-9]/g, ""), 10);
  if (isNaN(number)) return "0";

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function parseNumberFromString(str) {
  if (!str) return 0;
  return parseInt(str.replace(/\./g, ""), 10) || 0;
}



export function formatTime(date) {
  if (!date) return "";
  const d = new Date(date);
  let hours = d.getHours();
  let minutes = d.getMinutes();
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  return `${hours}:${minutes}`;
}