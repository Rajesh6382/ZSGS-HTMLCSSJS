// Meme templates database
const memeTemplates = [
    {
        id: 1,
        name: "Drake Hotline Bling",
        url: "https://i.imgflip.com/30b1gx.jpg"
    },
    {
        id: 2,
        name: "Distracted Boyfriend",
        url: "https://i.imgflip.com/1ur9b0.jpg"
    },
    {
        id: 3,
        name: "Two Buttons",
        url: "https://i.imgflip.com/1g8my4.jpg"
    },
    {
        id: 4,
        name: "Woman Yelling at Cat",
        url: "https://i.imgflip.com/345v97.jpg"
    },
    {
        id: 5,
        name: "Change My Mind",
        url: "https://i.imgflip.com/24y43o.jpg"
    },
    {
        id: 6,
        name: "Left Exit 12",
        url: "https://i.imgflip.com/22bdq6.jpg"
    }
];

// State management
let selectedTemplate = null;
let memes = [];
let editingMemeId = null;

// Initialize application
function init() {
    loadTemplates();
    loadMemesFromStorage();
    displayMemes();
}

// Load meme templates
function loadTemplates() {
    const templateGrid = document.getElementById('templateGrid');
    templateGrid.innerHTML = '';

    memeTemplates.forEach(template => {
        const templateItem = document.createElement('div');
        templateItem.className = 'template-item';
        templateItem.onclick = () => selectTemplate(template.id);

        templateItem.innerHTML = `
            <img src="${template.url}" alt="${template.name}">
            <div class="template-name">${template.name}</div>
        `;

        templateGrid.appendChild(templateItem);
    });
}

// Select template
function selectTemplate(templateId) {
    // Remove previous selection
    document.querySelectorAll('.template-item').forEach(item => {
        item.classList.remove('selected');
    });

    // Select new template
    const selectedElement = document.querySelectorAll('.template-item')[templateId - 1];
    selectedElement.classList.add('selected');

    selectedTemplate = memeTemplates.find(t => t.id === templateId);
}

// Create new meme
function createMeme() {
    if (!selectedTemplate) {
        alert('Please select a meme template!');
        return;
    }

    const topCaption = document.getElementById('topCaption').value.trim();
    const bottomCaption = document.getElementById('bottomCaption').value.trim();

    if (!topCaption && !bottomCaption) {
        alert('Please enter at least one caption!');
        return;
    }

    const newMeme = {
        id: Date.now(),
        templateId: selectedTemplate.id,
        templateUrl: selectedTemplate.url,
        templateName: selectedTemplate.name,
        topCaption: topCaption,
        bottomCaption: bottomCaption,
        createdAt: new Date().toISOString()
    };

    memes.unshift(newMeme);
    saveMemesToStorage();
    displayMemes();

    // Clear inputs
    document.getElementById('topCaption').value = '';
    document.getElementById('bottomCaption').value = '';

    // Show success message
    alert('Meme created successfully! 🎉');
}

// Display all memes
function displayMemes() {
    const gallery = document.getElementById('memeGallery');
    
    if (memes.length === 0) {
        gallery.innerHTML = `
            <div class="empty-state">
                <span>🎭</span>
                <p>No memes yet!</p>
                <p>Create your first meme above.</p>
            </div>
        `;
        return;
    }

    gallery.innerHTML = '';

    memes.forEach(meme => {
        const memeCard = document.createElement('div');
        memeCard.className = 'meme-card';

        memeCard.innerHTML = `
            <div class="meme-container">
                <img src="${meme.templateUrl}" alt="${meme.templateName}">
                ${meme.topCaption ? `<div class="meme-caption top-caption">${meme.topCaption}</div>` : ''}
                ${meme.bottomCaption ? `<div class="meme-caption bottom-caption">${meme.bottomCaption}</div>` : ''}
            </div>
            <div class="meme-actions">
                <button class="btn-edit" onclick="openEditModal(${meme.id})">
                    ✏️ Edit
                </button>
                <button class="btn-delete" onclick="deleteMeme(${meme.id})">
                    🗑️ Delete
                </button>
            </div>
        `;

        gallery.appendChild(memeCard);
    });
}

// Open edit modal
function openEditModal(memeId) {
    const meme = memes.find(m => m.id === memeId);
    if (!meme) return;

    editingMemeId = memeId;

    document.getElementById('editPreviewImg').src = meme.templateUrl;
    document.getElementById('editTopCaption').value = meme.topCaption;
    document.getElementById('editBottomCaption').value = meme.bottomCaption;

    document.getElementById('editModal').style.display = 'block';
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    editingMemeId = null;
}

// Save edited meme
function saveEdit() {
    if (!editingMemeId) return;

    const topCaption = document.getElementById('editTopCaption').value.trim();
    const bottomCaption = document.getElementById('editBottomCaption').value.trim();

    const memeIndex = memes.findIndex(m => m.id === editingMemeId);
    if (memeIndex !== -1) {
        memes[memeIndex].topCaption = topCaption;
        memes[memeIndex].bottomCaption = bottomCaption;
        
        saveMemesToStorage();
        displayMemes();
        closeEditModal();
        
        alert('Meme updated successfully! ✨');
    }
}

// Delete meme
function deleteMeme(memeId) {
    if (confirm('Are you sure you want to delete this meme?')) {
        memes = memes.filter(m => m.id !== memeId);
        saveMemesToStorage();
        displayMemes();
        alert('Meme deleted! 🗑️');
    }
}

// Local storage functions
function saveMemesToStorage() {
    localStorage.setItem('memes', JSON.stringify(memes));
}

function loadMemesFromStorage() {
    const storedMemes = localStorage.getItem('memes');
    if (storedMemes) {
        memes = JSON.parse(storedMemes);
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        closeEditModal();
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
