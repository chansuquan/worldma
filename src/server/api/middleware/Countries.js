import axios from 'axios';
const END_POINT = 'https://restcountries.eu';

const buildCountries = (data) => {

  if (Array.isArray(data) && data.length) {
    const countries = data.map(item => {
      const { name = '', latlng = [] } = item;

      return { name, coordinates: latlng.reverse() }
    });

    return countries;
  }

  return [];
}

export const getCountries = async (req, res, next) => {

  const URL = `${END_POINT}/rest/v2/all`;

  const { data } = await axios.get(URL);

  res.json(buildCountries(data));
};
