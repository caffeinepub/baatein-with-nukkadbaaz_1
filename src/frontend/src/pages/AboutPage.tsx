import { Mail, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-serif text-4xl font-bold md:text-5xl">About Baatein With Nukkadbaaz</h1>

        <div className="mb-12 grid gap-8 md:grid-cols-2">
          <div>
            <img
              src="/assets/generated/baatein-hero.dim_1600x600.png"
              alt="Theatre stage"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 font-serif text-2xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground">
              Baatein With Nukkadbaaz is dedicated to all theatre enthusiasts who want to keep themselves updated with
              the latest news revolving around theatre. From workshops and stage shows to exclusive interviews with
              veteran artists, we bring you the pulse of the performing arts world.
            </p>
          </div>
        </div>

        <div className="mb-12 rounded-lg border border-border/40 bg-muted/30 p-8">
          <h2 className="mb-6 font-serif text-3xl font-semibold">Meet Heena Mehta</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">Heena Mehta</span> is the creative force behind Baatein
              With Nukkadbaaz. With vast experience in the field of media and journalism, Heena brings a unique
              perspective to theatre coverage that combines professional insight with genuine passion for the
              performing arts.
            </p>
            <p>
              Her extensive background in journalism has equipped her with the skills to tell compelling stories,
              conduct insightful interviews, and provide in-depth coverage of the theatre world. Through this platform,
              Heena aims to create a vibrant community where theatre lovers can discover, learn, and connect.
            </p>
            <p>
              Whether you're a seasoned theatre professional, an aspiring actor, or simply someone who appreciates the
              magic of live performance, Baatein With Nukkadbaaz is your go-to source for everything theatre.
            </p>
          </div>
          <div className="mt-6 flex gap-4">
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              Contact
            </Button>
            <Button variant="outline" className="gap-2">
              <Linkedin className="h-4 w-4" />
              Connect
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border border-border/40 p-6">
            <h3 className="mb-3 font-serif text-xl font-semibold">Workshops</h3>
            <p className="text-sm text-muted-foreground">
              Discover upcoming theatre workshops, masterclasses, and training programs to enhance your skills.
            </p>
          </div>
          <div className="rounded-lg border border-border/40 p-6">
            <h3 className="mb-3 font-serif text-xl font-semibold">Stage Shows</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest updates on theatrical productions, premieres, and performances happening near you.
            </p>
          </div>
          <div className="rounded-lg border border-border/40 p-6">
            <h3 className="mb-3 font-serif text-xl font-semibold">Interviews</h3>
            <p className="text-sm text-muted-foreground">
              Read exclusive interviews with veteran artists, directors, and theatre personalities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
