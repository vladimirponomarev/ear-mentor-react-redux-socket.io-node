import expect from 'expect';
import countries from '../json/countries.json';
import { getCountryList, getCountryByCode, getCountryByName } from './country';


describe('Testing the country functions', () => {
  it('should get a complete list of countries', () => {
    const countryList = getCountryList();

    expect(countryList.length).toEqual(countries.length);
  });

  it('should get a correct country by its code', () => {
    const country = getCountryByCode('RU');

    expect(country.name.toLowerCase()).toInclude('russia');
  });

  it('should get a correct country by its name', () => {
    const country = getCountryByName('Russian Federation');

    expect(country.name.toLowerCase()).toInclude('russia');
  });
});

