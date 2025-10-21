document.getElementById("alienForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let valid = true;
  
    // --- Planet Name ---
    const planetName = document.getElementById("planetName").value.trim();
    const planetError = document.getElementById("planetError");
    const planetRegex = /^(?=.*[aeiouAEIOU])(?=.*\d)[A-Za-z0-9]+$/;
    if (!planetRegex.test(planetName)) {
      planetError.textContent = "Planet name must include at least one vowel and one digit.";
      valid = false;
    } else planetError.textContent = "";
  
    // --- Antenna Count ---
    const antenna = document.getElementById("antennaCount").value;
    const antennaError = document.getElementById("antennaError");
    if (antenna === "" || antenna % 2 !== 0) {
      antennaError.textContent = "Antenna count must be an even number.";
      valid = false;
    } else antennaError.textContent = "";
  
    // --- Alien ID ---
    const alienID = document.getElementById("alienID").value.trim();
    const idError = document.getElementById("idError");
    const idRegex = /^ZOR-[A-Z]{2}_[0-9]{4}@UFO$/;
    if (!idRegex.test(alienID)) {
      idError.textContent = "ID must follow pattern: ZOR-XY_9999@UFO.";
      valid = false;
    } else idError.textContent = "";
  
    // --- Favorite Human Phrase ---
    const phrase = document.getElementById("phrase").value;
    const phraseError = document.getElementById("phraseError");
    const phraseRegex = /[\p{Emoji}\p{Punctuation}]/u;
    if (!phraseRegex.test(phrase)) {
      phraseError.textContent = "Phrase must include at least one emoji or punctuation mark.";
      valid = false;
    } else phraseError.textContent = "";
  
    // --- Landing Date ---
    const dateInput = document.getElementById("landingDate").value;
    const dateError = document.getElementById("dateError");
    const today = new Date().setHours(0,0,0,0);
    const landing = new Date(dateInput).setHours(0,0,0,0);
    if (!dateInput || landing < today) {
      dateError.textContent = "Landing date cannot be in the past.";
      valid = false;
    } else dateError.textContent = "";
  
    // --- Success Redirect ---
    if (valid) {
      window.location.href = "greeting.html";
    }
  });
  