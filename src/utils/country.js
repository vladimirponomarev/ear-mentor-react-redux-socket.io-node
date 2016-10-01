import countries from '../json/countries';

class Country {

  static getList() {
    return countries;
  }

  static getByCode(code) {
    const countryCode = code.toLowerCase().trim();

    return countries.find(country => country.code.toLowerCase() === countryCode);
  }

  static getByName(name) {
    const countryName = name.toLowerCase().trim();

    return countries.find(country => country.name.toLowerCase() === countryName);
  }
}

export default Country;
