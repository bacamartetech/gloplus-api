/* eslint-disable no-console */
import 'dotenv/config';

import mongoose from 'mongoose';
import mongoConfig from '../config/mongo';

import Avatar from '../schemas/Avatar';

async function seedAvatars() {
  await Avatar.create([
    { name: 'Faustão', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_faustao.jpg' },
    { name: 'Carminha', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_carminha.png' },
    { name: 'Mezenga', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_mezenga.jpg' },
    { name: 'Louro José', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_lourojose.jpg' },
    { name: 'Berdinazzi', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_berdinazzi.jpg' },
    { name: 'Rita', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_rita.jpg' },
    { name: 'Fátima', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_f%C3%A1tima.jpg' },
    { name: 'Ana Maria', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_anamaria.jpg' },
    { name: 'Pedro', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_pedro.jpg' },
    { name: 'Thiago Leifert', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_thiagoleifert.jpg' },
    { name: 'Bino', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_bino.jpg' },
    { name: 'Willian', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_william.jpg' },
  ]);
  console.log('AVATARS SEEDED');
}

mongoose.connect(
  mongoConfig.url, { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true },
);

seedAvatars();
