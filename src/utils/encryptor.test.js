/* eslint-disable import/no-extraneous-dependencies */
import expect from 'expect';
import { encrypt, decrypt } from './encryptor';
import * as musicalInstruments from '../constants/musicalInstruments';
import * as musicalNotes from '../constants/musicalNotes';

const secretKey = 'secret:0000:secret';

describe('Encryptor', () => {
  it('should get the correct value after decryption', () => {
    const text = `${musicalInstruments.BASS}.${musicalNotes.NOTES[15]}`;
    const encrypted = encrypt(secretKey, text);
    const decrypted = decrypt(secretKey, encrypted);

    expect(decrypted).toEqual(text);
  });
});
