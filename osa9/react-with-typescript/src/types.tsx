export interface HeaderProps {
  courseName: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDesc extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseWithDesc {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartBaseWithDesc {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartRequirements extends CoursePartBaseWithDesc {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirements;
