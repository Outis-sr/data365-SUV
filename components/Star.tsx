export function Star({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2.8l2.9 6 6.5.9-4.7 4.6 1.1 6.5L12 17.7 6.2 20.8l1.1-6.5L2.6 9.7l6.5-.9z" />
    </svg>
  );
}

export function StarRow({ className = "stars", size = 14 }: { className?: string; size?: number }) {
  return (
    <div className={className} role="img" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} />
      ))}
    </div>
  );
}
