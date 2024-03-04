export interface User {
  id?: number;
  name: string;
  surname: string;
  userId?: number;
  mail: string;
  title: string;
  localization: string;
  githubUrl: string;
  phoneNumber: string;
  dateOfBirth: Date;
  siteUrl: string;
  cashRequirements?: string;
  timeRequirements: string;
  typeOfContract: string;
  aboutMe: string;
  experience?: Experience[];
  education?: Education[];
  qualification?: Qualification[];
  skills?: any;
  organizations?: string[];
  softSkills?: string[];
  hobbies?: string[];
}

export interface Experience {
  name: string;
  startedDate: Date;
  finishedDate: Date;
  tasks: string[];
}

export interface Education {
  name: string;
  schoolName: string;
  localization: string;
  startedDate: Date;
  finishedDate: Date;
  title: string;
}

export interface Qualification {
  name: string;
  certificateName: string;
  date: Date;
  certificateNumber: string;
  companyName: string
}

export interface Skills {
  type: Skill;
}

export interface Skill {
  key: number;
}



// {
//   "title": "Senior Software Developer",
//   "localization": "Warszawa, Polska",
//   "githubUrl": "https://github.com/exampleuser",
//   "phoneNumber": "+48 123 456 789",
//   "dateOfBirth": "1990-05-15",
//   "siteUrl": "https://www.example.com",
//   "cashRequirements": "Do negocjacji",
//   "timeRequirements": "Pełny etat",
//   "typeOfContract": "Umowa o pracę",
//   "aboutMe": "Jestem doświadczonym programistą z ponad 7-letnim doświadczeniem w branży IT. Posiadam umiejętności w zakresie Java, Python i JavaScript. Jestem zdeterminowany, aby doskonalić swoje umiejętności i przyczyniać się do sukcesu projektów, w których uczestniczę.",
//   "experience": [
//       {
//           "name": "Software House XYZ",
//           "startedDate": "2017-01-01",
//           "finishedDate": null,
//           "tasks": [
//               "Rozwój i utrzymanie aplikacji internetowych w technologii Java Spring",
//               "Współpraca z zespołem w celu zapewnienia wysokiej jakości oprogramowania",
//               "Optymalizacja wydajności i skalowalności aplikacji"
//           ]
//       }
//   ],
//   "education": [
//       {
//           "name": "Politechnika Warszawska",
//           "title": "Programmer",
//           "schoolName": "Best school ever",
//           "startedDate": "2010-09-01",
//           "finishedDate": "2015-06-30"
//       }
//   ],
//   "qualification": [
//       {
//           "name": "Oracle Certified Professional, Java SE 8 Programmer",
//           "certificateName": "OCPJP",
//           "certificateNumber": "321312",
//           "companyName": "Companion",
//           "date": "2016-07-15"
//       }
//   ],
//   "skills": {
//       "Backend": {
//           "skill": {
//               "C++": 80,
//               "Python": 90,
//               "Java": 100
//           }
//       },
//       "Frontend": {
//           "skill": {
//               "Angular": 75,
//               "JavaScript": 90,
//               "React": 80,
//               "HTML/CSS": 85
//           }
//       },
//       "Database": {
//           "skill": {
//               "MySQL": 85,
//               "MongoDB": 80,
//               "SQL": 90
//           }
//       }
//   },
//   "organizations": [
//       "IEEE Student Branch",
//       "Stowarzyszenie Programistów Polskich"
//   ],
//   "softSkills": [
//       "Komunikatywność",
//       "Umiejętność pracy w zespole",
//       "Kreatywność"
//   ],
//   "hobbies": [
//       "Gra na gitarze",
//       "Podróże",
//       "Sporty ekstremalne"
//   ]
// }