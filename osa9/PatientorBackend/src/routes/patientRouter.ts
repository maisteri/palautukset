import express from 'express';
import dataService from '../services/dataService';
import { parseNewPatient, parseNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(dataService.getNonSensitiveDataOfPatients());
});

router.get('/:id', (req, res) => {
  res.status(200).json(dataService.getPatient(req.params.id));
});

router.post('/', (req, res) => {
  const newEntry = dataService.addPatient(parseNewPatient(req.body));
  res.status(201).json(newEntry);
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = dataService.addPatientEntry(
      req.params.id,
      parseNewPatientEntry(req.body)
    );
    return res.status(201).json(newEntry);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        error: `malformatted parameters: ${error.message}`,
      });
    }
    return res.status(400).json({
      error: `unknown error`,
    });
  }
});

export default router;
