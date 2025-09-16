export default function CategoryTitle({
    title,
    subtitle,
}: {
    title: string;
    subtitle?: string;
}) {
    return (
        <header className="mb-4">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                {title}
            </h2>
            <div className="mt-2 h-[6px] w-44 rounded-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400" />
            {subtitle ? (
                <p className="mt-3 text-slate-600 max-w-3xl">{subtitle}</p>
            ) : null}
        </header>
    );
}
