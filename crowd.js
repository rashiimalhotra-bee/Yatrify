// Get the crowd prediction elements
const crowdLevelIndicator = document.getElementById('crowd-level-indicator');
const crowdLevelText = document.getElementById('crowd-level-text');
const crowdDensityText = document.getElementById('crowd-density');
const waitTimeText = document.getElementById('wait-time');

// Update the crowd prediction data
function crowdPrediction(crowdLevel, crowdDensity, waitTime) {
    crowdLevelIndicator.style.width = crowdLevel + '%';
    crowdLevelText.textContent = getCrowdLevelText(crowdLevel);
    crowdDensityText.textContent = crowdDensity;
    waitTimeText.textContent = waitTime;
}

// Get the crowd level text
function getCrowdLevelText(crowdLevel) {
    if (crowdLevel < 30) {
        return 'Low';
    } else if (crowdLevel < 60) {
        return 'Moderate';
    } else {
        return 'High';
    }
}

// Example usage
crowdPrediction(60, 'Medium', '15-30 minutes');