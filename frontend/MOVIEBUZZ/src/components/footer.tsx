export function Footer() {
  const footerLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Rules of Conduct", href: "#" },
    { label: "Community Policy", href: "#" },
    { label: "Content Guidelines", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
  ];

  return (
    <footer className="bg-black border-t border-zinc-900 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          {/* Copyright */}
          <p className="text-white text-sm">
            © 2026 MOVIEBUZZ. All rights reserved.
          </p>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {footerLinks.map((link, index) => (
              <div key={link.label} className="flex items-center">
                <a
                  href={link.href}
                  className="text-sm text-[#CCCCCC] hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(`Clicked: ${link.label}`);
                  }}
                >
                  {link.label}
                </a>
                {index < footerLinks.length - 1 && (
                  <span className="ml-4 text-zinc-700">|</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
