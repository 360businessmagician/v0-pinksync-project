import type { Metadata } from "next"
import RegistrationForm from "@/components/registration-form"
import { AccessibilityFeatures } from "@/components/accessibility-features"
import { PinkSyncLogo } from "@/components/pink-sync-logo"
import { LayerExplanation } from "@/components/layer-explanation"
import { AccessibilityTransformer } from "@/components/accessibility-transformer"
import { PinkSync } from "@/components/pink-sync"

export const metadata: Metadata = {
  title: "PinkSync Registration - Layer 1 Accessibility Transformer",
  description:
    "Register for PinkSync, the unified accessibility transformer for deaf users. One layer, one accessibility solution across all digital platforms.",
  keywords: ["accessibility", "deaf", "sign language", "ASL", "digital accessibility", "inclusive design"],
  openGraph: {
    title: "PinkSync - One Layer. One Accessibility.",
    description: "The unified accessibility transformer that sits between deaf users and digital content",
    type: "website",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Skip to main content for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-pink-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero Section */}
          <header className="text-center space-y-4" id="main-content">
            <PinkSyncLogo className="mx-auto h-20 w-20" />
            <h1 className="text-4xl md:text-5xl font-bold text-pink-600">PinkSync</h1>
            <p className="text-xl md:text-2xl font-medium text-gray-700">One Layer. One Accessibility.</p>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              The unified accessibility transformer that sits between deaf users and digital content
            </p>
          </header>

          {/* Layer Visualization */}
          <section aria-labelledby="layer-explanation">
            <h2 id="layer-explanation" className="sr-only">
              How PinkSync Works
            </h2>
            <LayerExplanation />
          </section>

          {/* Registration and Features */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8" aria-labelledby="registration-section">
            <h2 id="registration-section" className="sr-only">
              Registration and Features
            </h2>
            <AccessibilityFeatures />
            <RegistrationForm />
          </section>

          {/* How It Works */}
          <section aria-labelledby="how-it-works">
            <h2 id="how-it-works" className="sr-only">
              How PinkSync Transforms Accessibility
            </h2>
            <AccessibilityTransformer />
          </section>

          {/* API Documentation */}
          <section aria-labelledby="api-docs">
            <h2 id="api-docs" className="sr-only">
              PinkSync API
            </h2>
            <PinkSync />
          </section>
        </div>
      </div>
    </main>
  )
}
