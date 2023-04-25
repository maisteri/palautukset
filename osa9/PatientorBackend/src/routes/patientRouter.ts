import express from 'express';
import dataService from '../services/dataService';
import { parseNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(dataService.getNonSensitiveDataOfPatients());
});

router.get('/:id', (req, res) => {
  res.status(200).json(dataService.getPatient(req.params.id));
});

router.post('/', (req, res) => {
  const newEntry = dataService.addPatient(parseNewPatient(req.body));
  res.status(204).json(newEntry);
});

export default router;
