"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { X, MapPin, Calendar, Ruler, Eye, Navigation } from "lucide-react"
import { dinosaurs } from "@/lib/dinosaur-data"

declare global {
  interface Window {
    Cesium: any
  }
}

// Better spaced dinosaur locations with regional organization
const dinosaurLocations = [
  // North America - Western US
  {
    id: "tyrannosaurus-rex",
    position: [-106.0, 47.5],
    icon: "/icons/tyrannosaurus-rex-new.png",
    region: "north-america",
  },
  {
    id: "triceratops",
    position: [-101.0, 45.0],
    icon: "/icons/triceratops-new.png",
    region: "north-america",
  },
  {
    id: "stegosaurus",
    position: [-108.0, 42.0],
    icon: "/icons/stegosaurus-new.png",
    region: "north-america",
  },
  {
    id: "allosaurus",
    position: [-104.0, 39.5],
    icon: "/icons/allosaurus-new.png",
    region: "north-america",
  },
  {
    id: "brachiosaurus",
    position: [-111.0, 44.0],
    icon: "/icons/brachiosaurus-new.png",
    region: "north-america",
  },
  {
    id: "diplodocus",
    position: [-107.0, 41.0],
    icon: "/icons/diplodocus-new.png",
    region: "north-america",
  },
  {
    id: "ankylosaurus",
    position: [-115.0, 49.0],
    icon: "/icons/ankylosaurus-new.png",
    region: "north-america",
  },
  {
    id: "parasaurolophus",
    position: [-118.0, 51.5],
    icon: "/icons/parasaurolophus-new.png",
    region: "north-america",
  },
  {
    id: "pteranodon",
    position: [-98.0, 38.5],
    icon: "/icons/pteranodon-new.png",
    region: "north-america",
  },

  // Asia - Mongolia/China
  {
    id: "velociraptor",
    position: [108.0, 46.0],
    icon: "/icons/velociraptor-new.png",
    region: "asia",
  },

  // Africa - North Africa
  {
    id: "spinosaurus",
    position: [30.0, 26.0],
    icon: "/icons/spinosaurus-new.png",
    region: "africa",
  },

  // Europe - Western Europe
  {
    id: "iguanodon",
    position: [4.0, 50.5],
    icon: "/icons/iguanodon-new.png",
    region: "europe",
  },
  {
    id: "mosasaurus",
    position: [6.5, 52.0],
    icon: "/icons/mosasaurus-new.png",
    region: "europe",
  },

  // South America - Argentina
  {
    id: "carnotaurus",
    position: [-64.0, -40.0],
    icon: "/icons/carnotaurus-new.png",
    region: "south-america",
  },
]

