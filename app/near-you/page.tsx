"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Grid, Map, Search, ArrowLeft, Navigation, Clock, Users, Camera, Car, Plane, Train, Phone, Globe, MapIcon, Play, Pause, RotateCcw, Volume2 } from "lucide-react"
import { dinosaurs, fossilLocations, findFossilsNearLocation, getAlternativeFossilLocations } from "@/lib/dinosaur-data"
import Link from "next/link"
import Image from "next/image"

declare global {
  interface Window {
    Cesium: any
    SpeechSynthesisUtterance: any
    speechSynthesis: any
  }
}

// 3D Virtual Museum Guide Component
function VirtualMuseumGuide({ location }: { location: any }) {
  const [isGuideActive, setIsGuideActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  
  const guideSteps = [
    {
      title: "Welcome to the Museum",
      content: `Welcome to ${location.visitingInfo.museum}! I'm your virtual guide. Let's explore the fascinating world of dinosaurs together.`,
      scene: "entrance"
    },
    {
      title: "Fossil Hall",
      content: `Here we have the main fossil hall displaying ${location.dinosaurs.length} different dinosaur species from the ${location.ageRange} period.`,
      scene: "fossil-hall"
    },
    {
      title: "Interactive Exhibits",
      content: `These interactive displays show how these magnificent creatures lived ${location.ageRange}. Notice the detailed bone structure and size comparisons.`,
      scene: "interactive"
    },
    {
      title: "Discovery Story",
      content: `${location.discoveryHistory} This location has been crucial for our understanding of prehistoric life.`,
      scene: "discovery"
    },
    {
      title: "Environment Recreation",
      content: `This diorama shows the ${location.environment} where these dinosaurs once roamed. The climate was very different from today.`,
      scene: "environment"
    }
  ]
  
  const speak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new window.SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.volume = volume
      utterance.pitch = 1.0
      window.speechSynthesis.speak(utterance)
    }
  }
  
  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }
  
  const nextStep = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      if (isPlaying) {
        speak(guideSteps[currentStep + 1].content)
      }
    }
  }
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      if (isPlaying) {
        speak(guideSteps[currentStep - 1].content)
      }
    }
  }
  
  const togglePlayPause = () => {
    if (isPlaying) {
      stopSpeaking()
      setIsPlaying(false)
    } else {
      speak(guideSteps[currentStep].content)
      setIsPlaying(true)
    }
  }
  
  const resetTour = () => {
    setCurrentStep(0)
    stopSpeaking()
    setIsPlaying(false)
  }
  
  if (!isGuideActive) {
    return (
      <div className="mt-4">
        <Button 
          onClick={() => setIsGuideActive(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 rounded-lg shadow-lg"
        >
          <Play className="mr-2 h-4 w-4" />
          Start 3D Virtual Museum Tour
        </Button>
      </div>
    )
  }
  
  return (
    <div className="mt-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-purple-900 flex items-center">
          <div className="w-3 h-3 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
          Virtual Museum Guide
        </h4>
        <button 
          onClick={() => setIsGuideActive(false)}
          className="text-purple-600 hover:text-purple-800 transition-colors"
        >
          ✕
        </button>
      </div>
      
      {/* 3D Scene Visualization */}
      <div className="bg-gradient-to-b from-blue-900 to-purple-900 rounded-lg p-4 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <div className="relative z-10">
          <div className="text-center text-white mb-2">
            <div className="text-6xl mb-2">
              {guideSteps[currentStep].scene === 'entrance' && '🏛️'}
              {guideSteps[currentStep].scene === 'fossil-hall' && '🦴'}
              {guideSteps[currentStep].scene === 'interactive' && '🔬'}
              {guideSteps[currentStep].scene === 'discovery' && '⛏️'}
              {guideSteps[currentStep].scene === 'environment' && '🌿'}
            </div>
            <h5 className="text-lg font-bold">{guideSteps[currentStep].title}</h5>
          </div>
          
          {/* Simulated 3D elements */}
          <div className="flex justify-center space-x-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className={`w-2 h-8 bg-white/30 rounded-full ${i === currentStep ? 'bg-white/80' : ''}`}
                style={{
                  transform: `perspective(100px) rotateX(${i * 10}deg)`,
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Guide Content */}
      <div className="bg-white rounded-lg p-4 mb-4 shadow-inner">
        <p className="text-purple-800 leading-relaxed text-sm">
          {guideSteps[currentStep].content}
        </p>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            size="sm"
            variant="outline"
            className="border-purple-300 text-purple-700 hover:bg-purple-50"
          >
            ←
          </Button>
          
          <Button
            onClick={togglePlayPause}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          <Button
            onClick={nextStep}
            disabled={currentStep === guideSteps.length - 1}
            size="sm"
            variant="outline"
            className="border-purple-300 text-purple-700 hover:bg-purple-50"
          >
            →
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Volume2 className="h-4 w-4 text-purple-600" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 accent-purple-600"
          />
          <Button
            onClick={resetTour}
            size="sm"
            variant="ghost"
            className="text-purple-600 hover:bg-purple-50"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="mt-3 bg-purple-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / guideSteps.length) * 100}%` }}
        ></div>
      </div>
      <p className="text-xs text-purple-600 mt-1 text-center">
        Step {currentStep + 1} of {guideSteps.length}
      </p>
    </div>
  )
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
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white rounded-lg shadow-md border border-gray-200 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">{location.name}</h3>
            <button onClick={() => setIsFlipped(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
              ✕
            </button>
          </div>

          <div className="space-y-4 text-sm">
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
            
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                <Navigation className="h-4 w-4" />
                How to Visit
              </h4>
              <div className="space-y-3 text-orange-800">
                <div className="flex items-start gap-2">
                  <Car className="h-4 w-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">By Car:</p>
                    <p className="text-sm">{location.visitingInfo?.driving || "Check local directions to nearest museum or visitor center"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Plane className="h-4 w-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">By Air:</p>
                    <p className="text-sm">{location.visitingInfo?.airport || "Fly to nearest major airport and rent a car"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Best Time:</p>
                    <p className="text-sm">{location.visitingInfo?.bestTime || "Spring through fall for outdoor sites"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Contact:</p>
                    <p className="text-sm">{location.visitingInfo?.contact || "Contact local tourism office for details"}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Virtual Museum Guide */}
            <VirtualMuseumGuide location={location} />
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

        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error("Cesium loading timeout"))
          }, 10000) // 10 second timeout
          
          script.onload = () => {
            clearTimeout(timeout)
            setTimeout(() => {
              if (window.Cesium) {
                initializeCesiumMap()
                resolve(true)
              } else {
                reject(new Error("Cesium not available after load"))
              }
            }, 500)
          }
          
          script.onerror = () => {
            clearTimeout(timeout)
            reject(new Error("Failed to load Cesium script"))
          }
        })
      } else if (viewMode === "map") {
        initializeCesiumMap()
      }
    } catch (error: any) {
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
        requestRenderMode: true,
        maximumRenderTimeChange: Infinity,
      })

      viewerRef.current = viewer
      const { scene, camera } = viewer

      scene.screenSpaceCameraController.inertiaSpin = 0
      scene.screenSpaceCameraController.inertiaTranslate = 0
      scene.screenSpaceCameraController.inertiaZoom = 0

      // Add fossil location markers with enhanced icons
      fossilLocations.forEach((location) => {
        try {
          // Create enhanced fossil site icon
          const canvas = document.createElement("canvas")
          canvas.width = 56
          canvas.height = 56
          const ctx = canvas.getContext("2d")
          if (ctx) {
            // Create professional gradient background
            const gradient = ctx.createRadialGradient(28, 28, 0, 28, 28, 24)
            gradient.addColorStop(0, "#ffffff")
            gradient.addColorStop(0.3, "#ea4335")
            gradient.addColorStop(1, "#c5221f")
            
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(28, 28, 24, 0, 2 * Math.PI)
            ctx.fill()
            
            // Add professional border
            ctx.strokeStyle = "#c5221f"
            ctx.lineWidth = 4
            ctx.stroke()
            
            ctx.strokeStyle = "#ffffff"
            ctx.lineWidth = 3
            ctx.stroke()
            
            // Add fossil icon with shadow
            ctx.shadowColor = "rgba(0,0,0,0.3)"
            ctx.shadowBlur = 2
            ctx.shadowOffsetX = 1
            ctx.shadowOffsetY = 1
            ctx.fillStyle = "white"
            ctx.font = "bold 20px Arial"
            ctx.textAlign = "center"
            ctx.fillText("🦴", 28, 35)
          }

          // Main fossil site marker
          viewer.entities.add({
            position: window.Cesium.Cartesian3.fromDegrees(location.location.lng, location.location.lat),
            billboard: {
              image: canvas.toDataURL(),
              scale: 1.0,
              verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
              heightReference: window.Cesium.HeightReference.CLAMP_TO_GROUND,
              disableDepthTestDistance: Number.POSITIVE_INFINITY,
            },
            label: {
              text: location.name,
              font: "14px Arial",
              pixelOffset: new window.Cesium.Cartesian2(0, -50),
              fillColor: window.Cesium.Color.WHITE,
              outlineColor: window.Cesium.Color.BLACK,
              outlineWidth: 2,
              style: window.Cesium.LabelStyle.FILL_AND_OUTLINE,
              show: false,
              backgroundColor: window.Cesium.Color.BLACK.withAlpha(0.8),
              backgroundPadding: new window.Cesium.Cartesian2(8, 4),
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

              // Create small dinosaur icon
              const dinoCanvas = document.createElement("canvas")
              dinoCanvas.width = 32
              dinoCanvas.height = 32
              const dinoCtx = dinoCanvas.getContext("2d")
              if (dinoCtx) {
                const dinoGradient = dinoCtx.createRadialGradient(16, 16, 0, 16, 16, 14)
                dinoGradient.addColorStop(0, "#ffffff")
                dinoGradient.addColorStop(0.3, "#4285f4")
                dinoGradient.addColorStop(1, "#1557B0")
                
                dinoCtx.fillStyle = dinoGradient
                dinoCtx.beginPath()
                dinoCtx.arc(16, 16, 14, 0, 2 * Math.PI)
                dinoCtx.fill()
                
                dinoCtx.strokeStyle = "#1557B0"
                dinoCtx.lineWidth = 2
                dinoCtx.stroke()
                
                dinoCtx.strokeStyle = "#ffffff"
                dinoCtx.lineWidth = 2
                dinoCtx.stroke()
                
                dinoCtx.fillStyle = "white"
                dinoCtx.font = "bold 14px Arial"
                dinoCtx.textAlign = "center"
                dinoCtx.fillText("🦕", 16, 22)
              }

              viewer.entities.add({
                position: window.Cesium.Cartesian3.fromDegrees(offsetLng, offsetLat),
                billboard: {
                  image: dinoCanvas.toDataURL(),
                  scale: 0.8,
                  verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
                  heightReference: window.Cesium.HeightReference.CLAMP_TO_GROUND,
                  disableDepthTestDistance: Number.POSITIVE_INFINITY,
                },
                label: {
                  text: dinosaur.name,
                  font: "10px Arial",
                  pixelOffset: new window.Cesium.Cartesian2(0, -30),
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

      // Enhanced hover effects
      viewer.screenSpaceEventHandler.setInputAction((event: any) => {
        try {
          const pickedObject = viewer.scene.pick(event.endPosition)

          viewer.entities.values.forEach((entity: any) => {
            if (entity.label) {
              entity.label.show = false
            }
            if (entity.billboard) {
              entity.billboard.scale = entity.properties?.type?.getValue() === "fossil-site" ? 1.0 : 0.8
            }
          })

          if (pickedObject && pickedObject.id && pickedObject.id.label) {
            pickedObject.id.label.show = true
            if (pickedObject.id.billboard) {
              const currentScale = pickedObject.id.properties?.type?.getValue() === "fossil-site" ? 1.0 : 0.8
              pickedObject.id.billboard.scale = currentScale * 1.2
            }
          }
        } catch (error) {
          console.warn("Hover effect error:", error)
        }
      }, window.Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    } catch (error: any) {
      console.error("Error initializing Cesium map:", error)
    }
  }

  const searchLocation = async () => {
    if (!userLocation.trim()) return

    setIsLoading(true)
    try {
      const coords = await Promise.race([
        geocodeLocation(userLocation),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Geocoding timeout")), 5000)
        )
      ]) as { lat: number; lng: number } | null
      
      if (coords) {
        setUserCoords(coords)
        findNearbyFossils(coords.lat, coords.lng)
      }
    } catch (error: any) {
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
      "nyc": { lat: 40.7128, lng: -74.006 },
      london: { lat: 51.5074, lng: -0.1278 },
      tokyo: { lat: 35.6762, lng: 139.6503 },
      paris: { lat: 48.8566, lng: 2.3522 },
      sydney: { lat: -33.8688, lng: 151.2093 },
      "los angeles": { lat: 34.0522, lng: -118.2437 },
      "la": { lat: 34.0522, lng: -118.2437 },
      chicago: { lat: 41.8781, lng: -87.6298 },
      berlin: { lat: 52.52, lng: 13.405 },
      moscow: { lat: 55.7558, lng: 37.6176 },
      beijing: { lat: 39.9042, lng: 116.4074 },
      "san francisco": { lat: 37.7749, lng: -122.4194 },
      "miami": { lat: 25.7617, lng: -80.1918 },
      "denver": { lat: 39.7392, lng: -104.9903 },
      "seattle": { lat: 47.6062, lng: -122.3321 },
      "toronto": { lat: 43.6532, lng: -79.3832 },
      "vancouver": { lat: 49.2827, lng: -123.1207 },
      "montreal": { lat: 45.5017, lng: -73.5673 },
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
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-white/80 backdrop-blur-sm rounded-xl">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">Fossils Near You</h1>
              <p className="text-gray-600 text-lg">Discover dinosaur fossil sites within 3,000km of your location</p>
              <div className="flex justify-center space-x-2 mt-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple search */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Enter your city (e.g., New York, London, Tokyo)..."
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  className="pl-10 border-gray-300 bg-white/80 backdrop-blur-sm rounded-xl"
                  onKeyPress={(e) => e.key === "Enter" && searchLocation()}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={getCurrentLocation} variant="outline" disabled={isLoading} className="bg-white/80 backdrop-blur-sm rounded-xl border-gray-300 hover:bg-white">
                <Navigation className="mr-2 h-4 w-4" />
                My Location
              </Button>
              <Button onClick={searchLocation} disabled={isLoading} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg">
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
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-white/20">
            <Button 
              variant={viewMode === "map" ? "default" : "ghost"} 
              onClick={() => setViewMode("map")} 
              size="sm"
              className={viewMode === "map" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl" : "rounded-xl hover:bg-white/80"}
            >
              <Map className="mr-2 h-4 w-4" />
              Map
            </Button>
            <Button 
              variant={viewMode === "grid" ? "default" : "ghost"} 
              onClick={() => setViewMode("grid")} 
              size="sm"
              className={viewMode === "grid" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl" : "rounded-xl hover:bg-white/80"}
            >
              <Grid className="mr-2 h-4 w-4" />
              Cards
            </Button>
          </div>
        </div>

        {/* Content */}
        {viewMode === "map" ? (
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div ref={cesiumContainerRef} className="w-full h-96 md:h-[500px]" style={{ background: "#f8f9fa" }} />
            <div className="p-6">
              <h3 className="font-bold text-xl mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Global Fossil Discovery Sites</h3>
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
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">Sites Within 3,000km</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nearbyFossils.map((location) => (
                    <FossilDiscoveryCard key={location.id} location={location} distance={location.distance} />
                  ))}
                </div>
              </div>
            )}

            {(nearbyFossils.length === 0 || alternativeFossils.length > 0) && (
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
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
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">Start Your Discovery</h3>
                <p className="text-gray-600 mb-4">Enter your location to find fossil sites near you</p>
                <Button onClick={getCurrentLocation} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg">
                  <Navigation className="mr-2 h-4 w-4" />
                  Use My Location
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Info section */}
        <div className="mt-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 text-center">About Fossil Sites</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3">Museums</h3>
              <p className="text-gray-600 text-sm">Visit world-class museums to see actual fossils and specimens.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3">Ancient History</h3>
              <p className="text-gray-600 text-sm">Explore fossils from 252 to 66 million years ago.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3">Guided Tours</h3>
              <p className="text-gray-600 text-sm">Join educational programs and fossil hunting experiences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}