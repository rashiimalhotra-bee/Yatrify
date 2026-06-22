-- Database setup script for Yatrify
CREATE DATABASE IF NOT EXISTS yatrify_db;
USE yatrify_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS seller_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    destination VARCHAR(255) NOT NULL,
    time_slot VARCHAR(100) NOT NULL,
    identity_no VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS visitor_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    destination VARCHAR(255) NOT NULL,
    time_slot VARCHAR(100) NOT NULL,
    identity_no VARCHAR(100) NOT NULL,
    no_of_members INT NOT NULL,
    member_names TEXT,
    member_age VARCHAR(100),
    member_identity_no VARCHAR(100),
    total_amount DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS parking_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(255) NOT NULL,
    area VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    vehicle_number VARCHAR(100) NOT NULL,
    slot_number VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
