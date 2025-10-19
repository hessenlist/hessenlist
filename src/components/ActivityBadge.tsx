type Props = { score: number };

export default function ActivityBadge({ score }: Props) {
  const label =
    score >= 80 ? "Відповідає швидко"
    : score >= 40 ? "Відповідає повільно"
    : "Поки без відповіді";

  const cls =
    score >= 80 ? "bg-green-100 text-green-800"
    : score >= 40 ? "bg-yellow-100 text-yellow-800"
    : "bg-gray-100 text-gray-700";

  return (
    <span
      className={`text-xs px-2 py-1 rounded-full ${cls}`}
      title={`ActivityIndex: ${score}`}
    >
      {label}
    </span>
  );
}
