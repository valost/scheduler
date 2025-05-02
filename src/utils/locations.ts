import { getCourtImg } from './getImages';

export const locations = [
  {
    id: 1,
    name: 'Щасливе',
    image: getCourtImg('Court_01'),
    address: '99 Random Str, Kyiv',
    mapsLink: 'https://maps.app.goo.gl/H1arsaJyAUF1D7AS6',
  },
  {
    id: 2,
    name: 'Табір',
    image: '',
    address: '98 Random Str, Kyiv',
    mapsLink: 'https://maps.app.goo.gl/H1arsaJyAUF1D7AS6',
  },
  {
    id: 3,
    name: 'Проліски',
    image: '',
    address: '97 Random Str, Kyiv',
    mapsLink: 'https://maps.app.goo.gl/H1arsaJyAUF1D7AS6',
  },
];
