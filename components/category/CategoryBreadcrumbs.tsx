import Link from "next/link";

export type Crumb = { label: string; href?: string };

export default function CategoryBreadcrumbs({ items }: { items: Crumb[] }) {
    return (
        <nav aria-label="Breadcrumb" className="py-3 text-sm">
            <ol className="flex flex-wrap items-center gap-2 text-slate-500">
                {items.map((c, i) => {
                    const isLast = i === items.length - 1;
                    return (
                        <li key={i} className="flex items-center gap-2">
                            {c.href && !isLast ? (
                                <Link
                                    href={c.href}
                                    className="hover:text-emerald-700 transition-colors"
                                >
                                    {c.label}
                                </Link>
                            ) : (
                                <span className="text-slate-700 font-medium">{c.label}</span>
                            )}
                            {!isLast && <span className="text-slate-400">/</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
