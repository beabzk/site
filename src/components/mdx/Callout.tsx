import {
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Lightbulb,
} from "lucide-react";

interface CalloutProps {
  type?: "info" | "warning" | "success" | "error" | "tip";
  title?: string;
  children: React.ReactNode;
}

const calloutConfig = {
  info: {
    icon: Info,
    bgColor: "bg-blue-950/50",
    borderColor: "border-blue-500/50",
    iconColor: "text-blue-400",
    titleColor: "text-blue-300",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-yellow-950/50",
    borderColor: "border-yellow-500/50",
    iconColor: "text-yellow-400",
    titleColor: "text-yellow-300",
  },
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-950/50",
    borderColor: "border-green-500/50",
    iconColor: "text-green-400",
    titleColor: "text-green-300",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-950/50",
    borderColor: "border-red-500/50",
    iconColor: "text-red-400",
    titleColor: "text-red-300",
  },
  tip: {
    icon: Lightbulb,
    bgColor: "bg-purple-950/50",
    borderColor: "border-purple-500/50",
    iconColor: "text-purple-400",
    titleColor: "text-purple-300",
  },
};

export default function Callout({
  type = "info",
  title,
  children,
}: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`my-6 rounded-lg border-l-4 p-4 ${config.bgColor} ${config.borderColor} `}
    >
      <div className="flex items-start gap-3">
        <Icon
          size={20}
          className={`${config.iconColor} mt-0.5 flex-shrink-0`}
        />
        <div className="min-w-0 flex-1">
          {title && (
            <h4 className={`mb-2 font-mono font-semibold ${config.titleColor}`}>
              {title}
            </h4>
          )}
          <div className="prose prose-sm prose-invert max-w-none text-gray-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
