export default function NotFound() {
  return (
    <div className="py-12">
      <h1 className="text-2xl font-semibold">Firma nicht gefunden</h1>
      <p className="text-neutral-600 mt-2">
        Diese Seite existiert nicht oder wurde entfernt.
      </p>
      <a href="/companies" className="underline mt-4 inline-block">
        Zur Übersicht →
      </a>
    </div>
  );
}
