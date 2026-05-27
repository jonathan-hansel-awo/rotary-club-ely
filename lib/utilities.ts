function getYearsOfService(foundingYear: number): number {
  const today = new Date();
  const anniversary = new Date(today.getFullYear(), 3, 12); // April 12 (month is 0-indexed)

  const completedYear =
    today >= anniversary ? today.getFullYear() : today.getFullYear() - 1;
  return completedYear - foundingYear;
}

export const clubAge = getYearsOfService(1939);
