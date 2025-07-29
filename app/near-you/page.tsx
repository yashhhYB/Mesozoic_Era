"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Grid, Map, Search, ArrowLeft, Navigation, Clock, Users, Camera } from "lucide-react"
import { dinosaurs, fossilLocations, findFossilsNearLocation, getAlternativeFossilLocations } from "@/lib/dinosaur-data"
import Link from "next/link"
import Image from "next/image"

declare global {
  interface Window {
    Cesium: any
  }
}

// Simple fossil discovery card component
function FossilDiscoveryCard({ location, distance }: { location: any; distance: number }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="relative h-80 w-full perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="h-48 relative">
            {location.dinosaurs.length > 0 && (
              <Image
                src={
                  dinosaurs.find((d) => d.id === location.dinosaurs[0])?.fossilImage ||
                  `/placeholder.svg?height=192&width=320&text=${location.name.replace(/\s+/g, "+") || "/placeholder.svg"}`
                }
                alt={`${location.name} fossil site`}
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=192&width=320&text=Fossil+Site"
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="text-white font-semibold text-lg">{location.name}</h3>
              <p className="text-white/90 text-sm flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {location.country}
              </p>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                {location.ageRange}
              </span>
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <Users className="h-4 w-4" />
                {location.dinosaurs.length} species
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{location.description}</p>

            <Button onClick={() => setIsFlipped(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-sm">
              Learn More
            </Button>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">{location.name}</h3>
            <button onClick={() => setIsFlipped(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
              ✕
            </button>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Location</h4>
              <p className="text-gray-600">
                {location.country}, {location.state}
              </p>
              <p className="text-gray-500 text-xs">{Math.round(distance)} km away</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-1">Age</h4>
              <p className="text-gray-600">{location.ageRange}</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-1">Dinosaurs Found</h4>
              <div className="flex flex-wrap gap-1">
                {location.dinosaurs.slice(0, 2).map((dinoId: string) => {
                  const dino = dinosaurs.find((d) => d.id === dinoId)
                  return dino ? (
                    <span key={dinoId} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                      {dino.name}
                    </span>
                  ) : null
                })}
                {location.dinosaurs.length > 2 && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    +{location.dinosaurs.length - 2} more
                  </span>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-1">Museum</h4>
              <p className="text-gray-600 text-xs">{location.visitingInfo.museum}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NearYouPage() {
  const [viewMode, setViewMode] = useState<"map" | "grid">("grid")
  const [userLocation, setUserLocation] = useState<string>("")
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [nearbyFossils, setNearbyFossils] = useState<any[]>([])
  const [alternativeFossils, setAlternativeFossils] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const cesiumContainerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<any>(null)

  useEffect(() => {
    if (viewMode === "map") {
      loadCesiumMap()
    }
  }, [viewMode])

  const loadCesiumMap = async () => {
    if (typeof window === "undefined") return

    try {
      if (!window.Cesium) {
        const script = document.createElement("script")
        script.src = "https://cesium.com/downloads/cesiumjs/releases/1.111/Build/Cesium/Cesium.js"
        script.async = true

        const link = document.createElement("link")
        link.href = "https://cesium.com/downloads/cesiumjs/releases/1.111/Build/Cesium/Widgets/widgets.css"
        link.rel = "stylesheet"

        document.head.appendChild(link)
        document.head.appendChild(script)

        script.onload = () => {
          setTimeout(() => {
            if (window.Cesium) {
              initializeCesiumMap()
            }
          }, 100)
        }
      } else if (viewMode === "map") {
        initializeCesiumMap()
      }
    } catch (error) {
      console.error("Error loading Cesium:", error)
    }
  }

  const initializeCesiumMap = async () => {
    if (!cesiumContainerRef.current || viewerRef.current) return

    try {
      window.Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzYzliNDQ1NS04YzFkLTQ3YzYtYmQ0Yi01ODAwNjQwNjU0ZDciLCJpZCI6MzIzODAxLCJpYXQiOjE3NTMxNzU4NjB9.QwjOYvE-B8LHnHaaXD-kEE1NKHotXRNNk2_Bc0Px8tU"

      const viewer = new window.Cesium.Viewer(cesiumContainerRef.current, {
        timeline: false,
        animation: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        fullscreenButton: false,
        navigationHelpButton: false,
        vrButton: false,
        infoBox: false,
        selectionIndicator: false,
        creditContainer: document.createElement("div"),
      })

      viewerRef.current = viewer
      const { scene, camera } = viewer

      scene.screenSpaceCameraController.inertiaSpin = 0
      scene.screenSpaceCameraController.inertiaTranslate = 0
      scene.screenSpaceCameraController.inertiaZoom = 0

      // Add simple fossil location markers
      fossilLocations.forEach((location) => {
        try {
          // Main fossil site marker
          viewer.entities.add({
            position: window.Cesium.Cartesian3.fromDegrees(location.location.lng, location.location.lat),
            point: {
              pixelSize: 12,
              color: window.Cesium.Color.fromCssColorString("#ea4335"),
              outlineColor: window.Cesium.Color.WHITE,
              outlineWidth: 2,
              heightReference: window.Cesium.HeightReference.CLAMP_TO_GROUND,
            },
            label: {
              text: location.name,
              font: "12px Arial",
              pixelOffset: new window.Cesium.Cartesian2(0, -30),
              fillColor: window.Cesium.Color.WHITE,
              outlineColor: window.Cesium.Color.BLACK,
              outlineWidth: 2,
              style: window.Cesium.LabelStyle.FILL_AND_OUTLINE,
              show: false,
              backgroundColor: window.Cesium.Color.BLACK.withAlpha(0.7),
              backgroundPadding: new window.Cesium.Cartesian2(6, 3),
              showBackground: true,
            },
            properties: {
              location: location,
              type: "fossil-site",
            },
          })

          // Small dinosaur markers around the site
          location.dinosaurs.forEach((dinoId: string) => {
            const dinosaur = dinosaurs.find((d) => d.id === dinoId)
            if (dinosaur) {
              const offsetLng = location.location.lng + (Math.random() - 0.5) * 0.3
              const offsetLat = location.location.lat + (Math.random() - 0.5) * 0.3

              viewer.entities.add({
                position: window.Cesium.Cartesian3.fromDegrees(offsetLng, offsetLat),
                point: {
                  pixelSize: 8,
                  color: window.Cesium.Color.fromCssColorString("#4285f4"),
                  outlineColor: window.Cesium.Color.WHITE,
                  outlineWidth: 1,
                  heightReference: window.Cesium.HeightReference.CLAMP_TO_GROUND,
                },
                label: {
                  text: dinosaur.name,
                  font: "10px Arial",
                  pixelOffset: new window.Cesium.Cartesian2(0, -20),
                  fillColor: window.Cesium.Color.WHITE,
                  outlineColor: window.Cesium.Color.BLACK,
                  outlineWidth: 1,
                  style: window.Cesium.LabelStyle.FILL_AND_OUTLINE,
                  show: false,
                  scale: 0.8,
                },
                properties: {
                  dinosaur: dinosaur,
                  location: location,
                  type: "dinosaur-marker",
                },
              })
            }
          })
        } catch (error) {
          console.warn("Failed to create marker for:", location.name)
        }
      })

      camera.setView({
        destination: window.Cesium.Cartesian3.fromDegrees(-95.0, 40.0, 20000000),
      })

      // Simple hover effects
      viewer.screenSpaceEventHandler.setInputAction((event: any) => {
        try {
          const pickedObject = viewer.scene.pick(event.endPosition)

          viewer.entities.values.forEach((entity: any) => {
            if (entity.label) {
              entity.label.show = false
            }
          })

          if (pickedObject && pickedObject.id && pickedObject.id.label) {
            pickedObject.id.label.show = true
          }
        } catch (error) {
          console.warn("Hover effect error:", error)
        }
      }, window.Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    } catch (error) {
      console.error("Error initializing Cesium map:", error)
    }
  }

  const searchLocation = async () => {
    if (!userLocation.trim()) return

    setIsLoading(true)
    try {
      const coords = await geocodeLocation(userLocation)
      if (coords) {
        setUserCoords(coords)
        findNearbyFossils(coords.lat, coords.lng)
      }
    } catch (error) {
      console.error("Error geocoding location:", error)
      setAlternativeFossils(getAlternativeFossilLocations(0, 0))
    }
    setIsLoading(false)
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserCoords(coords)
          setUserLocation(`${coords.lat.toFixed(2)}, ${coords.lng.toFixed(2)}`)
          findNearbyFossils(coords.lat, coords.lng)
          setIsLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error.message || "Location access denied")
          alert("Unable to get your location. Please enter it manually.")
          setIsLoading(false)
        },
      )
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  const findNearbyFossils = (lat: number, lng: number) => {
    const nearby = findFossilsNearLocation(lat, lng, 3000)
    const alternatives = getAlternativeFossilLocations(lat, lng)

    setNearbyFossils(nearby)
    setAlternativeFossils(alternatives)
  }

  const geocodeLocation = async (location: string): Promise<{ lat: number; lng: number } | null> => {
    const cityCoords: { [key: string]: { lat: number; lng: number } } = {
      "new york": { lat: 40.7128, lng: -74.006 },
      london: { lat: 51.5074, lng: -0.1278 },
      tokyo: { lat: 35.6762, lng: 139.6503 },
      paris: { lat: 48.8566, lng: 2.3522 },
      sydney: { lat: -33.8688, lng: 151.2093 },
      "los angeles": { lat: 34.0522, lng: -118.2437 },
      chicago: { lat: 41.8781, lng: -87.6298 },
      berlin: { lat: 52.52, lng: 13.405 },
      moscow: { lat: 55.7558, lng: 37.6176 },
      beijing: { lat: 39.9042, lng: 116.4074 },
    }

    const normalized = location.toLowerCase().trim()
    return cityCoords[normalized] || null
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Simple header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <Link href="/" className="absolute left-4">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-2">Fossils Near You</h1>
              <p className="text-gray-600">Discover dinosaur fossil sites within 3,000km of your location</p>
            </div>
          </div>
        </div>

        {/* Simple search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Enter your city (e.g., New York, London, Tokyo)..."
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  className="pl-10 border-gray-300"
                  onKeyPress={(e) => e.key === "Enter" && searchLocation()}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={getCurrentLocation} variant="outline" disabled={isLoading}>
                <Navigation className="mr-2 h-4 w-4" />
                My Location
              </Button>
              <Button onClick={searchLocation} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Search className="mr-2 h-4 w-4" />
                )}
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <Button variant={viewMode === "map" ? "default" : "ghost"} onClick={() => setViewMode("map")} size="sm">
              <Map className="mr-2 h-4 w-4" />
              Map
            </Button>
            <Button variant={viewMode === "grid" ? "default" : "ghost"} onClick={() => setViewMode("grid")} size="sm">
              <Grid className="mr-2 h-4 w-4" />
              Cards
            </Button>
          </div>
        </div>

        {/* Content */}
        {viewMode === "map" ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div ref={cesiumContainerRef} className="w-full h-96 md:h-[500px]" style={{ background: "#f8f9fa" }} />
            <div className="p-4">
              <h3 className="font-medium mb-2">Global Fossil Discovery Sites</h3>
              <p className="text-gray-600 text-sm">
                Red markers show fossil sites, blue markers show individual dinosaur discoveries. Hover to see names.
              </p>
            </div>
          </div>
        ) : (
          <div>
            {/* Results */}
            {nearbyFossils.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Sites Within 3,000km</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nearbyFossils.map((location) => (
                    <FossilDiscoveryCard key={location.id} location={location} distance={location.distance} />
                  ))}
                </div>
              </div>
            )}

            {(nearbyFossils.length === 0 || alternativeFossils.length > 0) && (
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-4">
                  {nearbyFossils.length === 0 ? "Recommended Sites" : "Other Notable Sites"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {alternativeFossils.slice(0, 6).map((location) => (
                    <FossilDiscoveryCard key={location.id} location={location} distance={location.distance} />
                  ))}
                </div>
              </div>
            )}

            {nearbyFossils.length === 0 && alternativeFossils.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🦴</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Start Your Discovery</h3>
                <p className="text-gray-600 mb-4">Enter your location to find fossil sites near you</p>
                <Button onClick={getCurrentLocation} className="bg-blue-600 hover:bg-blue-700">
                  <Navigation className="mr-2 h-4 w-4" />
                  Use My Location
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Info section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4 text-center">About Fossil Sites</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Camera className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2">Museums</h3>
              <p className="text-gray-600 text-sm">Visit world-class museums to see actual fossils and specimens.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">Ancient History</h3>
              <p className="text-gray-600 text-sm">Explore fossils from 252 to 66 million years ago.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium mb-2">Guided Tours</h3>
              <p className="text-gray-600 text-sm">Join educational programs and fossil hunting experiences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
