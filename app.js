document.getElementById("translateBtn").addEventListener("click", () => {
  const inputText = document.getElementById("inputText").value.trim();
  const fromLang = document.getElementById("fromLanguage").value;
  const toLang = document.getElementById("toLanguage").value;
  const output = document.getElementById("output");

  if (!inputText) {
    output.innerText = "Please enter text to translate.";
    return;
  }

  output.innerText = "Translating...";

  fetch("https://polyglot-backend-4fcz.onrender.com/translate", {
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
    output.innerText = data.translated_text || data.error || "No response received.";
  })
  .catch((err) => {
    console.error("Translation error:", err);
    output.innerText = "Translation failed. Check your internet or try again.";
  });
});
