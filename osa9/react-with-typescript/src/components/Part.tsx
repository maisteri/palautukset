import { CoursePart } from '../types';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }): JSX.Element => {
  switch (coursePart.kind) {
    case 'basic':
      return (
        <>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <br />
          <i>{coursePart.description}</i>
        </>
      );
    case 'background':
      return (
        <>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <br />
          <i>{coursePart.description}</i>
          <br />
          submit to {coursePart.backgroundMaterial}
        </>
      );
    case 'group':
      return (
        <>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <br />
          project exercises {coursePart.groupProjectCount}
        </>
      );
    case 'special':
      return (
        <>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <br />
          <i>{coursePart.description}</i>
          <br />
          required skills{': '}
          {coursePart.requirements.map((req) => (
            <>{req}, </>
          ))}
        </>
      );
    default:
      return assertNever(coursePart);
  }
  return <div>wadap?</div>;
};

export default Part;
