// Simple Satya School mark (no Amar Seva Sangam logo). Replace with the real Satya logo file if you have one.
export default function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-label="Satya School">
      <rect width="48" height="48" rx="12" fill="#ffffff" />
      <circle cx="24" cy="24" r="15" fill="none" stroke="#f08a24" strokeWidth="3" />
      <path d="M16 27c4-9 12-9 16 0" fill="none" stroke="#0a3d73" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="24" cy="17" r="3.2" fill="#0a3d73" />
    </svg>
  )
}
