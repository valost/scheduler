const IMAGE_BASE_PATH = '/scheduler/public/img';

const getImages = (name: string): string => {
  return `${IMAGE_BASE_PATH}/${name}.png`;
};

export const getLocationImg = (): string => getImages('locationImg');