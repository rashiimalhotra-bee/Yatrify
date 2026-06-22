let selectedSlot = null;

// Add click listeners to all slots
const slots = document.querySelectorAll('.slot');
slots.forEach(slot => {
    slot.addEventListener('click', () => {
        // Remove 'selected' class from all slots
        slots.forEach(s => s.classList.remove('selected'));
        
        // Add 'selected' class to the clicked slot
        slot.classList.add('selected');
        
        // Store selected slot value
        selectedSlot = slot.textContent;
    });
});

// Handle form submission
document.getElementById('booking-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!selectedSlot) {
        alert('Please select a parking slot.');
        return;
    }

    const bookingData = {
        city: document.getElementById('city').value,
        area: document.getElementById('area').value,
        name: document.getElementById('name').value,
        vehicleNumber: document.getElementById('vehicle-number').value,
        slotNumber: selectedSlot
    };

    try {
        const response = await fetch('http://localhost:3000/api/parking/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            // reset form or redirect
            document.getElementById('booking-form').reset();
            slots.forEach(s => s.classList.remove('selected'));
            selectedSlot = null;
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.error('Error submitting parking booking:', err);
        alert('An error occurred. Please try again later.');
    }
});
