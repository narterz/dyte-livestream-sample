import { DyteMeeting, provideDyteDesignSystem } from '@dytesdk/react-ui-kit';
import { useDyteMeeting } from '@dytesdk/react-web-core';
import { useRef, useEffect } from 'react';

// UI of meeting

function MyMeeting() {
  const { meeting } = useDyteMeeting();
  const meetingEl = useRef<HTMLElement>();

  useEffect(() => {
    // Ui config
    if(meetingEl.current){
      provideDyteDesignSystem(meetingEl.current, {
        googleFont: 'Lobster',
        // sets light background colors
        theme: 'light',
        colors: {
          danger: '#ffac00',
          brand: {
            300: '#00FFE1',
            400: '#00FFFF',
            500: '#00E1D4',
            600: '#007B74',
            700: '#00655F',
          },
          text: '#071428',
          'text-on-brand': '#ffffff',
          'video-bg': '#E5E7EB',
        },
        borderRadius: 'extra-rounded',
      });
    }
  }, []);

  return (
    <div style={{ height: '480px' }}>
      <DyteMeeting mode="fill" meeting={meeting} showSetupScreen={false}/>
    </div>
  );
}

export default MyMeeting;