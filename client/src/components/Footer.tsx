export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-xl font-bold text-foreground">Nora Labs a.i solutions</span>
        </div>
        <p className="text-foreground/60 text-sm">
          © {new Date().getFullYear()} Nora Labs a.i solutions. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

