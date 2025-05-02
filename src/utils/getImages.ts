const IMAGE_BASE_PATH = '/img';
const ICONS_BASE_PATH = '/img/icons';

const getImages = (name: string): string => {
  return `${import.meta.env.BASE_URL}${IMAGE_BASE_PATH}/${name}.png`;
};

export const getLocationImg = (): string => getImages('locationImg');
export const getCourtImg = (name: string): string => getImages(name);

const getIcons = (name: string): string => {
  return `${import.meta.env.BASE_URL}${ICONS_BASE_PATH}/${name}.svg`;
};

export const getArrowLeftIcon = (): string => getIcons('arrow-left');
export const getArrowRightIcon = (): string => getIcons('arrow-right');
export const getAvatarIcon = (): string => getIcons('avatar-tennis-ukraine');
