const API_URL = "https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow";

async function fetchQuestions() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.items.slice(0, 6);
  } catch (error) {
    const fallback = await fetch("data/sample.json");
    const data = await fallback.json();
    return data.items;
  }
}
