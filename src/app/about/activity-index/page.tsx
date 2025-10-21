// src/app/about/activity-index/page.tsx
export default function ActivityIndexInfo() {
  return (
    <article className="glass rounded-2xl p-6 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight">Activity Index</h1>
      <p className="text-neutral-700 mt-3">
        Der Activity Index zeigt, wie schnell und verlässlich ein Unternehmen auf
        Anfragen reagiert. Er kombiniert mehrere Signale (z. B. Antwortzeit, Erreichbarkeit)
        zu einer leicht verständlichen Skala von 0 bis 100.
      </p>
      <ul className="list-disc pl-5 mt-3 text-neutral-700">
        <li>Antwortzeit (TTA) — je schneller, desto besser</li>
        <li>Erreichbarkeit — Telefon/Email/Website vorhanden</li>
        <li>Bestätigte Antworten — verifizierte Reaktionsfälle</li>
      </ul>
      <p className="text-neutral-700 mt-3">
        Im MVP ist die Berechnung vereinfacht. Später veröffentlichen wir die vollständige
        Methodik und eröffnen Feedback-Kanal für Branchen.
      </p>
    </article>
  );
}
