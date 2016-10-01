/* eslint-disable import/no-extraneous-dependencies */
import expect from 'expect';
import countries from '../json/countries.json';
import Country from './Country';


describe('Country', () => {
  it('should get a complete list of countries', () => {
    const countryList = Country.getList();

    expect(countryList.length).toEqual(countries.length);
  });

  it('should get a correct country by its code', () => {
    const country = Country.getByCode('RU');

    expect(country.name.toLowerCase()).toInclude('russia');
  });

  it('should get a correct country by its name', () => {
    const country = Country.getByName('Russian Federation');

    expect(country.name.toLowerCase()).toInclude('russia');
  });
});

