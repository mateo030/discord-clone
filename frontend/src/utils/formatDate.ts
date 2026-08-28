// TODO: Move to helper folder
export function formatDate(input: string) {
  const date = new Date(input);
  const pad = (num: number) => num.toString().padStart(2, "0");
  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const HH = pad(date.getHours());
  const mm = pad(date.getMinutes());

  return `${yyyy}-${MM}-${dd} ${HH}:${mm}`;
}
