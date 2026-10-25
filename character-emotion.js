// ========================================
// THE GREY DISTRICT
// CHARACTER EMOTION SYSTEM
// ========================================

const characterEmotions = {
    neutral: "neutral",
    focused: "focused",
    suspicious: "suspicious",
    shocked: "shocked",
    angry: "angry",
    concerned: "concerned",
    determined: "determined",
    tension: "tension"
};


// Get the player selected gender
function getPlayerGender() {
    return localStorage.getItem("playerGender") || "male";
}


// Change the character's emotion
function setCharacterEmotion(emotion) {

    const gender = getPlayerGender();

    const characterImage = document.getElementById("storyCharacter");

    if (!characterImage) {
        console.warn("Character image not found.");
        return;
    }

    // Make sure the emotion exists
    if (!characterEmotions[emotion]) {
        console.warn("Unknown emotion:", emotion);
        emotion = "neutral";
    }

    characterImage.src =
        `${gender}-${characterEmotions[emotion]}.png`;

    // Store current emotion
    characterImage.dataset.emotion = emotion;
}


// Reset character to neutral
function resetCharacterEmotion() {
    setCharacterEmotion("neutral");
}