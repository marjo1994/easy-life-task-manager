export const getAvatar = (userId: string): string => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`;
};
