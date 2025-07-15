export function getTimeAgo(date: Date | string): string {
  const now = new Date();
  const createdAt = new Date(date);
  const diffMs = now.getTime() - createdAt.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `${seconds} second${seconds === 1 ? "" : "s"}`;
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} `;
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} `;
  if (weeks < 5) return `${weeks} week${weeks === 1 ? "" : "s"}`;
  if (months < 12) return `${months} month${months === 1 ? "" : "s"}`;

  return `${years} year${years === 1 ? "" : "s"}`;
}
