"use client";

import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    className?: string;
    variant?: "default" | "subtle" | "bordered";
}

export default function Container({
    children,
    className = "",
    variant = "default",
}: ContainerProps) {
    const variants = {
        default: "bg-gray-950 rounded-lg p-6",
        subtle: "bg-gray-950/50 rounded-lg p-6",
        bordered: "border border-gray-800 rounded-lg p-6",
    };

    return (
        <div className={`${variants[variant]} ${className}`}>
            {children}
        </div>
    );
}
