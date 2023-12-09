import get from "lodash.get";

export async function getWordMeaning(word) {
  if (!word) return "No meaning available";

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const json = await response.json();

    for (const entry of json) {
      const nounMeaning = entry.meanings.find(
        (meaning) => meaning.partOfSpeech === "noun"
      );

      if (nounMeaning) {
        return get(
          nounMeaning,
          "definitions[0].definition",
          "No noun meaning available"
        );
      } else if (entry.meanings.length > 0) {
        return get(
          entry.meanings[0],
          "definitions[0].definition",
          "No meaning available"
        );
      }
    }

    return "No meaning available";
  } catch (error) {
    console.error("Error fetching meaning:", error);
    return "No meaning available";
  }
}

async function getRandomWords(number) {
  try {
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?number=${number}`
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export async function getWordOfTheDay() {
  try {
    const randomWords = await getRandomWords(10);
    let selectedWord;
    for (const word of randomWords) {
      const meaning = await getWordMeaning(word);
      if (meaning) {
        selectedWord = { word, meaning };
        break;
      }
    }
    if (!selectedWord) {
      getWordOfTheDay();
    }
    return selectedWord;
  } catch (error) {
    console.error(error);
    return { word: "Error occurred", meaning: "No meaning available" };
  }
}
