const listContainer = document.getElementById("servicesList");
const filter = document.getElementById("tagFilter");

async function loadQuestions(tag = "") {
  listContainer.innerHTML = "<p>Yükleniyor...</p>";

  let url = "https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow";

  if (tag) {
    url += `&tagged=${tag}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    renderQuestions(data.items.slice(0, 20));
  } catch {
    const fallback = await fetch("data/sample.json");
    const data = await fallback.json();
    renderQuestions(data.items);
  }
}

function renderQuestions(questions) {
  listContainer.innerHTML = "";

  if (!questions || questions.length === 0) {
    listContainer.innerHTML = "<p>Sonuç bulunamadı.</p>";
    return;
  }

  questions.forEach(q => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    col.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <h5>${q.title}</h5>
          <p>Etiketler: ${q.tags ? q.tags.join(", ") : "-"}</p>
          <a href="detail.html?id=${q.question_id}" class="btn btn-outline-primary">
            Detay
          </a>
        </div>
      </div>
    `;

    listContainer.appendChild(col);
  });
}

filter.addEventListener("change", () => {
  loadQuestions(filter.value);
});

loadQuestions();
