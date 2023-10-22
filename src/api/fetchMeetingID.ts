import axios, { AxiosResponse } from 'axios';

type ResponseData = {
  success: boolean,
  data: {
    id: string
  }
}

export const FetchMeetingID = async () => {
  const data = {
    title: 'Sample meeting',
    preferred_region: 'ap-south-1',
    record_on_start: false,
  }

  const orgID = process.env.REACT_APP_ORGANIZATION_ID;
  const apiKey = process.env.REACT_APP_DYTE_API_KEY;
  const base64ApiKey = btoa(`${orgID}:${apiKey}`);

  const options = {
    method: 'POST',
    url: 'https://api.dyte.io/v2/meetings',
    headers: {
      Authorization: `Basic ${base64ApiKey}`,
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const response: AxiosResponse<ResponseData> = await axios(options);
    if (response.data.success) {
      // console.log(response.data.data.id)
      return response.data.data.id;
    }
  } catch (error) {
    console.error('Error creating meeting:', error);
  }
};
