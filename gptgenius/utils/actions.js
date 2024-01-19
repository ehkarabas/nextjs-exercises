"use server";
import OpenAI from "openai";
import prisma from "@/prisma/db";
import { revalidatePath } from "next/cache";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateChatResponse = async (chatMessages) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        // Context olusturmak icin client state'teki tum message'ler gecilir
        ...chatMessages,
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
      max_tokens: 100,
    });

    return {
      message: response.choices[0].message,
      tokens: response.usage.total_tokens,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

// aranan tour database'de varsa dondur
// sorgu ile unique kombinasyon varligi kontrolu
export const getExistingTour = async ({ city, country, language }) => {
  return prisma.gptGeniusTour.findUnique({
    where: {
      city_country_lang: {
        city,
        country,
        lang: language,
      },
    },
  });
  // eger bulamazsa null doner, bulursa kaydi doner
};

// database'de olmayan tour ile ilgili AI'dan response uret
export const generateTourResponse = async ({ city, country, language }) => {
  console.log("city: ", city);
  console.log("country: ", country);
  console.log("language: ", language);
  const queryTr = `Tam adi ${country} olan gercek bir ulkede tam adi ${city} olan gercek bir sehir bul.
  Eger dunya uzerinde ${city} ve ${country} bulunuyorsa, bu ${city},${country}'de ailelerin yapabileceklerine dair bir liste uret. Bir liste elde ettiginde bir gunluk bir gezi plani yap. Response'un asagidaki JSON format'inda olsun ve Turkce dilinde olsun.
  {
    "tour": {
      "city": "${city} (kucuk harflerle)",
      "country": "${country} (kucuk harflerle)",
      "title": "gezinin basligi, sehrin adini icermeli ve maksimum 4 kelime olmali",
      "description": "sehir ve gezi hakkinda kisa aciklama",
      "stops": ["'{1. gezi duragi}'", "'{2. gezi duragi}'", "'{3. gezi duragi}'"]
    }
  }
  "stops" property'si yalnizca 3 gezi duragi icermelidir.
  Eger tam hali ${city} olan bir sehir hakkinda bilgi bulamazsan veya boyle bir ${city} yoksa veya nufusu 1'den az ise veya ${country} ulkesinde yer almiyorsa, ekstra hic bir karakter icermeyecek sekilde tam olarak { "tour": null } döndür.`;

  const queryEn = `Find a exact ${city} in this exact ${country}.
  If ${city} and ${country} exist, create a list of things families can do in this ${city},${country}. 
  Once you have a list, create a one-day tour. Response should be in English and in the following JSON format: 
  {
    "tour": {
      "city": "${city} (in lowercase)",
      "country": "${country} (in lowercase)",
      "title": "title of the tour",
      "description": "short description of the city and tour",
      "stops": ["'{stop 1}'", "'{stop 2}'", "'{stop 3}'"]
    }
  }
  "stops" property should include only three stops.
  If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country},   return { "tour": null }, with no additional characters.`;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "you are a tour guide" },
        // burada Context endise edilmemelidir, cunku arama zaten tek seferlik olmali ve sonraki aramalarla baglantili olmalidir, dolayisiyla yalnizca Response'a(message.content'e) odaklanilir.
        { role: "user", content: language === "tr" ? queryTr : queryEn },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });
    const tourData = JSON.parse(response.choices[0].message.content);

    if (!tourData.tour) {
      return null;
    }

    return { tour: tourData.tour, tokens: response.usage.total_tokens };
  } catch (error) {
    console.log(error);
    return null;
  }
};

// aranan tour database'de yoksa yenisi olusturulur.
export const createNewTour = async (tour) => {
  console.log("creating new tour in db => ", tour);
  return prisma.gptGeniusTour.create({
    data: tour,
  });
};

export const getAllTours = async (searchTerm) => {
  if (!searchTerm) {
    const tours = await prisma.gptGeniusTour.findMany({
      orderBy: [{ city: "asc" }, { lang: "desc" }],
    });

    return tours;
  }

  // searchTerm girildiyse city ve country field'larinda filtreleme yaparak dondur
  const tours = await prisma.gptGeniusTour.findMany({
    where: {
      OR: [
        {
          city: {
            contains: searchTerm,
          },
        },
        {
          country: {
            contains: searchTerm,
          },
        },
      ],
    },
    orderBy: [{ city: "asc" }, { lang: "desc" }],
  });
  return tours;
};

export const getSingleTour = async (id) => {
  return prisma.gptGeniusTour.findUnique({
    where: {
      id,
    },
  });
};

export const generateTourImage = async ({ city, country }) => {
  try {
    const tourImage = await openai.images.generate({
      prompt: `a panoramic view of the ${city} ${country}`,
      n: 1, // kac tane image uretilecegi
      size: "512x512",
      model: "dall-e-2",
    });
    return tourImage?.data[0]?.url;
  } catch (error) {
    return null;
  }
};

// Olusturulan model yapisina gore her GptGeniusUserToken bir GptGeniusUser ile iliskili olmak zorundadir.
export const getGptGeniusUser = async (clerkUserEmail) => {
  const gptGeniusUser = await prisma.gptGeniusUser.findUnique({
    where: {
      email: clerkUserEmail,
    },
  });
  return gptGeniusUser;
};

export const createGptGeniusUser = async (
  clerkUserId,
  clerkUserEmail,
  clerkUserNameSurname
) => {
  const gptGeniusUser = await prisma.gptGeniusUser.create({
    data: {
      user_id: clerkUserId,
      email: clerkUserEmail,
      name: clerkUserNameSurname || "",
    },
  });
  return gptGeniusUser;
};

export const createTokenForGptGeniusUser = async (gptGeniusUserId) => {
  const token = await prisma.gptGeniusUserToken.create({
    data: {
      clerkId: gptGeniusUserId,
    },
  });
  return token;
};

// token eksiltme yapisini olusturan function'lar
export const getGptGeniusUserTokenAmount = async (clerkId) => {
  const result = await prisma.gptGeniusUserToken.findUnique({
    where: {
      clerkId,
    },
  });

  return result?.tokens;
};

export const subtractGptGeniusUserTokenAmount = async (clerkId, tokens) => {
  const result = await prisma.gptGeniusUserToken.update({
    where: {
      clerkId,
    },
    data: {
      tokens: {
        decrement: tokens,
      },
    },
  });
  revalidatePath("/profile");
  // Return the new token value
  return result.tokens;
};
