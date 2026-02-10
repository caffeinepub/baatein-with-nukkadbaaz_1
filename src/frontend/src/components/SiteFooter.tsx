import { SiX, SiFacebook, SiInstagram } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'baatein-nukkadbaaz'
  );

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About Section */}
          <div>
            <h3 className="mb-3 font-serif text-lg font-semibold">Baatein With Nukkadbaaz</h3>
            <p className="text-sm text-muted-foreground">
              Your source for theatre news, workshops, stage shows, and exclusive interviews with veteran artists.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 font-serif text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </a>
              </li>
              <li>
                <a href="/posts" className="text-muted-foreground hover:text-foreground">
                  Posts
                </a>
              </li>
              <li>
                <a href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-3 font-serif text-lg font-semibold">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="X (Twitter)"
              >
                <SiX className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-6 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © {currentYear} Baatein With Nukkadbaaz. Built with{' '}
            <Heart className="h-4 w-4 fill-red-500 text-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
