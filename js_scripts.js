// Function to get free items from localStorage
function getFreeItems() {
    let freeItems = localStorage.getItem('freeItems');
    if (freeItems) {
        return JSON.parse(freeItems);
    } else {
        return [];
    }
}

// Function to save free items to localStorage
function saveFreeItems(freeItems) {
    localStorage.setItem('freeItems', JSON.stringify(freeItems));
}

// Function to display free items on the page
function displayFreeItems() {
    const freeItems = getFreeItems();
    const container = document.getElementById('free-items-container');
    container.innerHTML = '';

    if (freeItems.length === 0) {
        container.innerHTML = '<p>No free items posted yet. Be the first to share!</p>';
        return;
    }

    freeItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'free-item-card';
        card.innerHTML = `
            <h4>${item.title}</h4>
            <p>${item.description}</p>
            <p class="location">Location: ${item.location}</p>
        `;
        container.appendChild(card);
    });
}

// Handle form submission
document.getElementById('free-item-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = event.target.title.value.trim();
    const description = event.target.description.value.trim();
    const location = event.target.location.value.trim();

    if (title && description && location) {
        const freeItems = getFreeItems();
        const newItem = {
            title: title,
            description: description,
            location: location
        };
        freeItems.push(newItem);
        saveFreeItems(freeItems);
        displayFreeItems();
        event.target.reset();
        alert('Thank you for sharing a free item!');
    } else {
        alert('Please fill in all the fields.');
    }
});

// Initial display of free items
document.addEventListener('DOMContentLoaded', displayFreeItems);
