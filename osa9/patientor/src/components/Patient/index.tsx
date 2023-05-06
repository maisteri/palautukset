import { Diagnosis, Patient } from '../../types';
import { Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';
import EntryDetails from './EntryDetails';
import NewEntryForm from './NewEntryForm';
import Notification from '../Notification';

const PatientCard = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [notificationMessage, setNotificationMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const patientData = await patientService.getOne(id);
        setPatient(patientData);
      }
      const diagnosesData = await diagnosesService.getAll();
      setDiagnoses(diagnosesData);
    };
    void fetchData();
  }, [id]);

  if (!patient || !diagnoses) {
    return null;
  }

  console.log(patient);

  return (
    <Box sx={{ margin: '20px 20px 20px 0px' }}>
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
      <Notification message={notificationMessage} />
      <NewEntryForm
        diagnoses={diagnoses}
        patient={patient}
        setPatient={setPatient}
        setNotificationMessage={setNotificationMessage}
      />

      <Typography gutterBottom variant='h6' component='div'>
        entries
      </Typography>
      {patient.entries.map((entry) => {
        return (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        );
      })}
    </Box>
  );
};

export default PatientCard;
