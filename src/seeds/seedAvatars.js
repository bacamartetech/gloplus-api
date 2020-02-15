/* eslint-disable no-console */
import 'dotenv/config';

import mongoose from 'mongoose';
import mongoConfig from '../config/mongo';

import Avatar from '../schemas/Avatar';

async function seedAvatars() {
  await Avatar.create([
    { name: 'Avatar 1', url: 'https://avataaars.io/?avatarStyle=Circle&topType=Eyepatch&facialHairType=BeardLight&facialHairColor=Brown&clotheType=ShirtCrewNeck&clotheColor=Pink&eyeType=Side&eyebrowType=UnibrowNatural&mouthType=Tongue&skinColor=Yellow' },
    { name: 'Avatar 2', url: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Kurt&hairColor=Auburn&facialHairType=BeardMagestic&facialHairColor=Blonde&clotheType=Overall&clotheColor=PastelRed&eyeType=Squint&eyebrowType=DefaultNatural&mouthType=Vomit&skinColor=DarkBrown' },
    { name: 'Avatar 3', url: 'https://avataaars.io/?avatarStyle=Circle&topType=Hijab&accessoriesType=Kurt&hatColor=Heather&hairColor=SilverGray&facialHairType=Blank&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=PastelOrange&eyeType=Cry&eyebrowType=SadConcernedNatural&mouthType=Sad&skinColor=Black' },
    { name: 'Avatar 4', url: 'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Sunglasses&hatColor=PastelOrange&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=ShirtVNeck&clotheColor=Heather&eyeType=Wink&eyebrowType=SadConcerned&mouthType=Sad&skinColor=Tanned' },
    { name: 'Avatar 5', url: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Round&hairColor=BrownDark&facialHairType=MoustacheFancy&facialHairColor=Auburn&clotheType=BlazerShirt&clotheColor=PastelOrange&eyeType=Close&eyebrowType=AngryNatural&mouthType=Sad&skinColor=Yellow' },
    { name: 'Avatar 6', url: 'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat4&accessoriesType=Blank&hatColor=Pink&hairColor=Brown&facialHairType=MoustacheFancy&facialHairColor=Red&clotheType=ShirtScoopNeck&clotheColor=Heather&eyeType=EyeRoll&eyebrowType=Angry&mouthType=Sad&skinColor=DarkBrown' },
    { name: 'Avatar 7', url: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesar&accessoriesType=Round&hairColor=Brown&facialHairType=MoustacheMagnum&facialHairColor=Brown&clotheType=Hoodie&clotheColor=PastelGreen&eyeType=Dizzy&eyebrowType=Default&mouthType=Grimace&skinColor=DarkBrown' },
    { name: 'Avatar 8', url: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription01&hairColor=SilverGray&facialHairType=MoustacheMagnum&facialHairColor=BlondeGolden&clotheType=CollarSweater&clotheColor=Gray01&eyeType=Hearts&eyebrowType=AngryNatural&mouthType=Disbelief&skinColor=Light' },
    { name: 'Avatar 9', url: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Red&facialHairType=BeardMagestic&facialHairColor=Black&clotheType=BlazerSweater&clotheColor=Pink&eyeType=Side&eyebrowType=AngryNatural&mouthType=Vomit&skinColor=Pale' },
    { name: 'Avatar 10', url: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Prescription02&hairColor=Red&facialHairType=BeardMagestic&facialHairColor=Auburn&clotheType=GraphicShirt&clotheColor=PastelBlue&graphicType=Skull&eyeType=Close&eyebrowType=UpDown&mouthType=Tongue&skinColor=Tanned' },
  ]);
  console.log('AVATARS SEEDED');
}

mongoose.connect(
  mongoConfig.url, { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true },
);

seedAvatars();
