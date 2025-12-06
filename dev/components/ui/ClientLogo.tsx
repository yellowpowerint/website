import Image from "next/image";
import type { Client } from "@/lib/constants/projects";

interface ClientLogoProps {
  client: Client | { name: string; logo?: string };
  size?: "small" | "medium" | "large";
  showName?: boolean;
}

const sizeClasses = {
  small: "h-12 w-24",
  medium: "h-16 w-32",
  large: "h-20 w-40",
};

export function ClientLogo({ client, size = "medium", showName = false }: ClientLogoProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${sizeClasses[size]} relative flex items-center justify-center bg-white p-4 rounded-lg border border-gray-200 hover:border-gold transition-colors`}
      >
        {client.logo ? (
          <Image
            src={client.logo}
            alt={`${client.name} logo`}
            fill
            className="object-contain p-2"
          />
        ) : (
          <span className="text-sm font-semibold text-navy text-center">
            {client.name}
          </span>
        )}
      </div>
      {showName && (
        <p className="text-sm text-gray-600 text-center">{client.name}</p>
      )}
    </div>
  );
}
