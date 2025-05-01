import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Droplets } from "lucide-react"

export default function About() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-blue-700 to-blue-900">
        <div className="container flex h-20 items-center px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <Droplets className="h-8 w-8 text-blue-100" />
            <h1 className="text-2xl font-black tracking-tight text-white font-serif">MASURIA HYDROWATCH</h1>
          </Link>
        </div>
      </header>

      <div className="container py-12">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="prose prose-blue max-w-none">
          <h1>About Masuria Hydrowatch</h1>
          
          <h2>Project Overview</h2>
          <p>
            Masuria Hydrowatch is an advanced environmental monitoring system designed to track and analyze water level changes 
            in Poland's Masuria Lake District using cutting-edge satellite imagery and AI technology.
          </p>

          <h2>Key Features</h2>
          <ul>
            <li>
              <strong>Satellite Imagery Analysis:</strong> Utilizes high-resolution satellite data to monitor water bodies 
              across the Masuria region, providing detailed insights into changes over time.
            </li>
            <li>
              <strong>AI-Powered Detection:</strong> Advanced machine learning algorithms detect and analyze changes in water 
              coverage with 96% accuracy.
            </li>
            <li>
              <strong>Interactive Visualization:</strong> Multiple viewing modes including slider comparison, side-by-side view, 
              and overlay analysis for comprehensive water change assessment.
            </li>
            <li>
              <strong>Environmental Impact Assessment:</strong> Detailed analysis of how water level changes affect local 
              ecosystems, wildlife, and tourism.
            </li>
          </ul>

          <h2>Technology Stack</h2>
          <ul>
            <li>React with TypeScript for robust frontend development</li>
            <li>TailwindCSS for modern, responsive styling</li>
            <li>Machine Learning models for water detection</li>
            <li>Satellite imagery processing pipeline</li>
          </ul>

          <h2>Environmental Significance</h2>
          <p>
            The Masuria Lake District, known as the "Land of a Thousand Lakes," is one of Europe's most precious freshwater 
            ecosystems. Our project helps monitor and preserve this vital resource by:
          </p>
          <ul>
            <li>Tracking long-term water level trends</li>
            <li>Identifying areas at risk of water loss</li>
            <li>Supporting evidence-based environmental policy</li>
            <li>Facilitating proactive conservation measures</li>
          </ul>

          <h2>Future Development</h2>
          <p>
            We are continuously working to enhance Masuria Hydrowatch with new features and capabilities:
          </p>
          <ul>
            <li>Integration with real-time weather data</li>
            <li>Enhanced prediction models for water level changes</li>
            <li>Expanded coverage of surrounding regions</li>
            <li>Mobile app development for field researchers</li>
          </ul>
        </div>
      </div>
    </main>
  )
} 