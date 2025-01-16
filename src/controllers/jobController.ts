import { Request, Response } from 'express';
import pool from '../config/database';
import { OkPacket, RowDataPacket } from 'mysql2';

// Create a new job posting
export const createJob = (req: Request, res: Response) => {
    const { title, company, location, salary, description } = req.body;
    const query = 'INSERT INTO jobs (title, company, location, salary, description) VALUES (?, ?, ?, ?, ?)';
    
    pool.query(query, [title, company, location, salary, description], (err, results: OkPacket) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, title, company, location, salary, description });
    });
};

// Retrieve all job postings
export const getJobs = (req: Request, res: Response) => {
    const query = 'SELECT * FROM jobs';
    
    pool.query(query, (err, results: RowDataPacket[]) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Retrieve a single job posting by ID
export const getJobById = (req: Request, res: Response) => {
    const query = 'SELECT * FROM jobs WHERE id = ?';
    
    pool.query(query, [req.params.id], (err, results: RowDataPacket[]) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Job not found');
        }
    });
};

// Update a job posting by ID
export const updateJob = (req: Request, res: Response) => {
    const { title, company, location, salary, description } = req.body;
    const query = 'UPDATE jobs SET title = ?, company = ?, location = ?, salary = ?, description = ? WHERE id = ?';
    
    pool.query(query, [title, company, location, salary, description, req.params.id], (err, results: OkPacket) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows > 0) {
            res.json({ id: req.params.id, title, company, location, salary, description });
        } else {
            res.status(404).send('Job not found');
        }
    });
};

// Delete a job posting by ID
export const deleteJob = (req: Request, res: Response) => {
    const query = 'DELETE FROM jobs WHERE id = ?';
    
    pool.query(query, [req.params.id], (err, results: OkPacket) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).send('Job not found');
        }
    });
};
