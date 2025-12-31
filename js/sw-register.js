if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(() => console.log("Service Worker kayıt edildi"))
      .catch((err) => console.log("SW hata:", err));
  });
}
