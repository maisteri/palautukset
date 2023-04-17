import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part) => (
        <p key={part.name}>
          <Part coursePart={part} />
        </p>
      ))}
    </>
  );
};

export default Content;
