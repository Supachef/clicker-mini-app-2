const userId = 1; // Example user ID

async function fetchPetStatus() {
    const response = await fetch(`http://127.0.0.1:5000/pet/${userId}`);
    const data = await response.json();
    document.getElementById('health').innerText = data.health;
    document.getElementById('hunger').innerText = data.hunger;
    document.getElementById('happiness').innerText = data.happiness;
    document.getElementById('energy').innerText = data.energy;
}

async function performAction(action) {
    const response = await fetch(`http://127.0.0.1:5000/pet/${userId}/action`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action })
    });
    const data = await response.json();
    alert(data.message);
    fetchPetStatus();
}

async function fetchStoreItems() {
    const response = await fetch('http://127.0.0.1:5000/store');
    const items = await response.json();
    const storeItemsDiv = document.getElementById('store-items');
    storeItemsDiv.innerHTML = items.map(item => `<p>${item.name} - ${item.price} (${item.type})</p>`).join('');
}

async function fetchLeaderboard() {
    const response = await fetch('http://127.0.0.1:5000/leaderboard');
    const leaders = await response.json();
    const leaderboardListDiv = document.getElementById('leaderboard-list');
    leaderboardListDiv.innerHTML = leaders.map(leader => `<p>${leader.pet_name} - ${leader.rating}</p>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    fetchPetStatus();
    fetchStoreItems();
    fetchLeaderboard();
});
