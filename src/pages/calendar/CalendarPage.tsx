import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card, CardBody } from '../../components/ui/Card';
import { Clock, Trash2 } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { meetings, Meeting, availabilitySlots, AvailabilitySlot } from '../../data/meetings';
import { useAuth } from '../../context/AuthContext';

export const CalendarPage: React.FC = () => {
  const { user } = useAuth();
  const [allMeetings, setAllMeetings] = useState<Meeting[]>(meetings);
  const [slots, setSlots] = useState<AvailabilitySlot[]>(availabilitySlots);
  const [showSlotForm, setShowSlotForm] = useState(false);
  const [newSlot, setNewSlot] = useState({ title: '', start: '', end: '', day: '' });

  const meetingEvents = allMeetings.map(m => ({
    id: m.id,
    title: m.title,
    start: m.start,
    backgroundColor:
      m.status === 'confirmed' ? '#2563EB' :
        m.status === 'pending' ? '#F59E0B' : '#EF4444',
  }));

  const slotEvents = slots
    .filter(s => s.userId === user?.id)
    .map(s => ({
      id: 'slot-' + s.id,
      title: '🟢 ' + s.title,
      start: s.start,
      end: s.end,
      backgroundColor: '#14B8A6',
    }));

  const handleDateClick = (arg: any) => {
    const title = prompt('Enter meeting title:');
    if (title && user) {
      const newMeeting: Meeting = {
        id: String(allMeetings.length + 1),
        title,
        start: arg.dateStr,
        status: 'pending',
        organizerId: user.id,
        inviteeId: '',
        backgroundColor: '#F59E0B',
      };
      setAllMeetings([...allMeetings, newMeeting]);
    }
  };

  const handleAddSlot = () => {
    if (!newSlot.title || !newSlot.start || !newSlot.end || !newSlot.day) {
      alert('Please fill all fields');
      return;
    }
    if (!user) return;

    const slot: AvailabilitySlot = {
      id: String(slots.length + 1),
      userId: user.id,
      title: newSlot.title,
      start: newSlot.day + 'T' + newSlot.start,
      end: newSlot.day + 'T' + newSlot.end,
      day: newSlot.day,
    };

    setSlots([...slots, slot]);
    setNewSlot({ title: '', start: '', end: '', day: '' });
    setShowSlotForm(false);
  };

  const handleDeleteSlot = (id: string) => {
    setSlots(slots.filter(s => s.id !== id));
  };

  const handleStatusUpdate = (id: string, status: 'confirmed' | 'declined') => {
    setAllMeetings(allMeetings.map(m => m.id === id ? { ...m, status } : m));
  };

  const pendingMeetings = allMeetings.filter(m => m.status === 'pending');
  const mySlots = slots.filter(s => s.userId === user?.id);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meeting Calendar</h1>
          <p className="text-gray-600">Schedule and manage your meetings</p>
        </div>
        <Button
          leftIcon={<Clock size={18} />}
          onClick={() => setShowSlotForm(!showSlotForm)}
        >
          Add Availability
        </Button>
      </div>

      {/* Pending Requests */}
      {pendingMeetings.length > 0 && (
        <Card>
          <CardBody>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Pending Meeting Requests
            </h2>
            <div className="space-y-3">
              {pendingMeetings.map(m => (
                <div key={m.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 rounded-md gap-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{m.title}</p>
                    <p className="text-xs text-gray-500">{m.start}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="warning">Pending</Badge>
                    <Button
                      size="xs"
                      variant="success"
                      onClick={() => handleStatusUpdate(m.id, 'confirmed')}
                    >
                      Accept
                    </Button>
                    <Button
                      size="xs"
                      variant="error"
                      onClick={() => handleStatusUpdate(m.id, 'declined')}
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Availability Slot Form */}
      {showSlotForm && (
        <Card>
          <CardBody>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Add Availability Slot</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Available for meetings"
                  value={newSlot.title}
                  onChange={e => setNewSlot({ ...newSlot, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newSlot.day}
                  onChange={e => setNewSlot({ ...newSlot, day: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input
                  type="time"
                  value={newSlot.start}
                  onChange={e => setNewSlot({ ...newSlot, start: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input
                  type="time"
                  value={newSlot.end}
                  onChange={e => setNewSlot({ ...newSlot, end: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <Button onClick={handleAddSlot}>Save Slot</Button>
              <Button variant="outline" onClick={() => setShowSlotForm(false)}>Cancel</Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* My Availability Slots */}
      {mySlots.length > 0 && (
        <Card>
          <CardBody>
            <h2 className="text-lg font-medium text-gray-900 mb-4">My Availability Slots</h2>
            <div className="space-y-2">
              {mySlots.map(slot => (
                <div key={slot.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-md">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{slot.title}</p>
                    <p className="text-xs text-gray-500">{slot.day} | {slot.start.split('T')[1]} - {slot.end.split('T')[1]}</p>
                  </div>
                  <Button
                    size="xs"
                    variant="error"
                    leftIcon={<Trash2 size={14} />}
                    onClick={() => handleDeleteSlot(slot.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Calendar */}
      <Card>
        <CardBody>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="flex items-center gap-1 text-xs text-gray-600"><span className="w-3 h-3 rounded-full bg-primary-600 inline-block"></span> Confirmed</span>
            <span className="flex items-center gap-1 text-xs text-gray-600"><span className="w-3 h-3 rounded-full bg-accent-500 inline-block"></span> Pending</span>
            <span className="flex items-center gap-1 text-xs text-gray-600"><span className="w-3 h-3 rounded-full bg-error-500 inline-block"></span> Declined</span>
            <span className="flex items-center gap-1 text-xs text-gray-600"><span className="w-3 h-3 rounded-full bg-secondary-500 inline-block"></span> Available</span>
          </div>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth',
            }}
            
            events={[...meetingEvents, ...slotEvents]}
            dateClick={handleDateClick}
            height="auto"
            contentHeight="auto"
          />
        </CardBody>
      </Card>
    </div>
  );
};