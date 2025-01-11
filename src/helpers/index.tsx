export function getTimeBasedGreeting(): string {
  // Get the current date and time
  const currentHour = new Date().getHours();

  // Set the greeting based on current hour
  let greeting: string;

  if (currentHour >= 0 && currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  // Return the greeting
  return greeting;
}

// export const statusCodes = {
//   SUCCESS: '00',
//   CIF_SUCCESS: '01',
//   DEDUP_CHECK: '02',
//   SERVICE_NOT_AVAILABLE: '55',
//   DUPLICATE_REQUEST: '77',
//   BAD_REQUEST: '99',
//   UNAUTHORIZED: '41',
//   PROFILE_LINKED_ALREADY: '62',
//   BAD_REQUEST_HTTP_CODE: 400,
//   UNAUTHORIZED_HTTP_CODE: 401,
//   SERVER_ERROR_HTTP_CODE: 500,
//   FETCH_ERROR: 'FETCH_ERROR',
// };

export enum StatusCodes {
  SUCCESS = '00',
  CIF_SUCCESS = '01',
  DEDUP_CHECK = '02',
  SERVICE_NOT_AVAILABLE = '55',
  DUPLICATE_REQUEST = '77',
  BAD_REQUEST = '99',
  UNAUTHORIZED = '41',
  PROFILE_LINKED_ALREADY = '62',
  BAD_REQUEST_HTTP_CODE = 400,
  UNAUTHORIZED_HTTP_CODE = 401,
  SERVER_ERROR_HTTP_CODE = 500,
  FETCH_ERROR = 'FETCH_ERROR',
}
