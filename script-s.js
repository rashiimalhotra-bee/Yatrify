const qrCodeDiv = document.querySelector('.qr-code');

// Function to handle seller booking submission
async function submitSellerBooking() {
    // Retrieve initial data from localStorage
    const initialData = JSON.parse(localStorage.getItem('yatrify_initial_data'));

    if (!initialData) {
        alert('Missing initial user data. Please go back to the first page.');
        return;
    }

    const bookingData = {
        name: initialData.name,
        gender: initialData.gender,
        age: initialData.age,
        destination: document.getElementById('destination').value,
        timeSlot: document.getElementById('time-slot').value,
        identityNo: document.getElementById('identity-no').value
    };

    try {
        const response = await fetch('http://localhost:3000/api/seller/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            // Display success message
            qrCodeDiv.innerHTML += '<p style="color: green; font-weight: bold;">Booking Confirmed!</p>';
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.error('Error submitting seller booking:', err);
        alert('An error occurred. Please try again later.');
    }
}

// Since there is no button, we will add a listener to the QR code image for now,
// or better, I will add a button to the HTML in the next step.
qrCodeDiv.addEventListener('click', () => {
    submitSellerBooking();
});
