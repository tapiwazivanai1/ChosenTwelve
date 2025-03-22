import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, FileText, BarChart3 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6">
            Guta Ra Mwari Fundraising
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Supporting our church community through transparent fundraising and
            project management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/dashboard">
                View Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8"
            >
              <Link to="/submission">Submit Content</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How We Serve Our Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Heart className="h-10 w-10 text-primary" />}
              title="Fundraising Projects"
              description="Support various church initiatives through secure and transparent donations"
            />
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-primary" />}
              title="Content Submission"
              description="Share articles, photos, and testimonials for church publications"
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="Member Engagement"
              description="Connect with fellow church members and track community progress"
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-primary" />}
              title="Project Tracking"
              description="Monitor fundraising progress and see the impact of your contributions"
            />
          </div>
        </div>
      </section>

      {/* Current Projects Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Current Projects</h2>
            <Button asChild variant="outline">
              <Link to="/dashboard">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectPreviewCard
              title="Youth Conference 2023"
              description="Supporting our annual youth conference with accommodations, materials, and transportation."
              raised={12500}
              goal={20000}
              daysLeft={14}
              imageUrl="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80"
            />
            <ProjectPreviewCard
              title="Church Building Renovation"
              description="Upgrading our facilities to better serve the growing congregation and community needs."
              raised={45000}
              goal={100000}
              daysLeft={60}
              imageUrl="https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&q=80"
            />
            <ProjectPreviewCard
              title="Community Outreach Program"
              description="Providing food, clothing, and support to vulnerable members of our local community."
              raised={8750}
              goal={15000}
              daysLeft={30}
              imageUrl="https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&q=80"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Your contributions help us build a stronger community and spread our
            message of faith and hope.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-lg px-8"
          >
            <Link to="/profile">Create an Account</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Guta Ra Mwari</h3>
            <p className="text-muted-foreground">
              Supporting our community through faith, hope, and charitable
              works.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  className="text-muted-foreground hover:text-primary"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/submission"
                  className="text-muted-foreground hover:text-primary"
                >
                  Submit Content
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-muted-foreground hover:text-primary"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-muted-foreground hover:text-primary"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-muted-foreground">
              <p>123 Church Street</p>
              <p>Harare, Zimbabwe</p>
              <p className="mt-2">contact@gutaramwari.org</p>
              <p>+263 123 456 789</p>
            </address>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-border text-center text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Guta Ra Mwari. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}

interface ProjectPreviewCardProps {
  title: string;
  description: string;
  raised: number;
  goal: number;
  daysLeft: number;
  imageUrl: string;
}

function ProjectPreviewCard({
  title,
  description,
  raised,
  goal,
  daysLeft,
  imageUrl,
}: ProjectPreviewCardProps) {
  const progress = (raised / goal) * 100;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>

        <div className="mb-2">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between text-sm mb-4">
          <span>
            <span className="font-semibold">${raised.toLocaleString()}</span>{" "}
            raised
          </span>
          <span>
            <span className="font-semibold">${goal.toLocaleString()}</span> goal
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {daysLeft} days left
          </span>
          <Button asChild size="sm">
            <Link to="/contribution">Contribute</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
