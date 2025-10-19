// src/lib/activity.ts
// Простий розрахунок ActivityIndex (0..100)
export function computeActivityIndex(
  answered: boolean,
  ttaHours: number | null | undefined,
  contactable: boolean
): number {
  // нормалізуємо TTA в діапазон 0..72 год (якщо null — вважаємо дуже повільною відповіддю)
  const TTA = Math.min(Math.max(ttaHours ?? 999, 0), 72);

  // базові бали за факт відповіді
  const base = answered ? 50 : 10;

  // швидкість: чим менший TTA, тим більше балів (0..40)
  const speed = Math.max(0, 40 - (TTA / 72) * 40);

  // довіра: наявні контакти дають +10
  const trust = contactable ? 10 : 0;

  return Math.round(Math.min(100, base + speed + trust));
}

export function activityLabel(score: number) {
  if (score >= 80) return "Відповідає швидко";
  if (score >= 40) return "Відповідає повільно";
  return "Поки без відповіді";
}
