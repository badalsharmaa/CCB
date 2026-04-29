import { Hero } from '../components/Hero';
import { StoryTeaser } from '../components/StoryTeaser';
import { MenuHighlights } from '../components/MenuHighlights';
import { CateringSection } from '../components/CateringSection';
import { TestimonialSection } from '../components/TestimonialSection';
import { BlogSection } from '../components/BlogSection';
import { InstagramSection } from '../components/InstagramSection';
import { AIChatbotTeaser } from '../components/AIChatbotTeaser';
import { SectionDivider } from '../components/SectionDivider';

export function Home() {
  return (
    <main>
      <Hero />
      <SectionDivider />
      <StoryTeaser />
      <MenuHighlights />
      <TestimonialSection />
      <div
        style={{
          backgroundColor: '#f7eddd',
          backgroundImage: "url('/assets/catering-blog-bg.jpg')",
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% auto',
          minHeight: '200vh',
          paddingBottom: '30vw',
        }}
      >
        <CateringSection />
        <BlogSection />
      </div>
      <InstagramSection />
      <AIChatbotTeaser />
    </main>
  );
}
