// Save Name, Gender, and Age into localStorage before redirecting
function saveInitialData() {
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;

    if (!name || !age) {
        alert('Please enter both name and age.');
        return false;
    }

    const initialData = { name, gender, age };
    localStorage.setItem('yatrify_initial_data', JSON.stringify(initialData));
    return true;
}

document.querySelector('.visitor-btn').onclick = function() {
    if (saveInitialData()) {
        window.location.href = 'visitor.html';
    }
};

document.querySelector('.seller-btn').onclick = function() {
    if (saveInitialData()) {
        window.location.href = 'seller.html';
    }
};
