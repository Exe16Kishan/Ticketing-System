export interface Event {
  id: string;
  title: string;
  description: string;
  detailDescription: string;
  location: string;
  type: 'MUSIC' | 'CONCERT' | 'ART' | 'CULTURE' | 'HACKATHON' | 'SEMINAR';
  seat: number;
  price: number;
  date: Date;
  time: string;
  organizerId: string;
  organizer: {
    name: string | null;
  };
  caste: {
    performName: string;
    occupation: string;
    image: string | null;
  }[]
  createdAt: Date;
  updatedAt: Date;
}
