import { Diagnosis, Entry, Entrytype } from '../../types';
import { Card, CardContent } from '@mui/material';

const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case Entrytype.Hospital:
      return (
        <Card>
          <CardContent>
            <div>
              {entry.date} {entry.description}
            </div>
            <ul>
              {entry.diagnosisCodes?.map((code) => {
                const diag = diagnoses.find((d) => d.code === code);
                return (
                  <li key={code}>
                    {code} {diag?.name}
                  </li>
                );
              })}
            </ul>
            <div>diagnose by: {entry.specialist}</div>
            <div>
              discharge: {entry.discharge.date} {entry.discharge.criteria}
            </div>
          </CardContent>
        </Card>
      );
    case Entrytype.HealthCheck:
      return (
        <Card>
          <CardContent>
            <div>
              {entry.date} {entry.description}
            </div>
            <ul>
              {entry.diagnosisCodes?.map((code) => {
                const diag = diagnoses.find((d) => d.code === code);
                return (
                  <li key={code}>
                    {code} {diag?.name}
                  </li>
                );
              })}
            </ul>
            <div>diagnose by: {entry.specialist}</div>
            <div>
              healthCheckRating: {entry.healthCheckRating} {}
            </div>
          </CardContent>
        </Card>
      );
    case Entrytype.OccupationalHealthcare:
      return (
        <Card>
          <CardContent>
            <div>
              {entry.date} {entry.description}
            </div>
            <ul>
              {entry.diagnosisCodes?.map((code) => {
                const diag = diagnoses.find((d) => d.code === code);
                return (
                  <li key={code}>
                    {code} {diag?.name}
                  </li>
                );
              })}
            </ul>
            <div>diagnose by: {entry.specialist}</div>
            <div>
              Sickleave: {entry.sickLeave?.startDate} ...{' '}
              {entry.sickLeave?.endDate}
            </div>
          </CardContent>
        </Card>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
