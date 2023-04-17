import express from 'express';
import dataService from '../services/dataService';
import { parseNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(dataService.getNonSensitiveDataOfPatients());
});

router.post('/', (req, res) => {
  const newEntry = dataService.addPatient(parseNewPatient(req.body));
  res.status(204).json(newEntry);
});

export default router;
