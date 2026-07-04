import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WHATSAPP_URL } from "@/lib/whatsapp";

type WhatsAppCtaProps = {
  label?: string;
  size?: "sm" | "lg";
  /** "solid" (branco, casco mono) é o padrão; "whatsapp" (verde) é exclusivo do fechamento. */
  variant?: "solid" | "whatsapp";
  className?: string;
};

export default function WhatsAppCta({
  label = "Viajar para o futuro →",
  size = "sm",
  variant = "solid",
  className,
}: WhatsAppCtaProps) {
  return (
    <Button
      asChild
      size={size}
      className={cn(
        "rounded-full font-semibold",
        variant === "solid" && "bg-white text-[#0A0A0F] hover:bg-white/90",
        variant === "whatsapp" &&
          "bg-whatsapp text-[#04240f] hover:bg-whatsapp/90",
        size === "lg" && "h-12 px-7 text-base",
        className,
      )}
    >
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    </Button>
  );
}
