const AVATAR_STYLES = ['adventurer', 'avataaars', 'bottts', 'personas',"'neutral"];

export const generateRandomAvatar = (seed) => {
  const style = AVATAR_STYLES[Math.floor(Math.random() * AVATAR_STYLES.length)];
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
};