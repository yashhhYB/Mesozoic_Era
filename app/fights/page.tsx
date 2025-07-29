"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Swords, RotateCcw, ArrowLeft, Zap, Shield, Brain, Flame } from "lucide-react"
import { dinosaurs } from "@/lib/dinosaur-data"
import Image from "next/image"
import Link from "next/link"

export default function FightsPage() {
  const [dinosaur1, setDinosaur1] = useState<string>("")
  const [dinosaur2, setDinosaur2] = useState<string>("")
  const [battleResult, setBattleResult] = useState<any>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const getDinosaur = (id: string) => dinosaurs.find((d) => d.id === id)

  const simulateBattle = () => {
    if (!dinosaur1 || !dinosaur2) return

    const dino1 = getDinosaur(dinosaur1)!
    const dino2 = getDinosaur(dinosaur2)!

    setIsAnimating(true)

    setTimeout(() => {
      const dino1Score = dino1.speed + dino1.strength + dino1.intelligence + dino1.biteForce
      const dino2Score = dino2.speed + dino2.strength + dino2.intelligence + dino2.biteForce

      let winner, outcome, battleDescription
      const scoreDiff = Math.abs(dino1Score - dino2Score)

      if (scoreDiff < 20) {
        outcome = "draw"
        winner = null
        battleDescription = "An epic clash that ended in a stalemate! Both dinosaurs proved equally matched."
      } else if (dino1Score > dino2Score) {
        outcome = "win"
        winner = dino1
        battleDescription = `${dino1.name} emerges victorious! Using superior ${dino1.speed > dino2.speed ? "speed" : dino1.strength > dino2.strength ? "strength" : "intelligence"}, it dominated the battlefield.`
      } else {
        outcome = "lose"
        winner = dino2
        battleDescription = `${dino2.name} claims victory! Its ${dino2.speed > dino1.speed ? "lightning-fast reflexes" : dino2.strength > dino1.strength ? "overwhelming power" : "tactical brilliance"} proved decisive.`
      }

      setBattleResult({
        dinosaur1: dino1,
        dinosaur2: dino2,
        winner,
        outcome,
        dino1Score,
        dino2Score,
        battleDescription,
      })
      setIsAnimating(false)
    }, 2000)
  }

  const resetBattle = () => {
    setBattleResult(null)
    setDinosaur1("")
    setDinosaur2("")
  }

  const getOutcomeColor = () => {
    if (!battleResult) return ""

    switch (battleResult.outcome) {
      case "draw":
        return "text-yellow-600"
      case "win":
        return "text-green-600"
      case "lose":
        return "text-red-600"
      default:
        return ""
    }
  }

  const StatIcon = ({ type }: { type: string }) => {
    switch (type) {
      case "speed":
        return <Zap className="h-4 w-4" />
      case "strength":
        return <Shield className="h-4 w-4" />
      case "intelligence":
        return <Brain className="h-4 w-4" />
      case "biteForce":
        return <Flame className="h-4 w-4" />
      default:
        return null
    }
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
              <h1 className="text-3xl font-light text-gray-900 mb-2">Battle Arena</h1>
              <p className="text-gray-600">Compare two dinosaurs in an epic prehistoric showdown</p>
            </div>
          </div>
        </div>

        {/* Battle setup */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-medium text-center mb-6">Choose Your Champions</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Dinosaur 1 */}
            <div className="text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium mb-3 text-red-800 flex items-center justify-center">
                  <Shield className="mr-2 h-4 w-4" />
                  Fighter 1
                </h3>
                <Select value={dinosaur1} onValueChange={setDinosaur1}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select first dinosaur" />
                  </SelectTrigger>
                  <SelectContent>
                    {dinosaurs.map((dino) => (
                      <SelectItem key={dino.id} value={dino.id} disabled={dino.id === dinosaur2}>
                        {dino.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {dinosaur1 && (
                  <div className="mt-4 p-3 bg-white rounded border">
                    <Image
                      src={getDinosaur(dinosaur1)!.renderImage || getDinosaur(dinosaur1)!.images[0]}
                      alt={getDinosaur(dinosaur1)!.name}
                      width={150}
                      height={150}
                      className="mx-auto rounded mb-2"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=150&width=150&text=Dinosaur"
                      }}
                    />
                    <h4 className="font-medium text-gray-900">{getDinosaur(dinosaur1)!.name}</h4>
                    <p className="text-gray-600 text-sm italic">{getDinosaur(dinosaur1)!.scientificName}</p>
                  </div>
                )}
              </div>
            </div>

            {/* VS Section */}
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-600 mb-2">VS</div>
                <Swords className="h-8 w-8 text-gray-400 mx-auto" />
              </div>
            </div>

            {/* Dinosaur 2 */}
            <div className="text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium mb-3 text-blue-800 flex items-center justify-center">
                  <Shield className="mr-2 h-4 w-4" />
                  Fighter 2
                </h3>
                <Select value={dinosaur2} onValueChange={setDinosaur2}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select second dinosaur" />
                  </SelectTrigger>
                  <SelectContent>
                    {dinosaurs.map((dino) => (
                      <SelectItem key={dino.id} value={dino.id} disabled={dino.id === dinosaur1}>
                        {dino.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {dinosaur2 && (
                  <div className="mt-4 p-3 bg-white rounded border">
                    <Image
                      src={getDinosaur(dinosaur2)!.renderImage || getDinosaur(dinosaur2)!.images[0]}
                      alt={getDinosaur(dinosaur2)!.name}
                      width={150}
                      height={150}
                      className="mx-auto rounded mb-2"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=150&width=150&text=Dinosaur"
                      }}
                    />
                    <h4 className="font-medium text-gray-900">{getDinosaur(dinosaur2)!.name}</h4>
                    <p className="text-gray-600 text-sm italic">{getDinosaur(dinosaur2)!.scientificName}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Battle button */}
          <div className="text-center">
            <Button
              onClick={simulateBattle}
              disabled={!dinosaur1 || !dinosaur2 || isAnimating}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg font-medium"
            >
              {isAnimating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Battle in Progress...
                </>
              ) : (
                <>
                  <Swords className="mr-3 h-5 w-5" />
                  Start Battle
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Battle animation */}
        {isAnimating && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="text-center">
              <div className="text-6xl mb-4">⚔️</div>
              <h3 className="text-2xl font-medium text-gray-900 mb-2">Epic Battle in Progress!</h3>
              <p className="text-gray-600">The ancient titans clash in a legendary showdown...</p>
              <div className="mt-4 flex justify-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
                <div
                  className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Battle results */}
        {battleResult && !isAnimating && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-medium mb-3">Battle Results</h2>
              <div className="bg-gray-50 rounded-lg p-4 border">
                <p className={`text-xl font-medium ${getOutcomeColor()} mb-2`}>
                  {battleResult.outcome === "draw" ? "Epic Draw!" : `${battleResult.winner.name} Wins!`}
                </p>
                <p className="text-gray-700">{battleResult.battleDescription}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Dinosaur 1 Stats */}
              <div
                className={`p-4 rounded-lg border-2 ${
                  battleResult.winner?.id === battleResult.dinosaur1.id
                    ? "border-green-400 bg-green-50"
                    : battleResult.outcome === "draw"
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-red-400 bg-red-50"
                }`}
              >
                <div className="text-center mb-4">
                  <Image
                    src={battleResult.dinosaur1.renderImage || battleResult.dinosaur1.images[0]}
                    alt={battleResult.dinosaur1.name}
                    width={120}
                    height={120}
                    className="mx-auto rounded mb-2"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=120&width=120&text=Dinosaur"
                    }}
                  />
                  <h3 className="text-lg font-medium text-gray-900">{battleResult.dinosaur1.name}</h3>
                  <p className="text-gray-600">Combat Score: {battleResult.dino1Score}</p>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "Speed", value: battleResult.dinosaur1.speed, type: "speed", color: "bg-blue-500" },
                    { name: "Strength", value: battleResult.dinosaur1.strength, type: "strength", color: "bg-red-500" },
                    {
                      name: "Intelligence",
                      value: battleResult.dinosaur1.intelligence,
                      type: "intelligence",
                      color: "bg-green-500",
                    },
                    {
                      name: "Bite Force",
                      value: battleResult.dinosaur1.biteForce,
                      type: "biteForce",
                      color: "bg-orange-500",
                    },
                  ].map((stat) => (
                    <div key={stat.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 font-medium flex items-center text-sm">
                          <StatIcon type={stat.type} />
                          <span className="ml-2">{stat.name}</span>
                        </span>
                        <span className="text-gray-600 font-medium text-sm">{stat.value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${stat.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${stat.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dinosaur 2 Stats */}
              <div
                className={`p-4 rounded-lg border-2 ${
                  battleResult.winner?.id === battleResult.dinosaur2.id
                    ? "border-green-400 bg-green-50"
                    : battleResult.outcome === "draw"
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-red-400 bg-red-50"
                }`}
              >
                <div className="text-center mb-4">
                  <Image
                    src={battleResult.dinosaur2.renderImage || battleResult.dinosaur2.images[0]}
                    alt={battleResult.dinosaur2.name}
                    width={120}
                    height={120}
                    className="mx-auto rounded mb-2"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=120&width=120&text=Dinosaur"
                    }}
                  />
                  <h3 className="text-lg font-medium text-gray-900">{battleResult.dinosaur2.name}</h3>
                  <p className="text-gray-600">Combat Score: {battleResult.dino2Score}</p>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "Speed", value: battleResult.dinosaur2.speed, type: "speed", color: "bg-blue-500" },
                    { name: "Strength", value: battleResult.dinosaur2.strength, type: "strength", color: "bg-red-500" },
                    {
                      name: "Intelligence",
                      value: battleResult.dinosaur2.intelligence,
                      type: "intelligence",
                      color: "bg-green-500",
                    },
                    {
                      name: "Bite Force",
                      value: battleResult.dinosaur2.biteForce,
                      type: "biteForce",
                      color: "bg-orange-500",
                    },
                  ].map((stat) => (
                    <div key={stat.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 font-medium flex items-center text-sm">
                          <StatIcon type={stat.type} />
                          <span className="ml-2">{stat.name}</span>
                        </span>
                        <span className="text-gray-600 font-medium text-sm">{stat.value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${stat.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${stat.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={resetBattle}
                variant="outline"
                size="lg"
                className="px-6 py-3 font-medium bg-transparent"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Fight Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
