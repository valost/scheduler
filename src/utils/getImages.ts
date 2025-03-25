const IMAGE_BASE_PATH = '/scheduler/img';
const ICONS_BASE_PATH = '/scheduler/img/icons';

const getImages = (name: string): string => {
  return `${IMAGE_BASE_PATH}/${name}.png`;
};

export const getLocationImg = (): string => getImages('locationImg');

const getIcons = (name: string): string => {
  return `${ICONS_BASE_PATH}/${name}.svg`;
}

export const getArrowLeftIcon = (): string => getIcons('arrow-left');
export const getArrowRightIcon = (): string => getIcons('arrow-right');