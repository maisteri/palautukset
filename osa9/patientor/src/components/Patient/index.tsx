import { Diagnosis, Patient } from '../../types';
import { Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';
import EntryDetails from '../EntryDetails';

const PatientCard = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await patientService.getOne(id);
        setPatient(data);
      }
      const data2 = await diagnosesService.getAll();
      setDiagnoses(data2);
    };
    void fetchData();
  }, [id]);

  if (!patient || !diagnoses) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {patient.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          SSN: {patient.ssn}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          DoB: {patient.dateOfBirth}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Gender: {patient.gender}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Occuopation: {patient.occupation}
        </Typography>
        <Typography gutterBottom variant='h6' component='div'>
          entries
        </Typography>
        {patient.entries.map((entry) => {
          return (
            <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PatientCard;
