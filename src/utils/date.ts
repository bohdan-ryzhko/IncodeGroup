type HasDate = {
  date: string | Date;
};

export const formatDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const sortByDate = <T extends HasDate[]>(array: T) =>
  [...array].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
