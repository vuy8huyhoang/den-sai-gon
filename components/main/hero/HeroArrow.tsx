"use client"

/**
 * HeroArrow — now supports `disabled` prop (optional)
 * Drop-in replacement; same API + { disabled?: boolean }
 */
export type HeroArrowProps = {
    dir: "left" | "right"
    onClick?: () => void
    className?: string
    disabled?: boolean
}

export default function HeroArrow({ dir, onClick, className = "", disabled = false }: HeroArrowProps) {
    const base = [
        "absolute top-1/2 -translate-y-1/2",
        "grid place-items-center h-10 w-10 rounded-full",
        "bg-white/95 shadow-md ring-1 ring-slate-200 hover:bg-white",
        "transition",
    ].join(" ")
    const pos = dir === "left" ? "left-2" : "right-2"

    return (
        <button
            type="button"
            aria-label={dir === "left" ? "Previous" : "Next"}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={[base, pos, disabled ? "opacity-0 invisible pointer-events-none" : "", className].join(" ")}
        >
            {dir === "left" ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M15 6l-6 6 6 6" />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M9 6l6 6-6 6" />
                </svg>
            )}
        </button>
    )
}
