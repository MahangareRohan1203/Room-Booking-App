drop table if exists location,home,room,bed,customer, bookings, users; -- users;
CREATE TABLE users(
        user_id BIGSERIAL PRIMARY KEY,
        username VARCHAR(255),
        password VARCHAR(255)
);

-- Location Table
CREATE TABLE location (
    location_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    user_id BIGINT REFERENCES users(user_id)
--    address VARCHAR(255)
--    is_deleted BOOLEAN DEFAULT FALSE
--    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Home Table
CREATE TABLE home (
    home_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    location_id BIGINT REFERENCES location(location_id)
--    is_deleted BOOLEAN DEFAULT FALSE,
--    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bed Table
CREATE TABLE bed (
    bed_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    home_id BIGINT REFERENCES home(home_id)
--    is_deleted BOOLEAN DEFAULT FALSE,
--    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customer Table
CREATE TABLE customer (
    customer_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(20) NOT NULL
);

-- Bookings Table
CREATE TABLE bookings (
    booking_id BIGSERIAL PRIMARY KEY,
    from_date TIMESTAMP NOT NULL,
    to_date TIMESTAMP NOT NULL,
    bed_id BIGINT REFERENCES bed(bed_id),
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_id BIGINT REFERENCES customer(customer_id)

);


-- INSERT  LOCATIONS
INSERT INTO location (name, user_id)
VALUES
('Marvel Sonnet', 1),
('Nitron', 1),
('Wadgaon Sheri B-1', 1),
('Wadgaon Sheri B-2', 1);


INSERT INTO home(name, location_id)
VALUES
('Five Sharing', 1),
('Four Sharing', 1),
('Three Sharing', 1),
('Deluxe Room', 1),
('Single Room', 1);


INSERT INTO bed(name, home_id)
VALUES
('B1', 1),
('B2', 1),
('B3', 1),
('B4', 1),
('B5', 1);

-- four sharing Marvel
INSERT INTO bed(name, home_id)
VALUES
('Fo-1', 2),
('Fo-2', 2),
('Fo-3', 2),
('Fo-4', 2);

-- Three sharing Marvel
INSERT INTO bed(name, home_id)
VALUES
('Th-1', 3),
('Th-2', 3),
('Th-3', 3);

-- Two sharing Marvel
INSERT INTO bed(name, home_id)
VALUES
('King-1', 4);

-- One sharing Marvel
INSERT INTO bed(name, home_id)
VALUES
('S-1', 5);


-- NITRON
INSERT INTO home(name, location_id)
VALUES
('Four Sharing', 2),
('Triple Sharing', 2),
('Dual Sharing', 2);

INSERT INTO bed(name, home_id)
VALUES
('Upper Bunk', 6),
('Lower Bunk', 6),
('S-1', 6),
('S-2', 6);

INSERT INTO bed(name, home_id)
VALUES
('TH-1', 7),
('TH-2', 7),
('TH-3', 7);

INSERT INTO bed(name, home_id)
VALUES
('TW-1', 8),
('TW-2', 8);

-- WADGAON -1
INSERT INTO home(name, location_id)
VALUES
('AC Twin Room', 3),
('Triple Sharing', 3),
('Dual Sharing', 3);

-- 9 IS NOT THERE AS EARLIER I HAVE DELETED ONE HOME
INSERT INTO bed(name, home_id)
VALUES
('B-1', 10),
('B-2', 10);

INSERT INTO bed(name, home_id)
VALUES
('TH-1', 11),
('TH-2', 11),
('TH-3', 11);

INSERT INTO bed(name, home_id)
VALUES
('TW-1', 12),
('TW-2', 12);

-- WADGAON -2
INSERT INTO home(name, location_id)
VALUES
('Dual Sharing-1', 4),
('Dual Sharing-2', 4),
('Dual Sharing-3', 4),
('Dual Sharing-4', 4);

INSERT INTO bed(name, home_id)
VALUES
('D1-1', 13),
('D1-2', 13);

INSERT INTO bed(name, home_id)
VALUES
('D2-1', 14),
('D2-2', 14);

INSERT INTO bed(name, home_id)
VALUES
('D3-1', 15),
('D3-2', 15);

INSERT INTO bed(name, home_id)
VALUES
('D4-1', 16),
('D4-2', 16);
