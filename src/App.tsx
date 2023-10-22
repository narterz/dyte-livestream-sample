import { useEffect, useState } from 'react';
import { useDyteClient, DyteProvider } from '@dytesdk/react-web-core';
import MyMeeting from './MyMeeting';
import { fetchToken } from './api/fetchToken';
import { FetchMeetingID } from "./api/fetchMeetingID";

export default function App() {
  const [meeting, initMeeting] = useDyteClient();
  const [token, setToken] = useState<string>('');

  const getToken = async () => {
    const token = await fetchToken();
    if(token){
      setToken(token);
    } else {
      console.log("There was an error obtaining the token");
    }
  }

  useEffect(() => {
    getToken();
    console.log(token)
    initMeeting({
      authToken: token,
      defaults: {
        audio: false,
        video: false,
      },
    });
  }, []);

  return (
    <DyteProvider value={meeting}>
      {/* Render your UI here. Subcomponents can now use the `useDyteMeeting` and `useDyteSelector` hooks */}
      <MyMeeting />
    </DyteProvider>
  );
}