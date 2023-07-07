export const apiError = (code: unknown): {status: number; message: string} => {
  const messageTemp = {
    '400': 'response is invalid',
    '404': "user  doesn't exist",
  };
  if (code === '400' || code === '404') {
    const message: string = messageTemp[code];
    return {status: Number(code), message};
  } else {
    return {status: 500, message: 'Smth wrong'};
  }
};
