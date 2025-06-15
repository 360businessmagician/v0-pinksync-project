export function PinkSyncLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-pink-500 rounded-full opacity-20 animate-pulse"></div>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-pink-600"
      >
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
        <path d="M8.5 8.5v.01" />
        <path d="M16 12v.01" />
        <path d="M12 16v.01" />
      </svg>
    </div>
  )
}
