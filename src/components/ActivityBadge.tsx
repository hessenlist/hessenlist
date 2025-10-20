type Props = { score: number | null };

const tones = {
  high: "bg-emerald-100/70 text-emerald-800 border-emerald-200/70",
  medium: "bg-amber-100/70 text-amber-800 border-amber-200/70",
  low: "bg-neutral-100/70 text-neutral-700 border-neutral-200/70",
};

export default function ActivityBadge({ score }: Props) {
  if (score === null) return null;

  let label = "Keine Antwort";
  let style = tones.low;
  if (score > 70) {
    label = "Antwortet schnell";
    style = tones.high;
  } else if (score > 40) {
    label = "Antwortet langsam";
    style = tones.medium;
  }

  return (
    <span className={`text-xs px-2 py-1 rounded-full border font-medium ${style}`}>
      {label}
    </span>
  );
}
