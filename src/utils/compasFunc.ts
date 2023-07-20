export const toTextualDescription = (degree: number) => {
  if (degree > 337.5) return 'Northerly';
  if (degree > 292.5) return 'North Westerly';
  if (degree > 247.5) return 'Westerly';
  if (degree > 202.5) return 'South Westerly';
  if (degree > 157.5) return 'Southerly';
  if (degree > 122.5) return 'South Easterly';
  if (degree > 67.5) return 'Easterly';
  if (degree > 22.5) {
    return 'North Easterly';
  }
  return 'Northerly';
};
