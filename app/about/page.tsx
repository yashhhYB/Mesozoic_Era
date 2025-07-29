import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Link href="/" className="absolute left-4">
              <button className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </button>
            </Link>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Mesozoic-Era</h1>
              <p className="text-xl text-gray-600">Your gateway to the fascinating world of dinosaurs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Mesozoic-Era is dedicated to making paleontology accessible and engaging for everyone. We combine
            cutting-edge 3D visualization technology with comprehensive scientific data to create an immersive
            educational experience about the creatures that ruled our planet millions of years ago.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Interactive 3D Globe</h3>
              <p className="text-gray-600">
                Explore Earth as it was during the Mesozoic Era with our Cesium-powered 3D visualization.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Detailed Dinosaur Profiles</h3>
              <p className="text-gray-600">
                Learn about 13 magnificent dinosaurs with comprehensive information and stunning visuals.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Battle Simulator</h3>
              <p className="text-gray-600">
                Compare dinosaurs in epic battles based on scientific data and characteristics.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Fossil Discovery Map</h3>
              <p className="text-gray-600">Discover where dinosaur fossils have been found around the world.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">The Mesozoic Era</h2>
          <p className="text-gray-700 leading-relaxed">
            The Mesozoic Era, spanning from about 252 to 66 million years ago, is divided into three periods: the
            Triassic, Jurassic, and Cretaceous. This era saw the rise and dominance of dinosaurs, the evolution of the
            first birds, and the emergence of flowering plants. It ended with the mass extinction event that wiped out
            non-avian dinosaurs, paving the way for mammals to diversify.
          </p>
        </div>
      </div>
    </div>
  )
}
