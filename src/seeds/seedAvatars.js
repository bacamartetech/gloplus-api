/* eslint-disable no-console */
import 'dotenv/config';

import mongoose from 'mongoose';
import mongoConfig from '../config/mongo';

import Avatar from '../schemas/Avatar';

async function seedAvatars() {
  await Avatar.create([
    { name: 'Faustão', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_faustao.jpg?v=1581964746668' },
    { name: 'Carminha', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_carminha.png?v=1581964746840' },
    { name: 'Mezenga', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_mezenga.jpg?v=1581964746879' },
    { name: 'Louro José', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_lourojose.jpg?v=1581964746932' },
    { name: 'Berdinazzi', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_berdinazzi.jpg?v=1581964747130' },
    { name: 'Rita', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_rita.jpg?v=1581964747169' },
    { name: 'Fátima', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_f%C3%A1tima.jpg?v=1581964747210' },
    { name: 'Ana Maria', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_anamaria.jpg?v=1581964747483' },
    { name: 'Pedro', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_pedro.jpg?v=1581964747523' },
    { name: 'Thiago Leifert', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_thiagoleifert.jpg?v=1581964747552' },
    { name: 'Bino', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_bino.jpg?v=1581964747761' },
    { name: 'Willian', url: 'https://cdn.glitch.com/e4d2a036-adb2-43f5-93f3-704f33cc7c0a%2Favatar_william.jpg?v=1581964747890' },
  ]);
  console.log('AVATARS SEEDED');
}

mongoose.connect(
  mongoConfig.url, { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true },
);

seedAvatars();
