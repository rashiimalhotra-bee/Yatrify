const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request Logging Middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// MySQL Connection (Update with your credentials)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234', // Replace with your MySQL password
    database: 'yatrify_db'
});

db.connect((err) => {
    if (err) {
        console.error('CRITICAL: Error connecting to MySQL:', err.message);
        console.error('Make sure MySQL is running and your password in server.js is correct.');
        return;
    }
    console.log('--- Connected to MySQL database ---');
});

// Registration API endpoint
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into database
        const query = 'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)';
        db.query(query, [name, email, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'Email already exists' });
                }
                console.error('Error inserting user:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(201).json({ message: 'User registered successfully!' });
        });
    } catch (err) {
        console.error('Error hashing password:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Seller Booking API
app.post('/api/seller/book', (req, res) => {
    const { name, gender, age, destination, timeSlot, identityNo } = req.body;

    const query = 'INSERT INTO seller_bookings (name, gender, age, destination, time_slot, identity_no) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [name, gender, age, destination, timeSlot, identityNo], (err, result) => {
        if (err) {
            console.error('Error inserting seller booking:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Seller booking recorded successfully!' });
    });
});

// Visitor Booking API
app.post('/api/visitor/book', (req, res) => {
    const { name, gender, age, destination, timeSlot, identityNo, noOfMembers, memberNames, memberAge, memberIdentityNo, totalAmount } = req.body;

    const query = 'INSERT INTO visitor_bookings (name, gender, age, destination, time_slot, identity_no, no_of_members, member_names, member_age, member_identity_no, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, gender, age, destination, timeSlot, identityNo, noOfMembers, memberNames, memberAge, memberIdentityNo, totalAmount], (err, result) => {
        if (err) {
            console.error('Error inserting visitor booking:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Visitor booking recorded successfully!' });
    });
});

// Parking Booking API
app.post('/api/parking/book', (req, res) => {
    const { city, area, name, vehicleNumber, slotNumber } = req.body;

    const query = 'INSERT INTO parking_bookings (city, area, name, vehicle_number, slot_number) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [city, area, name, vehicleNumber, slotNumber], (err, result) => {
        if (err) {
            console.error('Error inserting parking booking:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Parking slot booked successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

const path = require('path');

const app = express();

// API routes tere wale upar rahenge

// Frontend serve karne wali line
app.use(express.static(path.join(__dirname, '../frontend')));

// Agar koi route match nahi hua to index.html de
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});
