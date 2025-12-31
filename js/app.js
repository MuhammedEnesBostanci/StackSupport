document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("questionList");
  const questions = await fetchQuestions();

  container.innerHTML = "";

  if (questions.length === 0) {
    container.innerHTML = "<p>Gösterilecek soru yok.</p>";
    return;
  }

  questions.forEach(q => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    col.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${q.title}</h5>
          <p class="card-text">
            Cevap: ${q.answer_count} <br>
            Görüntülenme: ${q.view_count}
          </p>
          <a href="detail.html?id=${q.question_id}" class="btn btn-primary">
            Detaya Git
          </a>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
});
