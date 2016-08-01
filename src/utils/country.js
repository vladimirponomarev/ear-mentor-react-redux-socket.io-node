import countries from '../json/countries';

export function getCountryList() {
  return countries;
}

export function getCountryByCode(code) {
  const countryCode = code.toLowerCase().trim();

  return countries.find(country => country.code.toLowerCase() === countryCode);
}

export function getCountryByName(name) {
  const countryName = name.toLowerCase().trim();

  return countries.find(country => country.name.toLowerCase() === countryName);
}
