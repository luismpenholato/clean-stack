export function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength)}…`;
}

export function getInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || '?';
}

const avatarColors = [
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#f97316',
  '#14b8a6',
  '#0ea5e9',
];

export function getAvatarColor(name: string): string {
  const code = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return avatarColors[code % avatarColors.length];
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}
