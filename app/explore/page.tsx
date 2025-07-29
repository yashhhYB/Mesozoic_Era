"use client"

import { useState, useMemo } from "react"
import { DinosaurCard } from "@/components/dinosaur-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shuffle, Search, Filter, Grid, List, Star, Clock, Ruler, Zap } from "lucide-react"
import { dinosaurs } from "@/lib/dinosaur-data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [periodFilter, setPeriodFilter] = useState("all")
  const [dietFilter, setDietFilter] = useState("all")
  const [sizeFilter, setSizeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const filteredAndSortedDinosaurs = useMemo(() => {
    const filtered = dinosaurs.filter((dinosaur) => {
      const matchesSearch =
        dinosaur.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dinosaur.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPeriod = periodFilter === "all" || dinosaur.period === periodFilter
      const matchesDiet = dietFilter === "all" || dinosaur.diet === dietFilter
      const matchesSize =
        sizeFilter === "all" ||
        (sizeFilter === "small" && dinosaur.length < 10) ||
        (sizeFilter === "medium" && dinosaur.length >= 10 && dinosaur.length < 20) ||
        (sizeFilter === "large" && dinosaur.length >= 20)

      return matchesSearch && matchesPeriod && matchesDiet && matchesSize
    })

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "period":
          return a.period.localeCompare(b.period)
        case "size":
          return b.length - a.length
        case "speed":
          return b.speed - a.speed
        case "strength":
          return b.strength - a.strength
        case "discovered":
          return Number.parseInt(a.firstDiscovered) - Number.parseInt(b.firstDiscovered)
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, periodFilter, dietFilter, sizeFilter, sortBy])

  const getRandomDinosaur = () => {
    const randomIndex = Math.floor(Math.random() * dinosaurs.length)
    const randomDinosaur = dinosaurs[randomIndex]
    window.location.href = `/dinosaur/${randomDinosaur.id}`
  }

  const clearFilters = () => {
    setSearchTerm("")
    setPeriodFilter("all")
    setDietFilter("all")
    setSizeFilter("all")
    setSortBy("name")
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

  const getPeriodColor = (period: string) => {
    switch (period) {
      case "Triassic":
        return "bg-red-100 text-red-800 border-red-200"
      case "Jurassic":
        return "bg-green-100 text-green-800 border-green-200"
      case "Cretaceous":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Link href="/" className="absolute left-4">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-white/50">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Explore Dinosaurs
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                Discover the magnificent creatures that ruled the Earth during the Mesozoic Era
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  252-66 million years ago
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  {dinosaurs.length} species
                </span>
                <span className="flex items-center gap-1">
                  <Ruler className="h-4 w-4" />
                  Up to 26m long
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Filters Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Search & Filter</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search dinosaurs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/50 border-gray-200 focus:bg-white transition-colors"
                  />
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-white/50 border-gray-200 focus:bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                      <SelectItem value="period">Time Period</SelectItem>
                      <SelectItem value="size">Size (Largest First)</SelectItem>
                      <SelectItem value="speed">Speed</SelectItem>
                      <SelectItem value="strength">Strength</SelectItem>
                      <SelectItem value="discovered">Discovery Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Period Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                  <Select value={periodFilter} onValueChange={setPeriodFilter}>
                    <SelectTrigger className="bg-white/50 border-gray-200 focus:bg-white">
                      <SelectValue placeholder="All Periods" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Periods</SelectItem>
                      <SelectItem value="Triassic">Triassic (252-201 MYA)</SelectItem>
                      <SelectItem value="Jurassic">Jurassic (201-145 MYA)</SelectItem>
                      <SelectItem value="Cretaceous">Cretaceous (145-66 MYA)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Diet Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Diet</label>
                  <Select value={dietFilter} onValueChange={setDietFilter}>
                    <SelectTrigger className="bg-white/50 border-gray-200 focus:bg-white">
                      <SelectValue placeholder="All Diets" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Diets</SelectItem>
                      <SelectItem value="Carnivore">🥩 Carnivore</SelectItem>
                      <SelectItem value="Herbivore">🌿 Herbivore</SelectItem>
                      <SelectItem value="Omnivore">🍽️ Omnivore</SelectItem>
                      <SelectItem value="Piscivore">🐟 Piscivore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Size Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size Category</label>
                  <Select value={sizeFilter} onValueChange={setSizeFilter}>
                    <SelectTrigger className="bg-white/50 border-gray-200 focus:bg-white">
                      <SelectValue placeholder="All Sizes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sizes</SelectItem>
                      <SelectItem value="small">Small (&lt; 10m)</SelectItem>
                      <SelectItem value="medium">Medium (10-20m)</SelectItem>
                      <SelectItem value="large">Large (&gt; 20m)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={getRandomDinosaur}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                  >
                    <Shuffle className="mr-2 h-4 w-4" />
                    Random Dinosaur
                  </Button>

                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="w-full border-gray-200 hover:bg-gray-50 bg-transparent"
                  >
                    Clear Filters
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Quick Stats</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Showing:</span>
                      <span className="font-medium">{filteredAndSortedDinosaurs.length} dinosaurs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Periods:</span>
                      <span className="font-medium">3 eras</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size range:</span>
                      <span className="font-medium">0.5m - 26m</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div>
                <p className="text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{filteredAndSortedDinosaurs.length}</span> of{" "}
                  <span className="font-semibold text-gray-900">{dinosaurs.length}</span> dinosaurs
                </p>
                {(searchTerm || periodFilter !== "all" || dietFilter !== "all" || sizeFilter !== "all") && (
                  <p className="text-sm text-blue-600 mt-1">
                    Filters active -{" "}
                    <button onClick={clearFilters} className="underline hover:no-underline">
                      clear all
                    </button>
                  </p>
                )}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="px-3"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Period Timeline */}
            {periodFilter === "all" && (
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Mesozoic Era Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["Triassic", "Jurassic", "Cretaceous"].map((period) => {
                    const periodDinosaurs = dinosaurs.filter((d) => d.period === period)
                    return (
                      <div
                        key={period}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${getPeriodColor(period)}`}
                        onClick={() => setPeriodFilter(period)}
                      >
                        <h4 className="font-semibold mb-1">{period} Period</h4>
                        <p className="text-sm opacity-80 mb-2">
                          {period === "Triassic" && "252-201 million years ago"}
                          {period === "Jurassic" && "201-145 million years ago"}
                          {period === "Cretaceous" && "145-66 million years ago"}
                        </p>
                        <p className="text-sm font-medium">{periodDinosaurs.length} species</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Dinosaur Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedDinosaurs.map((dinosaur) => (
                  <DinosaurCard key={dinosaur.id} dinosaur={dinosaur} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAndSortedDinosaurs.map((dinosaur) => (
                  <div
                    key={dinosaur.id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-48 h-32 relative rounded-lg overflow-hidden">
                        <img
                          src={dinosaur.images[0] || "/placeholder.svg"}
                          alt={dinosaur.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between mb-3">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{dinosaur.name}</h3>
                            <p className="text-gray-600 italic">{dinosaur.scientificName}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${getPeriodColor(dinosaur.period)}`}
                            >
                              {dinosaur.period}
                            </span>
                            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                              {getDietIcon(dinosaur.diet)} {dinosaur.diet}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4 line-clamp-2">{dinosaur.overview}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          <span className="flex items-center gap-1">
                            <Ruler className="h-4 w-4" />
                            {dinosaur.length}m long
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="h-4 w-4" />
                            Speed: {dinosaur.speed}/100
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Discovered: {dinosaur.firstDiscovered}
                          </span>
                        </div>

                        <Link href={`/dinosaur/${dinosaur.id}`}>
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredAndSortedDinosaurs.length === 0 && (
              <div className="text-center py-16">
                <div className="text-8xl mb-6">🦕</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No dinosaurs found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Try adjusting your search terms or filters to discover more prehistoric creatures.
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
