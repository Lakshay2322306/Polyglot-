document.getElementById("translateBtn").addEventListener("click", () => {
  const inputText = document.getElementById("inputText").value;
  const fromLang = document.getElementById("fromLanguage").value;
  const toLang = document.getElementById("toLanguage").value;

  fetch("https://your-backend-url.onrender.com/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: inputText,
      source_lang: fromLang,
      target_lang: toLang
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("output").innerText = data.translated_text || data.error;
  })
  .catch(() => {
    document.getElementById("output").innerText = "Translation failed.";
  });
});
