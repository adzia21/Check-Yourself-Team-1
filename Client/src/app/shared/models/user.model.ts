export interface User {
  id: number;
  name?: string;
  surname?: string;
  userId: number;
  mail?: string;
  title?: string;
  localization?: string;
  githubUrl?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  siteUrl?: string;
  cashRequirements?: string;
  timeRequirements: string;
  typeOfContract: string;
  aboutMe: string;
  experience: Experience[];
  education: Education[];
  qualification: Qualification[];
  skills: Skills[];
  organizations: string[];
  softSkills: string[];
  hobbies: string[];
}

export interface Experience {
  name: string;
  startedDate: Date;
  finishedDate: Date;
  tasks: string[];
}

export interface Education {
  name: string;
  localization: string;
  startedDate: Date;
  finishedDate: Date;
  tasks: string[];
}

export interface Qualification {
  name: string;
  certificateName: string;
  date: Date;
}

export interface Skills {
  additionalProp1: Skill;
  additionalProp2: Skill;
  additionalProp3: Skill;
}

export interface Skill {
  additionalProp1: number;
  additionalProp2: number;
  additionalProp3: number;
}
