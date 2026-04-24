CREATE DATABASE IF NOT EXISTS ynov_ci;
USE ynov_ci;

INSERT INTO utilisateurs (nom, email, actif)
VALUES
    ('Thibaud Morvan', 'thibaud.morvan@example.com', TRUE),
    ('Mathieu Delarue', 'mathieu.delarue@example.com', TRUE),
    ('Gabin Rousseau', 'gabin.rousseau@example.com', TRUE),
    ('Killian Nowak', 'killian.nowak@example.com', FALSE);
