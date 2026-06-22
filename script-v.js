const noOfMembersInput = document.getElementById('no-of-members');
const totalAmountElement = document.getElementById('total-amount');
const payBtn = document.querySelector('.pay-btn');
const qrCodeDiv = document.querySelector('.qr-code');

noOfMembersInput.addEventListener('input', () => {
    const noOfMembers = parseInt(noOfMembersInput.value);
    const totalAmount = noOfMembers * 20;
    totalAmountElement.textContent = `Total Amount: ₹${totalAmount}`;
});

payBtn.addEventListener('click', async () => {
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
        identityNo: document.getElementById('identity-no').value,
        noOfMembers: document.getElementById('no-of-members').value,
        memberNames: document.getElementById('name-of-members').value,
        memberAge: document.getElementById('age').value,
        memberIdentityNo: document.getElementById('member-identity-no').value,
        totalAmount: parseInt(noOfMembersInput.value) * 20
    };

    try {
        const response = await fetch('http://localhost:3000/api/visitor/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            // Generate QR code logic here
            qrCodeDiv.style.display = 'block';
            qrCodeDiv.innerHTML = '<img src="https://via.placeholder.com/100" alt="QR Code">';
        } else {
            alert(data.error);
        }
    } catch (err) {
        console.error('Error submitting visitor booking:', err);
        alert('An error occurred. Please try again later.');
    }
});