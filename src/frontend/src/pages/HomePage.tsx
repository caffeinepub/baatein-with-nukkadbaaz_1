import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, Theater, Users, Mic, Newspaper } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center">
              <h1 className="mb-4 font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Welcome to <span className="text-primary">Baatein With Nukkadbaaz</span>
              </h1>
              <p className="mb-6 text-lg text-muted-foreground md:text-xl">
                Your premier destination for theatre news, workshops, stage shows, and exclusive interviews with
                veteran artists. Curated by <span className="font-semibold text-foreground">Heena Mehta</span>, a
                seasoned media and journalism professional.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/posts">
                  <Button size="lg" className="gap-2">
                    Explore Posts
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline">
                    About Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/baatein-hero.dim_1600x600.png"
                alt="Theatre stage with curtains"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border/40 bg-muted/20 py-16">
        <div className="container">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold md:text-4xl">What We Cover</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Theater className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold">Workshops</h3>
              <p className="text-sm text-muted-foreground">
                Discover upcoming theatre workshops and masterclasses to hone your craft.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold">Stage Shows</h3>
              <p className="text-sm text-muted-foreground">
                Stay updated on the latest stage productions and theatrical performances.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Mic className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold">Interviews</h3>
              <p className="text-sm text-muted-foreground">
                Exclusive conversations with veteran artists and theatre personalities.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Newspaper className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold">Theatre News</h3>
              <p className="text-sm text-muted-foreground">
                Breaking news and updates from the world of theatre and performing arts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 py-16">
        <div className="container text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Join Our Theatre Community</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Stay connected with the vibrant world of theatre. Read our latest posts and never miss an update.
          </p>
          <Link to="/posts">
            <Button size="lg" className="gap-2">
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
