import express from 'express';
import dataService from '../services/dataService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(dataService.getDiagnoses());
});

export default router;
