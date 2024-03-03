export interface SimplifiedJobOffer {
  id: number;
  companyName: string;
  title: string;
  localization: string;
  technologies: string[];
}

export interface FullJobOffer {
    id: number,
    companyName: string,
    title: string,
    localization: string,
    contractType: string,
    expirationDate: Date,
    description: string,
    technologies: string[],
    tools: string[],
    platforms: string[],
    languages: string[],
    mainTasks: string[],
    desiredKnowledge: string[],
    organizationOfWork: string[],
    benefits: string[],
    whatWeOffer: string[],
    additionalInformation: string[]
  }
