import axios, { AxiosResponse } from "axios";
import { FetchMeetingID } from "./fetchMeetingID";// Path to MeetingID

// Returns a promise string containing the token needed for Meeting component

//Return type for the response from FetchToken
type ResponseData = {
    success: boolean,
    data: {
        token: string
    }
}

export const fetchToken = async () => {
    try {
        const id = await FetchMeetingID();
        const orgID = process.env.REACT_APP_ORGANIZATION_ID;
        const apiKey = process.env.REACT_APP_DYTE_API_KEY;
        const base64ApiKey = btoa(`${orgID}:${apiKey}`);
        const options = {
            method: "POST",
            url: `https://api.dyte.io/v2/meetings/${id}/participants`,
            headers: { 
                'Content-Type': 'application/json', 
                Authorization: `Basic ${base64ApiKey}`
             },
            data: {
                name: 'Mary Sue',
                picture: 'https://i.imgur.com/test.jpg',
                preset_name: 'livestream_host',
                custom_participant_id: "1234",
            }
        };
        const response: AxiosResponse<ResponseData> = await axios(options);
        if (response.data.success) {
            console.log(response.data.data.token)
            return response.data.data.token
        }
    } catch (error) {
        console.error(error);
    }
};

