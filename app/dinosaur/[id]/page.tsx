"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { dinosaurs } from "@/lib/dinosaur-data"

interface DinosaurDetailPageProps {
  params: { id: string }
}

export default function DinosaurDetailPage({ params }: DinosaurDetailPageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Handle the params Promise properly
    if (params instanceof Promise) {
      params.then(setResolvedParams)
    } else {
      setResolvedParams(params)
    }
  }, [params])

  if (!resolvedParams) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const dinosaur = dinosaurs.find((d) => d.id === resolvedParams.id)

  if (!dinosaur) {
    notFound()
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % dinosaur.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + dinosaur.images.length) % dinosaur.images.length)
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

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/explore">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Explore
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Carousel */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={dinosaur.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${dinosaur.name} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />

                {dinosaur.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Image Thumbnails */}
            {dinosaur.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {dinosaur.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? "border-[#1A73E8]" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${dinosaur.name} thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{dinosaur.name}</h1>
              <p className="text-xl text-gray-600 italic mb-4">{dinosaur.scientificName}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{dinosaur.period} Period</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {getDietIcon(dinosaur.diet)} {dinosaur.diet}
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">{dinosaur.length}m long</span>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Characteristics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Speed</span>
                    <span className="text-sm text-gray-600">{dinosaur.speed}/100</span>
                  </div>
                  <Progress value={dinosaur.speed} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Strength</span>
                    <span className="text-sm text-gray-600">{dinosaur.strength}/100</span>
                  </div>
                  <Progress value={dinosaur.strength} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Intelligence</span>
                    <span className="text-sm text-gray-600">{dinosaur.intelligence}/100</span>
                  </div>
                  <Progress value={dinosaur.intelligence} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Bite Force</span>
                    <span className="text-sm text-gray-600">{dinosaur.biteForce}/100</span>
                  </div>
                  <Progress value={dinosaur.biteForce} className="h-2" />
                </div>
              </div>
            </div>

            {/* Human Comparison */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Size Comparison</h3>
              <div className="flex items-end space-x-4">
                <div className="text-center">
                  <div className="w-8 bg-[#1A73E8] rounded-t" style={{ height: "60px" }}></div>
                  <p className="text-xs mt-2">
                    Human
                    <br />
                    1.8m
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className="w-12 bg-green-500 rounded-t"
                    style={{ height: `${Math.min(dinosaur.length * 3, 200)}px` }}
                  ></div>
                  <p className="text-xs mt-2">
                    {dinosaur.name}
                    <br />
                    {dinosaur.length}m
                  </p>
                </div>
              </div>
            </div>

            {/* Tabbed Content */}
            <Tabs defaultValue="overview" className="bg-white rounded-2xl shadow-lg">
              <TabsList className="grid w-full grid-cols-4 p-1 m-1">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="habitat">Habitat</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="facts">Fun Facts</TabsTrigger>
              </TabsList>

              <div className="p-6">
                <TabsContent value="overview" className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{dinosaur.overview}</p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <h4 className="font-semibold text-gray-900">Height</h4>
                      <p className="text-gray-600">{dinosaur.height}m</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Length</h4>
                      <p className="text-gray-600">{dinosaur.length}m</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Brain Size</h4>
                      <p className="text-gray-600">{dinosaur.brainSize}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">First Discovered</h4>
                      <p className="text-gray-600">{dinosaur.firstDiscovered}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="habitat" className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{dinosaur.habitat}</p>
                </TabsContent>

                <TabsContent value="timeline" className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{dinosaur.timeline}</p>
                </TabsContent>

                <TabsContent value="facts" className="space-y-4">
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Fun Fact</h4>
                      <p className="text-blue-800">{dinosaur.funFact}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Trivia</h4>
                      <p className="text-green-800">{dinosaur.trivia}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">Fossils Found</h4>
                      <p className="text-purple-800">{dinosaur.fossilsFound}</p>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
