const detailArea = document.getElementById("detailArea");

const params = new URLSearchParams(window.location.search);
const questionId = params.get("id");

if (!questionId) {
  detailArea.innerHTML = "<p>Soru bulunamadı.</p>";
} else {
  loadDetail(questionId);
}

async function loadDetail(id) {
  try {
    const response = await fetch(
      `https://api.stackexchange.com/2.3/questions/${id}?site=stackoverflow&filter=withbody`
    );
    const data = await response.json();
    renderDetail(data.items[0]);
  } catch {
    detailArea.innerHTML = "<p>Detay yüklenemedi.</p>";
  }
}

function renderDetail(q) {
  detailArea.innerHTML = `
    <h2>${q.title}</h2>
    <div class="mb-3">
      <strong>Etiketler:</strong> ${q.tags.join(", ")}
    </div>
    <div class="mb-3">
      <strong>Görüntülenme:</strong> ${q.view_count}
    </div>
    <hr>
    <div>${q.body}</div>
  `;
}
