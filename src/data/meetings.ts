export interface AvailabilitySlot {
  id: string;
  userId: string;
  title: string;
  start: string;
  end: string;
  day: string;
}

export const availabilitySlots: AvailabilitySlot[] = [];

export interface Meeting {
  id: string;
  title: string;
  start: string;
  end?: string;
  status: 'pending' | 'confirmed' | 'declined';
  organizerId: string;
  inviteeId: string;
  backgroundColor?: string;
}

export const meetings: Meeting[] = [
  {
    id: 'm1',
    title: 'Meeting with TechWave AI',
    start: new Date().toISOString().split('T')[0],
    status: 'confirmed',
    organizerId: 'i1',
    inviteeId: 'e1',
    backgroundColor: '#2563EB',
  },
  {
    id: 'm2',
    title: 'Pitch Review',
    start: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'pending',
    organizerId: 'i2',
    inviteeId: 'e1',
    backgroundColor: '#F59E0B',
  },
];