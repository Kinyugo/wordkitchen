/**
 * This function uses the SpeechRecognition API in the browser to transcribe speech.
 *
 * @param {Function} onResult Function to be called when the SpeechRecogntion API returns a result.
 *
 * @returns {Function} Function to be called when terminating the SpeechRecognition API requests.
 */
export function transcribe(onResult) {
  // Check to see which SpeechRecognitionAPI is available as it is a test feature in most browsers.
  const SpeechRecognitionAPI =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  // Instantiate the recognition engine.
  const recognitionEngine = new SpeechRecognitionAPI();

  // Configure the recognition engine.
  recognitionEngine.continuous = true;
  recognitionEngine.interimResults = true;
  recognitionEngine.lang = "en-US";
  recognitionEngine.addEventListener("result", (event) => {
    const results = resultsToText(event.results);
    onResult(results);
  });

  // Start the speech recognition API.
  recognitionEngine.start();

  // Function to terminate the recognition service.
  return () => recognitionEngine.stop();
}

function resultsToText(results) {
  const resultsArr = Array.from(results);

  const textsArr = resultsArr.map((resObj) => resObj[0].transcript);

  return textsArr.map(transformUpcase).join(". ");
}

function transformUpcase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
