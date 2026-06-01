'use client';

export default function AsciiArt({ art }) {
  if (!art) return null;

  return (
    <div className="overflow-x-auto">
      <pre
        className="text-green-400 font-mono text-xs leading-tight my-2 inline-block min-w-0"
        style={{ animation: 'fadeIn 0.3s ease-in' }}
      >
        {art}
      </pre>
    </div>
  );
}
