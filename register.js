document.getElementById('signup-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            // Redirect or clear form
            window.location.href = 'index.html'; // Adjust as needed
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.error('Error submitting form:', err);
        alert('An error occurred during registration. Please try again later.');
    }
});
