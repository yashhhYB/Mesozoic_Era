"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Dinosaur {
  id: string
  name: string
  images: string[]
  period: string
  diet: string
  length: number
  height: number
  speed: number
  strength: number
  intelligence: number
  biteForce: number
  brainSize: string
  scientificName: string
  firstDiscovered: string
  fossilsFound: string
  funFact: string
  trivia: string
  overview: string
  habitat: string
  timeline: string
}

interface DinosaurCardProps {
  dinosaur: Dinosaur
}

export function DinosaurCard({ dinosaur }: DinosaurCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

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

  const getPeriodColor = (period: string) => {
    switch (period) {
      case "Triassic":
        return "bg-red-100 text-red-800"
      case "Jurassic":
        return "bg-green-100 text-green-800"
      case "Cretaceous":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="relative h-96 w-full perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="aspect-square relative">
            <Image src={dinosaur.images[0] || "/placeholder.svg"} alt={dinosaur.name} fill className="object-cover" />
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-900 leading-tight">{dinosaur.name}</h3>
              <Badge className={getPeriodColor(dinosaur.period)}>{dinosaur.period}</Badge>
            </div>

            <p className="text-gray-600 text-sm italic mb-3">{dinosaur.scientificName}</p>

            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                {getDietIcon(dinosaur.diet)} {dinosaur.diet}
              </span>
              <span>{dinosaur.length}m long</span>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setIsFlipped(true)} className="flex-1 bg-[#1A73E8] hover:bg-[#1557B0]">
                View Details
              </Button>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl shadow-lg overflow-hidden text-white">
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{dinosaur.name}</h3>
              <button onClick={() => setIsFlipped(false)} className="text-white/70 hover:text-white transition-colors">
                ✕
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto">
              <div>
                <h4 className="font-semibold mb-1">Fun Fact</h4>
                <p className="text-sm text-white/80">{dinosaur.funFact}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Habitat</h4>
                <p className="text-sm text-white/80">{dinosaur.habitat.substring(0, 100)}...</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold">Height</h4>
                  <p className="text-white/80">{dinosaur.height}m</p>
                </div>
                <div>
                  <h4 className="font-semibold">Speed</h4>
                  <p className="text-white/80">{dinosaur.speed}/100</p>
                </div>
                <div>
                  <h4 className="font-semibold">Strength</h4>
                  <p className="text-white/80">{dinosaur.strength}/100</p>
                </div>
                <div>
                  <h4 className="font-semibold">Intelligence</h4>
                  <p className="text-white/80">{dinosaur.intelligence}/100</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-1">First Discovered</h4>
                <p className="text-sm text-white/80">{dinosaur.firstDiscovered}</p>
              </div>
            </div>

            <div className="mt-4">
              <Link href={`/dinosaur/${dinosaur.id}`}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Full Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
