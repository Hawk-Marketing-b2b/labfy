export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <span className="text-xl font-bold text-foreground">LabFy a.i solutions</span>
        </div>
        <p className="text-foreground/60 text-sm">
          © {new Date().getFullYear()} LabFy a.i solutions. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

