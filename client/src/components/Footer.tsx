import { WHATSAPP_URL } from "@/lib/whatsapp";

const LINKS = [
  { label: "WhatsApp", href: WHATSAPP_URL },
  { label: "AtendeBot", href: "https://atende.bot" },
  { label: "Instagram", href: "https://instagram.com/noralabs.digital" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="container flex flex-col items-center gap-8 md:flex-row md:justify-between">
        <img
          src="/logos/nora-labs-wordmark.png"
          alt="NØRA Labs"
          className="h-6 w-auto opacity-70"
        />

        <nav className="flex items-center gap-6">
          {LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/50 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="text-center md:text-right">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} NoraLabs. Todos os direitos
            reservados.
          </p>
          <p className="mt-1 text-xs text-white/30">
            Este site também foi feito sob medida.
          </p>
        </div>
      </div>
    </footer>
  );
}
