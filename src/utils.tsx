export function checkColor($groupColor: number) {
  const colors = [
    'rgb(244, 162, 97)',
    'rgb(212, 75, 56)',
    'rgb(42, 157, 143)',
    'rgb(38, 70, 83)',
    'blueviolet',
    'black',
  ];
  return colors[$groupColor];
}

export function capitalize(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}
