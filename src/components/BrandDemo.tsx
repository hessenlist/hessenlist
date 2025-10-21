// src/components/BrandDemo.tsx
export default function BrandDemo() {
  return (
    <div className="space-y-6 py-10">
      <h2 className="text-2xl font-semibold text-text">🎨 HessenList Theme Demo</h2>

      {/* Кольори */}
      <div className="flex flex-wrap gap-4">
        <div className="w-32 h-20 rounded-brand shadow-soft bg-surface border border-glass-border flex items-center justify-center text-text">
          surface
        </div>
        <div className="w-32 h-20 rounded-brand shadow-soft bg-accent text-white flex items-center justify-center">
          accent
        </div>
        <div className="w-32 h-20 rounded-brand shadow-soft bg-success text-white flex items-center justify-center">
          success
        </div>
        <div className="w-32 h-20 rounded-brand shadow-soft bg-warning text-black flex items-center justify-center">
          warning
        </div>
        <div className="w-32 h-20 rounded-brand shadow-soft bg-danger text-white flex items-center justify-center">
          danger
        </div>
      </div>

      {/* Текстові стилі */}
      <div className="glass rounded-brand shadow-soft p-6 space-y-2">
        <h3 className="font-sans text-text text-lg">Заголовок (font-sans)</h3>
        <p className="text-text-secondary text-sm">
          Це приклад вторинного тексту з палітри теми.
        </p>
        <p className="text-accent">Accent link color</p>
      </div>
    </div>
  );
}
