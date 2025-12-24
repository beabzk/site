"use client";

interface SectionHeaderProps {
    title: string;
    description?: string;
    className?: string;
}

export default function SectionHeader({
    title,
    description,
    className = "",
}: SectionHeaderProps) {
    return (
        <div className={`mb-6 ${className}`}>
            <h2 className="text-2xl font-semibold text-white">
                {title}
            </h2>
            {description && (
                <p className="mt-2 text-gray-400">
                    {description}
                </p>
            )}
        </div>
    );
}
