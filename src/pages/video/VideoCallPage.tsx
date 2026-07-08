import React, { useState } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Monitor, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';

export const VideoCallPage: React.FC = () => {
    const { user } = useAuth();
    const [callActive, setCallActive] = useState(false);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [screenSharing, setScreenSharing] = useState(false);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Video Call</h1>
                <p className="text-gray-600">Connect face-to-face with your partners</p>
            </div>

            {/* Main video area */}
            <div className="relative bg-gray-900 rounded-xl overflow-hidden" style={{ minHeight: '400px' }}>

                {/* Remote video (main screen) */}
                <div className="w-full h-full flex items-center justify-center" style={{ minHeight: '400px' }}>
                    {callActive ? (
                        <div className="text-center">
                            <div className="w-24 h-24 rounded-full bg-primary-600 flex items-center justify-center mx-auto mb-4">
                                <Users size={40} className="text-white" />
                            </div>
                            <p className="text-white text-lg font-medium">Connected</p>
                            <p className="text-gray-400 text-sm">Your partner's video would appear here</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                                <Video size={40} className="text-gray-400" />
                            </div>
                            <p className="text-gray-400 text-lg">Call not started</p>
                            <p className="text-gray-500 text-sm mt-1">Click Start Call to begin</p>
                        </div>
                    )}
                </div>

                {/* Local video (small box) */}
                {callActive && (
                    <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-700 rounded-lg flex items-center justify-center border-2 border-gray-600">
                        {videoEnabled ? (
                            <Avatar
                                src={user?.avatarUrl}
                                alt={user?.name || ''}
                                size="md"
                            />
                        ) : (
                            <VideoOff size={20} className="text-gray-400" />
                        )}
                    </div>
                )}

                {/* Screen sharing indicator */}
                {screenSharing && (
                    <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs px-3 py-1 rounded-full">
                        Screen Sharing Active
                    </div>
                )}
            </div>

            {/* Call controls */}
            <Card>
                <CardBody>
                    <div className="flex items-center justify-center gap-4">

                        {/* Audio toggle */}
                        <button
                            onClick={() => setAudioEnabled(!audioEnabled)}
                            className={`p-4 rounded-full transition-colors ${audioEnabled ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-error-500 hover:bg-error-700 text-white'
                                }`}
                            title={audioEnabled ? 'Mute' : 'Unmute'}
                        >
                            {audioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                        </button>

                        {/* Start/End call */}
                        <button
                            onClick={() => {
                                setCallActive(!callActive);
                                if (callActive) {
                                    setScreenSharing(false);
                                }
                            }}
                            className={`p-5 rounded-full transition-colors ${callActive ? 'bg-error-500 hover:bg-error-700 text-white' : 'bg-success-500 hover:bg-success-700 text-white'
                                }`}
                            title={callActive ? 'End Call' : 'Start Call'}
                        >
                            {callActive ? <PhoneOff size={24} /> : <Phone size={24} />}
                        </button>

                        {/* Video toggle */}
                        <button
                            onClick={() => setVideoEnabled(!videoEnabled)}
                            className={`p-4 rounded-full transition-colors ${videoEnabled ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-error-500 hover:bg-error-700 text-white'
                                }`}
                            title={videoEnabled ? 'Turn off camera' : 'Turn on camera'}
                        >
                            {videoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                        </button>

                        {/* Screen share */}
                        <button
                            onClick={() => setScreenSharing(!screenSharing)}
                            className={`p-4 rounded-full transition-colors ${screenSharing ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                }`}
                            title={screenSharing ? 'Stop sharing' : 'Share screen'}
                        >
                            <Monitor size={20} />
                        </button>

                    </div>

                    {/* Status text */}
                    <p className="text-center text-sm text-gray-500 mt-4">
                        {callActive ? '🟢 Call in progress' : '⚪ Ready to call'}
                    </p>
                </CardBody>
            </Card>
        </div>
    );
};