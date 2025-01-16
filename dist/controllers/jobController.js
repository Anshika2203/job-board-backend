"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.getJobById = exports.getJobs = exports.createJob = void 0;
const database_1 = __importDefault(require("../config/database"));
// Create a new job posting
const createJob = (req, res) => {
    const { title, company, location, salary, description } = req.body;
    const query = 'INSERT INTO jobs (title, company, location, salary, description) VALUES (?, ?, ?, ?, ?)';
    database_1.default.query(query, [title, company, location, salary, description], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, title, company, location, salary, description });
    });
};
exports.createJob = createJob;
// Retrieve all job postings
const getJobs = (req, res) => {
    const query = 'SELECT * FROM jobs';
    database_1.default.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};
exports.getJobs = getJobs;
// Retrieve a single job posting by ID
const getJobById = (req, res) => {
    const query = 'SELECT * FROM jobs WHERE id = ?';
    database_1.default.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            res.json(results[0]);
        }
        else {
            res.status(404).send('Job not found');
        }
    });
};
exports.getJobById = getJobById;
// Update a job posting by ID
const updateJob = (req, res) => {
    const { title, company, location, salary, description } = req.body;
    const query = 'UPDATE jobs SET title = ?, company = ?, location = ?, salary = ?, description = ? WHERE id = ?';
    database_1.default.query(query, [title, company, location, salary, description, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows > 0) {
            res.json({ id: req.params.id, title, company, location, salary, description });
        }
        else {
            res.status(404).send('Job not found');
        }
    });
};
exports.updateJob = updateJob;
// Delete a job posting by ID
const deleteJob = (req, res) => {
    const query = 'DELETE FROM jobs WHERE id = ?';
    database_1.default.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows > 0) {
            res.status(204).send();
        }
        else {
            res.status(404).send('Job not found');
        }
    });
};
exports.deleteJob = deleteJob;
