const avatarImages = import.meta.glob(
  "../assets/avatar/*",
  { eager: true, import: "default" }
) as Record<string, string>;

export const getAvatarPath = (avatarName: string) => {
  const key = `../assets/avatar/${avatarName}`;
  return avatarImages[key];
};