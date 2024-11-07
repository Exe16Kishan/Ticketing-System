export interface Event {
    id: string;
    title: string;
    description: string;
    location: string;
    seat: number;
    date: Date;
    time: string;
    organizerId: string;
    organizer: {
      name:string | null;
    };
    createdAt: Date;
    updatedAt: Date;
  }