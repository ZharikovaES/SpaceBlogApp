export const getCurrentDate = () : Date => {
  const options = { timeZone: 'America/New_York' };
  const now = new Date();
  const currentDateStr = now.toLocaleString('en-US', options);
  const currentDate = new Date(currentDateStr);

  return currentDate;
}