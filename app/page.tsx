import Header from "@/components/Header";
import MeetingControls from "@/components/MeetingControls";
import FeaturesSection from "@/components/FeaturesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <MeetingControls />
        <FeaturesSection />
      </main>
    </div>
  );
}
