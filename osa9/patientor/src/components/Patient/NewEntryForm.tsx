import {
  TextField,
  Grid,
  Button,
  Box,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Typography,
  Rating,
  Select,
  OutlinedInput,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useState } from 'react';
import {
  Patient,
  Diagnosis,
  HealthCheckRating,
  newBaseEntry,
  Entrytype,
  Discharge,
  SickLeave,
  EntryWithoutId,
} from '../../types';
import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Props {
  diagnoses: Diagnosis[];
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  setNotificationMessage: React.Dispatch<React.SetStateAction<string>>;
}

const NewEntryForm = ({
  diagnoses,
  patient,
  setPatient,
  setNotificationMessage,
}: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<number | null>(
    null
  );
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  const [hospitalEntry, setHospitalEntry] = useState(false);
  const [healthCheckEntry, setHealthCheckEntry] = useState(true);
  const [occupationalHealthcareEntry, setOccupationalHealthcareEntry] =
    useState(false);
  const [entryType, setEntryType] = useState<Entrytype>(Entrytype.HealthCheck);
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis['code']>
  >([]);

  const { id } = useParams();
  const allCodes = diagnoses.map((d) => d.code);

  const cancel = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating(null);
    setDiagnosisCodes([]);
    setShowForm(false);
    setSickLeaveStart('');
    setSickLeaveEnd('');
    setDischargeCriteria('');
    setDischargeDate('');
    setEmployerName('');
    setEntryType(Entrytype.HealthCheck);
  };

  const handleEntryTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value === 'HealthCheck') {
      setHospitalEntry(false);
      setHealthCheckEntry(true);
      setOccupationalHealthcareEntry(false);
      setEntryType(Entrytype.HealthCheck);
    }
    if (event.target.value === 'OccupationalHealthcare') {
      setHospitalEntry(false);
      setHealthCheckEntry(false);
      setOccupationalHealthcareEntry(true);
      setEntryType(Entrytype.OccupationalHealthcare);
    }
    if (event.target.value === 'Hospital') {
      setHospitalEntry(true);
      setHealthCheckEntry(false);
      setOccupationalHealthcareEntry(false);
      setEntryType(Entrytype.Hospital);
    }
  };

  const addEntry = async () => {
    const newPatientBaseEntry: newBaseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    let newPatientEntry: EntryWithoutId | null = null;

    if (healthCheckEntry) {
      const rating: HealthCheckRating = healthCheckRating
        ? Number(healthCheckRating) - 1
        : 0;
      newPatientEntry = {
        ...newPatientBaseEntry,
        type: Entrytype.HealthCheck,
        healthCheckRating: rating,
      };
    }

    if (hospitalEntry) {
      const discharge: Discharge = {
        criteria: dischargeCriteria,
        date: dischargeDate,
      };
      newPatientEntry = {
        ...newPatientBaseEntry,
        type: Entrytype.Hospital,
        discharge,
      };
    }

    if (occupationalHealthcareEntry) {
      const sickLeave: SickLeave = {
        startDate: sickLeaveStart,
        endDate: sickLeaveEnd,
      };
      newPatientEntry = {
        ...newPatientBaseEntry,
        type: Entrytype.OccupationalHealthcare,
        employerName,
        sickLeave: sickLeaveStart && sickLeaveEnd ? sickLeave : undefined,
      };
    }

    try {
      if (id && newPatientEntry) {
        const entryData = await patientService.createEntry(id, newPatientEntry);
        setShowForm(false);
        setPatient({ ...patient, entries: [...patient.entries, entryData] });
        cancel();
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (
          e?.response?.data &&
          typeof e?.response?.data === 'object' &&
          'error' in e?.response?.data &&
          typeof e?.response?.data.error === 'string'
        ) {
          const message = e?.response.data.error;
          console.log(message);
          setNotificationMessage(message);
          setTimeout(() => setNotificationMessage(''), 5000);
        } else {
          setNotificationMessage('Unrecognized axios error');
          setTimeout(() => setNotificationMessage(''), 5000);
        }
      } else {
        console.error('Unknown error', e);
        setNotificationMessage('Unknown error');
        setTimeout(() => setNotificationMessage(''), 5000);
      }
    }
  };

  return showForm ? (
    <Box sx={{ margin: '20px', padding: '10px', border: '1px solid black' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} container>
          <TextField
            id='description'
            label='Description'
            variant='standard'
            fullWidth
            value={description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDescription(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='date'
            label='Date'
            variant='standard'
            type='date'
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={date}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDate(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='specialist'
            label='Specialist'
            variant='standard'
            fullWidth
            value={specialist}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSpecialist(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='diagnosisCodes'>Diagnosis codes</InputLabel>
            <Select
              labelId='diagnosisCodes'
              id='diagnosisCodes'
              multiple
              value={diagnosisCodes}
              onChange={(
                event: SelectChangeEvent<Array<Diagnosis['code']>>
              ) => {
                const value = event.target.value;
                setDiagnosisCodes(
                  typeof value === 'string' ? value.split(',') : value
                );
              }}
              input={<OutlinedInput label='Code' />}
            >
              {allCodes.map((code) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id='entryType'>Entry type</FormLabel>
            <RadioGroup
              aria-labelledby='entryType'
              defaultValue='HealthCheck'
              name='entryTypes'
              value={entryType}
              onChange={handleEntryTypeChange}
            >
              <FormControlLabel
                value='HealthCheck'
                control={<Radio />}
                label='HealthCheck'
              />
              <FormControlLabel
                value='OccupationalHealthcare'
                control={<Radio />}
                label='OccupationalHealthcare'
              />
              <FormControlLabel
                value='Hospital'
                control={<Radio />}
                label='Hospital'
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {healthCheckEntry && (
          <Grid item xs={12}>
            <Typography component='legend'>Health Rating</Typography>
            <Rating
              name='rating'
              value={healthCheckRating}
              icon={<FavoriteIcon fontSize='inherit' />}
              max={4}
              onChange={(_event, newValue) => {
                setHealthCheckRating(newValue);
              }}
            />
          </Grid>
        )}
        {hospitalEntry && (
          <>
            <Grid item xs={4}>
              <TextField
                id='dischargeDate'
                label='Discharge Date'
                variant='standard'
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
                value={dischargeDate}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setDischargeDate(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id='dischargeCriteria'
                label='Discharge Criteria'
                variant='standard'
                fullWidth
                value={dischargeCriteria}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setDischargeCriteria(event.target.value);
                }}
              />
            </Grid>
          </>
        )}
        {occupationalHealthcareEntry && (
          <>
            <Grid item xs={12}>
              <TextField
                id='employerName'
                label='Employer Name'
                variant='standard'
                fullWidth
                value={employerName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEmployerName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id='sickLeaveStart'
                label='Sick Leave Start'
                variant='standard'
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
                value={sickLeaveStart}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setSickLeaveStart(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id='sickLeaveEnd'
                label='Sick Leave End'
                variant='standard'
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
                value={sickLeaveEnd}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setSickLeaveEnd(event.target.value);
                }}
              />
            </Grid>
          </>
        )}
        <Grid item xs={6}>
          <Button variant='contained' color='error' onClick={cancel}>
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6} container justifyContent={'flex-end'}>
          <Button variant='contained' color={'inherit'} onClick={addEntry}>
            ADD
          </Button>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Box sx={{ margin: '20px 20px 20px 0px' }}>
      <Button variant='contained' onClick={() => setShowForm(true)}>
        New Entry
      </Button>
    </Box>
  );
};

export default NewEntryForm;
