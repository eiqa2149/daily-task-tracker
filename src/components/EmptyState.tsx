import type { ReactNode } from "react";
import Lily from "../assets/floral/Lily";
import Star from "../assets/floral/Star";

interface Props {
  title: string;
  message: string;
  children?: ReactNode; // optional action, e.g. an Add Task button
}

export default function EmptyState({ title, message, children }: Props) {
  return (
    <div className="py-4 text-center">
      <div className="relative mx-auto mb-1 h-20 w-20">
        <Lily className="h-20 w-20" />
        <Star className="absolute -left-3 top-2 h-3 w-3 text-bright" />
        <Star className="absolute -right-3 top-6 h-4 w-4 text-bright" />
      </div>
      <h3 className="font-display text-2xl font-semibold">{title}</h3>
      <p className="mt-1 text-sm">{message}</p>
      {children}
    </div>
  );
}