// Simple fossil info card component
function FossilInfoCard({ dinosaur, onClose }: { dinosaur: any; onClose: () => void }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="absolute top-20 left-4 w-72 h-40 perspective-1000 z-40">
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front - Fossil Image */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="relative h-full">
            <img
              src={dinosaur.fossilImage || "/placeholder.svg?height=160&width=288&text=Fossil"}
              alt={`${dinosaur.name} fossil`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=160&width=288&text=Fossil+Not+Found"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <h3 className="text-white font-semibold text-sm">{dinosaur.name} Fossil</h3>
              <p className="text-white/80 text-xs">{dinosaur.discoveryLocation?.name || "Discovery Site"}</p>
            </div>
            <button
              onClick={onClose}
              className="absolute top-2 right-2 w-6 h-6 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
            <button
              onClick={() => setIsFlipped(true)}
              className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs transition-colors"
            >
              <Eye className="h-3 w-3 inline mr-1" />
              Info
            </button>
          </div>
        </div>

        {/* Back - Fossil Info */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm text-gray-900">{dinosaur.name}</h3>
            <button onClick={() => setIsFlipped(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
              ✕
            </button>
          </div>

          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Discovered: {dinosaur.firstDiscovered}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{dinosaur.fossilsFound}</span>
            </div>
            <div className="flex items-center gap-1">
              <Ruler className="h-3 w-3" />
              <span>
                {dinosaur.length}m long, {dinosaur.height}m tall
              </span>
            </div>
            <div className="mt-2">
              <p className="text-gray-700 leading-relaxed text-xs">{dinosaur.funFact.substring(0, 100)}...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const cesiumContainerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<any>(null)
  const [selectedDinosaur, setSelectedDinosaur] = useState<any>(null)
  const [showFossilCard, setShowFossilCard] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [highlightedRegion, setHighlightedRegion] = useState<string | null>(null)
  const entitiesRef = useRef<any[]>([])
  const [cesiumError, setCesiumError] = useState<string | null>(null)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const loadCesium = async () => {
      try {
        if (typeof window === "undefined") {
          setCesiumError("Window not available")
          setIsLoading(false)
          return
        }

        if (!window.Cesium) {
          console.log("Loading Cesium...")

          const script = document.createElement("script")
          script.src = "https://cesium.com/downloads/cesiumjs/releases/1.111/Build/Cesium/Cesium.js"
          script.async = true

          const link = document.createElement("link")
          link.href = "https://cesium.com/downloads/cesiumjs/releases/1.111/Build/Cesium/Widgets/widgets.css"
          link.rel = "stylesheet"

          document.head.appendChild(link)
          document.head.appendChild(script)

          timeoutId = setTimeout(() => {
            setCesiumError("Cesium loading timeout")
            setIsLoading(false)
          }, 15000)

          script.onload = () => {
            clearTimeout(timeoutId)
            console.log("Cesium loaded successfully")
            setTimeout(() => {
              if (window.Cesium) {
                initializeCesium()
              } else {
                setCesiumError("Cesium failed to initialize")
                setIsLoading(false)
              }
            }, 500)
          }

          script.onerror = () => {
            clearTimeout(timeoutId)
            setCesiumError("Failed to load Cesium script")
            setIsLoading(false)
          }
        } else {
          console.log("Cesium already loaded")
          initializeCesium()
        }
      } catch (error: any) {
        console.error("Error in loadCesium:", error)
        setCesiumError("Failed to load Cesium")
        setIsLoading(false)
      }
    }

    const initializeCesium = async () => {
      try {
        if (!cesiumContainerRef.current) {
          setCesiumError("Container not available")
          setIsLoading(false)
          return
        }

        if (viewerRef.current) {
          console.log("Viewer already exists")
          return
        }

        if (!window.Cesium) {
          setCesiumError("Cesium not available")
          setIsLoading(false)
          return
        }

        console.log("Initializing Cesium viewer...")

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

        if (!viewer) {
          throw new Error("Failed to create Cesium viewer")
        }

        console.log("Viewer created successfully")
        viewerRef.current = viewer

        const scene = viewer.scene
        const camera = viewer.camera

        if (!scene || !camera) {
          throw new Error("Scene or camera not available")
        }

        scene.screenSpaceCameraController.inertiaSpin = 0
        scene.screenSpaceCameraController.inertiaTranslate = 0
        scene.screenSpaceCameraController.inertiaZoom = 0

        camera.setView({
          destination: window.Cesium.Cartesian3.fromDegrees(-95.0, 40.0, 15000000),
          orientation: {
            heading: 0.0,
            pitch: -window.Cesium.Math.PI_OVER_TWO,
            roll: 0.0,
          },
        })

        if (scene.skyAtmosphere) {
          scene.skyAtmosphere.show = true
        }

        if (scene.globe) {
          scene.globe.enableLighting = true
        }

        // Add region highlighting functionality
        const addRegionHighlight = (region: string) => {
          // Remove existing highlights
          viewer.entities.removeAll()
          
          // Re-add dinosaur entities
          addDinosaurEntities()
          
          // Add professional region highlight with country borders
          let countryBorders: number[][][] = []
          
          switch (region) {
            case 'north-america':
              // USA outline (simplified)
              countryBorders = [
                [
                  [-125, 49], [-95, 49], [-95, 45], [-83, 45], [-83, 42], [-75, 42],
                  [-75, 40], [-70, 40], [-70, 35], [-75, 35], [-80, 30], [-85, 25],
                  [-95, 25], [-100, 28], [-110, 32], [-115, 35], [-120, 40], [-125, 45], [-125, 49]
                ]
              ]
              break
            case 'asia':
              // Mongolia/China outline (simplified)
              countryBorders = [
                [
                  [87, 50], [120, 50], [135, 45], [135, 40], [125, 35], [110, 35],
                  [95, 40], [87, 45], [87, 50]
                ]
              ]
              break
            case 'africa':
              // Egypt outline (simplified)
              countryBorders = [
                [
                  [25, 32], [35, 32], [35, 22], [25, 22], [25, 32]
                ]
              ]
              break
            case 'europe':
              // Belgium/Netherlands outline (simplified)
              countryBorders = [
                [
                  [2, 52], [8, 52], [8, 50], [2, 50], [2, 52]
                ]
              ]
              break
            case 'south-america':
              // Argentina outline (simplified)
              countryBorders = [
                [
                  [-75, -20], [-55, -20], [-55, -55], [-75, -55], [-75, -20]
                ]
              ]
              break
          }
          
          // Add country border highlights
          countryBorders.forEach((border, index) => {
            viewer.entities.add({
              polyline: {
                positions: window.Cesium.Cartesian3.fromDegreesArray(border.flat()),
                width: 6,
                material: window.Cesium.Color.fromCssColorString("#ff6b35"),
                clampToGround: true,
                zIndex: 1000,
              }
            })
            
            // Add subtle fill
            viewer.entities.add({
              polygon: {
                hierarchy: window.Cesium.Cartesian3.fromDegreesArray(border.flat()),
                material: window.Cesium.Color.fromCssColorString("#ff6b35").withAlpha(0.15),
                outline: false,
                height: 0,
                extrudedHeight: 50000,
              }
            })
          })
        }

        console.log("Adding dinosaur entities...")

        const addDinosaurEntities = () => {
          // Add dinosaur entities with enhanced functionality and error handling
          dinosaurLocations.forEach((location, index) => {
            const dinosaur = dinosaurs.find((d) => d.id === location.id)
            if (dinosaur) {
              try {
                // Create professional dinosaur icon with better visibility
                const canvas = document.createElement("canvas")
                canvas.width = 64
                canvas.height = 64
                const ctx = canvas.getContext("2d")
                if (ctx) {
                  // Create professional gradient background
                  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 28)
                  gradient.addColorStop(0, "#ffffff")
                  gradient.addColorStop(0.3, "#4285f4")
                  gradient.addColorStop(1, "#1a73e8")
                  
                  ctx.fillStyle = gradient
                  ctx.beginPath()
                  ctx.arc(32, 32, 28, 0, 2 * Math.PI)
                  ctx.fill()
                  
                  // Add professional border
                  ctx.strokeStyle = "#1a73e8"
                  ctx.lineWidth = 4
                  ctx.stroke()
                  
                  // Add inner white border
                  ctx.strokeStyle = "#ffffff"
                  ctx.lineWidth = 2
                  ctx.stroke()
                  
                  // Add dinosaur icon
                  ctx.fillStyle = "white"
                  ctx.font = "bold 24px Arial"
                  ctx.textAlign = "center"
                  ctx.fillText("🦕", 32, 40)
                  
                  // Add shadow effect
                  ctx.shadowColor = "rgba(0,0,0,0.3)"
                  ctx.shadowBlur = 4
                  ctx.shadowOffsetX = 2
                  ctx.shadowOffsetY = 2
                }

                const entity = viewer.entities.add({
                  position: window.Cesium.Cartesian3.fromDegrees(location.position[0], location.position[1]),
                  billboard: {
                    image: canvas.toDataURL(),
                    scale: 1.0,
                    verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
                    heightReference: window.Cesium.HeightReference.CLAMP_TO_GROUND,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                    scaleByDistance: new window.Cesium.NearFarScalar(1.0e3, 1.2, 1.0e7, 0.6),
                    pixelOffset: new window.Cesium.Cartesian2(0, -5),
                  },
                  label: {
                    text: dinosaur.name,
                    font: "bold 18px Arial",
                    pixelOffset: new window.Cesium.Cartesian2(0, -80),
                    fillColor: window.Cesium.Color.WHITE,
                    outlineColor: window.Cesium.Color.BLACK,
                    outlineWidth: 3,
                    style: window.Cesium.LabelStyle.FILL_AND_OUTLINE,
                    show: false,
                    backgroundColor: window.Cesium.Color.fromCssColorString("#1a73e8").withAlpha(0.9),
                    backgroundPadding: new window.Cesium.Cartesian2(12, 8),
                    showBackground: true,
                  },
                  properties: {
                    dinosaur: dinosaur,
                    location: location,
                    region: location.region,
                    bouncePhase: index * 0.3,
                  },
                })

                entitiesRef.current.push(entity)
              } catch (entityError) {
                console.warn("Failed to create entity for:", dinosaur.name, entityError)
              }
            }
          })
        }

        addDinosaurEntities()

        entitiesRef.current.forEach((entity) => {
          entity.show = true
        })

        // Add subtle bouncing animation
        let bounceTime = 0
        if (viewer.clock && viewer.clock.onTick) {
          viewer.clock.onTick.addEventListener(() => {
            bounceTime += 0.01
            entitiesRef.current.forEach((entity) => {
              if (entity.billboard && entity.show && entity.properties) {
                try {
                  const bouncePhase = entity.properties.bouncePhase.getValue()
                  const bounceOffset = Math.sin(bounceTime + bouncePhase) * 2
                  entity.billboard.pixelOffset = new window.Cesium.Cartesian2(0, -2 + bounceOffset)
                } catch (bounceError) {
                  // Ignore bounce errors
                }
              }
            })
          })
        }

        // Simple hover effects
        if (viewer.screenSpaceEventHandler) {
          viewer.screenSpaceEventHandler.setInputAction((event: any) => {
            try {
              const pickedObject = viewer.scene.pick(event.endPosition)

              entitiesRef.current.forEach((entity) => {
                if (entity.billboard) {
                  entity.billboard.scale = 1.0
                  entity.label.show = false
                  entity.billboard.color = window.Cesium.Color.WHITE
                }
              })

              if (pickedObject && pickedObject.id && pickedObject.id.billboard) {
                pickedObject.id.billboard.scale = 1.3
                pickedObject.id.label.show = true
                pickedObject.id.billboard.color = window.Cesium.Color.WHITE
              }
            } catch (hoverError) {
              console.warn("Hover effect error:", hoverError)
            }
          }, window.Cesium.ScreenSpaceEventType.MOUSE_MOVE)

          // Enhanced click handler with zoom functionality
          viewer.screenSpaceEventHandler.setInputAction((event: any) => {
            try {
              const pickedObject = viewer.scene.pick(event.position)
              if (
                pickedObject &&
                pickedObject.id &&
                pickedObject.id.properties &&
                pickedObject.id.properties.dinosaur
              ) {
                const dinosaur = pickedObject.id.properties.dinosaur.getValue()
                const location = pickedObject.id.properties.location.getValue()

                // Zoom to the dinosaur's region
                const zoomPosition = window.Cesium.Cartesian3.fromDegrees(
                  location.position[0],
                  location.position[1],
                  2000000, // 2000km altitude for regional view
                )

                // Highlight the region
                setHighlightedRegion(location.region)
                addRegionHighlight(location.region)

                camera.flyTo({
                  destination: zoomPosition,
                  duration: 1.5,
                  complete: () => {
                    setSelectedDinosaur(dinosaur)
                    setShowFossilCard(dinosaur)
                  },
                })
              }
            } catch (clickError) {
              console.warn("Click handler error:", clickError)
            }
          }, window.Cesium.ScreenSpaceEventType.LEFT_CLICK)
        }

        console.log("Cesium initialization complete")
        setIsLoading(false)
        setCesiumError(null)
      } catch (error: any) {
        console.error("Error initializing Cesium:", error)
        setCesiumError(`Initialization failed: ${error.message}`)
        setIsLoading(false)
      }
    }

    loadCesium()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy()
          viewerRef.current = null
        } catch (error) {
          console.warn("Error destroying viewer:", error)
        }
      }
    }
  }, [])

  const closeDinosaurInfo = () => {
    setSelectedDinosaur(null)
    setShowFossilCard(null)
    setHighlightedRegion(null)

    // Reset camera to global view
    if (viewerRef.current && window.Cesium) {
      // Clear all entities and re-add dinosaurs without highlights
      viewerRef.current.entities.removeAll()
      entitiesRef.current = []
      
      // Re-add dinosaur entities
      dinosaurLocations.forEach((location, index) => {
        const dinosaur = dinosaurs.find((d) => d.id === location.id)
        if (dinosaur) {
          try {
            const canvas = document.createElement("canvas")
            canvas.width = 64
            canvas.height = 64
            const ctx = canvas.getContext("2d")
            if (ctx) {
              const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 28)
              gradient.addColorStop(0, "#ffffff")
              gradient.addColorStop(0.3, "#4285f4")
              gradient.addColorStop(1, "#1a73e8")
              
              ctx.fillStyle = gradient
              ctx.beginPath()
              ctx.arc(32, 32, 28, 0, 2 * Math.PI)
              ctx.fill()
              
              ctx.strokeStyle = "#1a73e8"
              ctx.lineWidth = 4
              ctx.stroke()
              
              ctx.strokeStyle = "#ffffff"
              ctx.lineWidth = 2
              ctx.stroke()
              
              ctx.fillStyle = "white"
              ctx.font = "bold 24px Arial"
              ctx.textAlign = "center"
              ctx.fillText("🦕", 32, 40)
            }

            const entity = viewerRef.current.entities.add({
              position: window.Cesium.Cartesian3.fromDegrees(location.position[0], location.position[1]),
              billboard: {
                image: canvas.toDataURL(),
                scale: 1.0,
                verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
                heightReference: window.Cesium.HeightReference.CLAMP_TO_GROUND,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                scaleByDistance: new window.Cesium.NearFarScalar(1.0e3, 1.2, 1.0e7, 0.6),
                pixelOffset: new window.Cesium.Cartesian2(0, -5),
              },
              label: {
                text: dinosaur.name,
                font: "bold 18px Arial",
                pixelOffset: new window.Cesium.Cartesian2(0, -80),
                fillColor: window.Cesium.Color.WHITE,
                outlineColor: window.Cesium.Color.BLACK,
                outlineWidth: 3,
                style: window.Cesium.LabelStyle.FILL_AND_OUTLINE,
                show: false,
                backgroundColor: window.Cesium.Color.fromCssColorString("#1a73e8").withAlpha(0.9),
                backgroundPadding: new window.Cesium.Cartesian2(12, 8),
                showBackground: true,
              },
              properties: {
                dinosaur: dinosaur,
                location: location,
                region: location.region,
                bouncePhase: index * 0.3,
              },
            })

            entitiesRef.current.push(entity)
          } catch (error) {
            console.warn("Failed to recreate entity:", error)
          }
        }
      })
      
      viewerRef.current.camera.flyTo({
        destination: window.Cesium.Cartesian3.fromDegrees(-95.0, 40.0, 15000000),
        duration: 1.5,
      })
    }
  }

  const getDietIcon = (diet: string) => {
    switch (diet) {
      case "Carnivore":
        return "🥩"
      case "Herbivore":
        return "🌿"
      case "Omnivore":
        return "🍽️"
      case "Piscivore":
        return "🐟"
      default:
        return "🍽️"
    }
  }

  // Simple fallback content if Cesium fails
  if (cesiumError) {
    return (
      <div className="h-screen w-full overflow-hidden relative bg-gradient-to-b from-blue-50 to-white">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-14">
              <div className="flex items-baseline space-x-8">
                <Link href="/explore" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Explore
                </Link>
                <Link href="/near-you" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Near You
                </Link>
                <Link href="/fights" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  Fights
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                  About
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center justify-center h-full">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="text-6xl mb-6">🌍</div>
            <h1 className="text-3xl font-normal text-gray-900 mb-4">Mesozoic Era</h1>
            <h2 className="text-lg text-gray-600 mb-6">Explore the World of Dinosaurs</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm">3D Globe temporarily unavailable</p>
            </div>
            <div className="space-y-3">
              <Link
                href="/explore"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium transition-colors"
              >
                Browse All Dinosaurs
              </Link>
              <Link
                href="/near-you"
                className="block w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-medium transition-colors"
              >
                Find Fossils Near You
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-full overflow-hidden relative">
      <div ref={cesiumContainerRef} className="absolute inset-0 w-full h-full" />

      {/* Fossil Info Card - positioned below header */}
      {showFossilCard && <FossilInfoCard dinosaur={showFossilCard} onClose={() => setShowFossilCard(null)} />}

      {/* Simple Google-style navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-14">
            <div className="flex items-baseline space-x-8">
              <Link href="/explore" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Explore
              </Link>
              <Link href="/near-you" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Near You
              </Link>
              <Link href="/fights" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Fights
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Earth...</h3>
            <p className="text-gray-600 text-sm">Preparing your journey through time</p>
          </div>
        </div>
      )}

      {!selectedDinosaur && !isLoading && (
        <div className="absolute top-20 left-0 right-0 z-30 text-center px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h1 className="text-4xl md:text-5xl mb-4 text-white font-light">Mesozoic Era</h1>
              <h2 className="text-lg mb-4 text-slate-200 font-light">Explore the World of Dinosaurs</h2>
              <div className="flex justify-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
            <p className="text-sm max-w-lg mx-auto text-slate-300">
              Click on dinosaur icons to zoom into their regions and discover fossil information
            </p>
          </div>
        </div>
      )}

      {selectedDinosaur && (
        <div className="absolute top-0 right-0 w-full md:w-96 h-full bg-white/95 backdrop-blur-md z-40 overflow-y-auto shadow-2xl border-l border-gray-200">
          <div className="p-6">
            <button
              onClick={closeDinosaurInfo}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/80 transition-all duration-200 backdrop-blur-sm"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>

            <div className="mt-8">
              <div className="mb-6">
                <img
                  src={selectedDinosaur.renderImage || selectedDinosaur.images[0] || "/placeholder.svg"}
                  alt={selectedDinosaur.name}
                  className="w-full h-48 object-cover rounded-xl mb-4 shadow-lg"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=160&width=320&text=Image+Not+Found"
                  }}
                />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedDinosaur.name}</h2>
              <p className="text-lg text-gray-600 italic mb-6">{selectedDinosaur.scientificName}</p>

              <div className="flex flex-wrap gap-3 mb-8">
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                  {selectedDinosaur.period}
                </span>
                <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                  {getDietIcon(selectedDinosaur.diet)} {selectedDinosaur.diet}
                </span>
                <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                  {selectedDinosaur.length}m long
                </span>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
                    Overview
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{selectedDinosaur.overview}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center">
                    <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full mr-3"></div>
                    Discovery
                  </h3>
                  <p className="text-gray-700">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    {selectedDinosaur.discoveryLocation?.name || selectedDinosaur.fossilsFound}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center">
                    <div className="w-1 h-6 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full mr-3"></div>
                    Fun Fact
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{selectedDinosaur.funFact}</p>
                </div>
              </div>

              <div className="mt-10">
                <Link
                  href={`/dinosaur/${selectedDinosaur.id}`}
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-center py-4 px-6 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}