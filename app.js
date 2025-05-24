function translateText() {
    const inputText = document.getElementById('inputText').value.trim();
    const sourceLang = document.getElementById('fromLanguage').value;
    const targetLang = document.getElementById('toLanguage').value;
    const errorMessageDiv = document.getElementById('errorMessage');
    const translateButton = document.querySelector('.translate-btn');

    errorMessageDiv.style.display = 'none';
    errorMessageDiv.textContent = '';

    if (!inputText) {
        errorMessageDiv.textContent = 'Please enter text to translate';
        errorMessageDiv.style.display = 'flex';
        return;
    }

    const cacheKey = `${inputText}|${sourceLang}|${targetLang}`;
    if (translationCache[cacheKey]) {
        updateModal(inputText, translationCache[cacheKey]);
        document.getElementById('translationModal').style.display = 'flex';
        return;
    }

    translateButton.disabled = true;
    translateButton.textContent = 'Translating...';

    fetch('https://polyglot-backend-4fcz.onrender.com/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            text: inputText,
            source_lang: sourceLang,
            target_lang: targetLang
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            errorMessageDiv.textContent = data.error;
            errorMessageDiv.style.display = 'flex';
        } else {
            translationCache[cacheKey] = data.translated_text;
            sessionStorage.setItem('translationCache', JSON.stringify(translationCache));
            updateModal(data.original_text, data.translated_text);
            document.getElementById('translationModal').style.display = 'flex';
        }
    })
    .catch(error => {
        errorMessageDiv.textContent = 'Error: Unable to connect to the translation service';
        errorMessageDiv.style.display = 'flex';
        console.error('Translation error:', error);
    })
    .finally(() => {
        translateButton.disabled = false;
        translateButton.textContent = '🌐 Translate';
    });
}
