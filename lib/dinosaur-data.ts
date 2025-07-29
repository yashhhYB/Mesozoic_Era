export const dinosaurs = [
  {
    id: "tyrannosaurus-rex",
    name: "Tyrannosaurus Rex",
    images: ["/images/tyrannosaurus-rex-2.jpg", "/images/giganotosaurus.jpg", "/images/giganotosaurus-2.webp"],
    renderImage: "/images/giganotosaurus-render.jpeg",
    fossilImage: "/images/tyrannosaurus-rex-fossil.jpeg",
    period: "Cretaceous",
    diet: "Carnivore",
    speed: 85,
    height: 4.0,
    length: 12.3,
    strength: 95,
    intelligence: 75,
    biteForce: 95,
    brainSize: "Large for a theropod",
    scientificName: "Tyrannosaurus rex",
    firstDiscovered: "1902",
    fossilsFound: "Montana, South Dakota, Wyoming, USA",
    discoveryLocation: { lat: 47.0527, lng: -109.6333, name: "Hell Creek Formation, Montana" },
    funFact: "T. rex had teeth up to 8 inches long and could bite with a force of 12,800 pounds per square inch!",
    trivia: "Despite its fearsome reputation, T. rex may have been a scavenger as much as a hunter.",
    overview:
      'Tyrannosaurus rex, meaning "tyrant lizard king," was one of the largest land predators ever known. This massive theropod dinosaur lived during the late Cretaceous period and was characterized by its enormous head, powerful jaws filled with razor-sharp teeth, and relatively small arms.',
    habitat:
      "T. rex lived in forested river plains and coastal swamps in what is now western North America. The climate was warmer and more humid than today, with no polar ice caps.",
    timeline:
      "Lived approximately 68-66 million years ago during the Maastrichtian age of the late Cretaceous period. T. rex was among the last dinosaur species to exist before the mass extinction event.",
    discoveryStory:
      "The first T. rex fossil was discovered by Barnum Brown in 1902 in the Hell Creek Formation of Montana. Brown, working for the American Museum of Natural History, found partial remains that would later be designated as the holotype specimen.",
    museumLocations: [
      "American Museum of Natural History, New York",
      "Field Museum of Natural History, Chicago",
      "Smithsonian National Museum of Natural History, Washington D.C.",
    ],
  },
  {
    id: "triceratops",
    name: "Triceratops",
    images: [
      "/images/triceratops-2.webp",
      "/placeholder.svg?height=400&width=400&text=Triceratops-2",
      "/placeholder.svg?height=400&width=400&text=Triceratops-3",
    ],
    renderImage: "/placeholder.svg?height=400&width=400&text=Triceratops-Render",
    fossilImage: "/images/triceratops-fossil.jpeg",
    period: "Cretaceous",
    diet: "Herbivore",
    speed: 45,
    height: 3.0,
    length: 9.0,
    strength: 85,
    intelligence: 55,
    biteForce: 70,
    brainSize: "Medium",
    scientificName: "Triceratops horridus",
    firstDiscovered: "1889",
    fossilsFound: "Colorado, Montana, Wyoming, USA",
    discoveryLocation: { lat: 44.2619, lng: -105.5056, name: "Lance Formation, Wyoming" },
    funFact: "Triceratops had one of the largest skulls of any land animal, measuring up to 10 feet long!",
    trivia: 'Baby Triceratops are called "hatchlings" and their horns grew as they aged.',
    overview:
      "Triceratops was a large herbivorous dinosaur known for its distinctive three-horned face and large bony frill. It was one of the last dinosaur genera to appear before the great extinction event.",
    habitat:
      "Triceratops lived in open woodlands and plains, feeding on low-growing plants, ferns, and cycads in what is now North America.",
    timeline:
      "Lived during the late Cretaceous period, approximately 68-66 million years ago, making it a contemporary of T. rex.",
    discoveryStory:
      "The first Triceratops remains were discovered by George Lyman Cannon in 1887 near Denver, Colorado. Initially, the horned skull was thought to belong to an extinct bison, but Othniel Charles Marsh correctly identified it as a dinosaur in 1889.",
    museumLocations: [
      "Denver Museum of Nature & Science, Colorado",
      "Museum of the Rockies, Montana",
      "Natural History Museum of Los Angeles County, California",
    ],
  },
  {
    id: "velociraptor",
    name: "Velociraptor",
    images: [
      "/images/velociraptor-4.jpg",
      "/images/velociraptor-5.webp",
      "/images/velociraptor.webp",
      "/images/velociraptor-2.jpg",
    ],
    renderImage: "/images/velociraptor-render.webp",
    fossilImage: "/images/velociraptor-fossil.webp",
    period: "Cretaceous",
    diet: "Carnivore",
    speed: 95,
    height: 0.5,
    length: 2.0,
    strength: 60,
    intelligence: 90,
    biteForce: 55,
    brainSize: "Large relative to body size",
    scientificName: "Velociraptor mongoliensis",
    firstDiscovered: "1924",
    fossilsFound: "Mongolia, China",
    discoveryLocation: { lat: 44.2619, lng: 103.8467, name: "Djadochta Formation, Mongolia" },
    funFact: "Velociraptors were much smaller than depicted in movies - about the size of a large turkey!",
    trivia: "They had feathers and likely used them for display and temperature regulation.",
    overview:
      "Velociraptor was a small, fast, and intelligent predator with a distinctive sickle-shaped claw on each foot. Despite popular media portrayals, they were much smaller than commonly depicted.",
    habitat:
      "Velociraptors lived in arid desert environments with seasonal rivers and oases in what is now Mongolia and northern China.",
    timeline: "Lived during the late Cretaceous period, approximately 75-71 million years ago.",
    discoveryStory:
      "The first Velociraptor fossil was discovered by Peter Kaisen in 1923 during an American Museum of Natural History expedition to the Gobi Desert. The specimen was later described by Henry Fairfield Osborn in 1924.",
    museumLocations: [
      "American Museum of Natural History, New York",
      "Mongolian Natural History Museum, Ulaanbaatar",
      "Royal Tyrrell Museum, Alberta",
    ],
  },
  {
    id: "brachiosaurus",
    name: "Brachiosaurus",
    images: [
      "/images/brachiosaurus-2.png",
      "/placeholder.svg?height=400&width=400&text=Brachiosaurus-2",
      "/placeholder.svg?height=400&width=400&text=Brachiosaurus-3",
    ],
    renderImage: "/images/brachiosaurus-render.jpeg",
    fossilImage: "/images/brachiosaurus-fossil.webp",
    period: "Jurassic",
    diet: "Herbivore",
    speed: 25,
    height: 12.0,
    length: 26.0,
    strength: 90,
    intelligence: 40,
    biteForce: 30,
    brainSize: "Small relative to body size",
    scientificName: "Brachiosaurus altithorax",
    firstDiscovered: "1903",
    fossilsFound: "Colorado, Utah, USA; Tanzania",
    discoveryLocation: { lat: 39.0639, lng: -108.5506, name: "Morrison Formation, Colorado" },
    funFact: "Brachiosaurus could reach vegetation 30 feet off the ground with its long neck!",
    trivia: "Its front legs were longer than its back legs, giving it a giraffe-like posture.",
    overview:
      "Brachiosaurus was one of the largest dinosaurs, characterized by its extremely long neck and front legs that were longer than its hind legs, giving it a distinctive upright posture.",
    habitat: "Brachiosaurus lived in warm, humid environments with abundant coniferous forests and fern prairies.",
    timeline: "Lived during the late Jurassic period, approximately 156-145 million years ago.",
    discoveryStory:
      "The first Brachiosaurus remains were discovered by Elmer Riggs in 1900 in the Morrison Formation of western Colorado. The discovery revolutionized understanding of sauropod dinosaurs and their massive size.",
    museumLocations: [
      "Field Museum of Natural History, Chicago",
      "Natural History Museum, Berlin",
      "Dinosaur National Monument, Utah",
    ],
  },
  {
    id: "stegosaurus",
    name: "Stegosaurus",
    images: [
      "/images/stegosaurus-2.jpg",
      "/placeholder.svg?height=400&width=400&text=Stegosaurus-2",
      "/placeholder.svg?height=400&width=400&text=Stegosaurus-3",
    ],
    renderImage: "/images/stegosaurus-render.webp",
    fossilImage: "/images/stegosaurus-fossil.webp",
    period: "Jurassic",
    diet: "Herbivore",
    speed: 35,
    height: 4.0,
    length: 9.0,
    strength: 70,
    intelligence: 30,
    biteForce: 40,
    brainSize: "Very small (walnut-sized)",
    scientificName: "Stegosaurus stenops",
    firstDiscovered: "1877",
    fossilsFound: "Colorado, Utah, Wyoming, USA",
    discoveryLocation: { lat: 39.7392, lng: -104.9903, name: "Morrison Formation, Colorado" },
    funFact: "Stegosaurus had a brain the size of a walnut despite being as large as a bus!",
    trivia: "The plates on its back may have been used for temperature regulation and display.",
    overview:
      'Stegosaurus was a large herbivorous dinosaur known for the distinctive double row of plates along its back and four sharp spikes on its tail, called a "thagomizer."',
    habitat:
      "Stegosaurus lived in semi-arid environments with seasonal rainfall, feeding on low-growing plants and ferns.",
    timeline: "Lived during the late Jurassic period, approximately 155-150 million years ago.",
    discoveryStory:
      "The first Stegosaurus fossil was discovered by Arthur Lakes in 1877 near Morrison, Colorado. The discovery was part of the famous 'Bone Wars' between paleontologists Othniel Charles Marsh and Edward Drinker Cope.",
    museumLocations: [
      "Denver Museum of Nature & Science, Colorado",
      "Smithsonian National Museum of Natural History, Washington D.C.",
      "Natural History Museum, London",
    ],
  },
  {
    id: "allosaurus",
    name: "Allosaurus",
    images: [
      "/images/allosaurus-2.jpg",
      "/placeholder.svg?height=400&width=400&text=Allosaurus-2",
      "/placeholder.svg?height=400&width=400&text=Allosaurus-3",
    ],
    renderImage: "/images/allosaurus-render.webp",
    fossilImage: "/images/allosaurus-fossil.webp",
    period: "Jurassic",
    diet: "Carnivore",
    speed: 75,
    height: 3.2,
    length: 8.5,
    strength: 80,
    intelligence: 65,
    biteForce: 75,
    brainSize: "Medium",
    scientificName: "Allosaurus fragilis",
    firstDiscovered: "1877",
    fossilsFound: "Colorado, Montana, Utah, Wyoming, USA",
    discoveryLocation: { lat: 40.4555, lng: -109.2756, name: "Morrison Formation, Utah" },
    funFact: "Allosaurus was the most common predator in the Morrison Formation ecosystem!",
    trivia: "Some Allosaurus fossils show evidence of pack hunting behavior.",
    overview:
      "Allosaurus was a large theropod dinosaur and apex predator of the late Jurassic period. It had powerful legs, sharp claws, and a mouth full of serrated teeth.",
    habitat:
      "Allosaurus lived in semi-arid environments with rivers and floodplains, hunting sauropods and other herbivorous dinosaurs.",
    timeline: "Lived during the late Jurassic period, approximately 155-145 million years ago.",
    discoveryStory:
      "The first Allosaurus remains were discovered by Ferdinand Vandiveer Hayden in 1877 in Middle Park, Colorado. The species was later named and described by Othniel Charles Marsh.",
    museumLocations: [
      "Museum of the Rockies, Montana",
      "Cleveland Museum of Natural History, Ohio",
      "Dinosaur National Monument, Utah",
    ],
  },
  {
    id: "spinosaurus",
    name: "Spinosaurus",
    images: [
      "/images/spinosaurus-2.jpg",
      "/placeholder.svg?height=400&width=400&text=Spinosaurus-2",
      "/placeholder.svg?height=400&width=400&text=Spinosaurus-3",
    ],
    renderImage: "/images/spinosaurus-render.webp",
    fossilImage: "/placeholder.svg?height=400&width=400&text=Spinosaurus-Fossil",
    period: "Cretaceous",
    diet: "Piscivore",
    speed: 60,
    height: 5.0,
    length: 15.0,
    strength: 85,
    intelligence: 70,
    biteForce: 80,
    brainSize: "Large",
    scientificName: "Spinosaurus aegyptiacus",
    firstDiscovered: "1912",
    fossilsFound: "Egypt, Morocco",
    discoveryLocation: { lat: 27.1127, lng: 31.3219, name: "Bahariya Formation, Egypt" },
    funFact: "Spinosaurus was likely semi-aquatic and spent much of its time in water hunting fish!",
    trivia: "Its distinctive sail may have been used for thermoregulation and display.",
    overview:
      "Spinosaurus was one of the largest theropod dinosaurs, characterized by its distinctive sail-like structure on its back and semi-aquatic lifestyle.",
    habitat: "Spinosaurus lived in mangrove swamps and river systems in North Africa, primarily hunting large fish.",
    timeline: "Lived during the mid-Cretaceous period, approximately 112-93 million years ago.",
    discoveryStory:
      "The first Spinosaurus remains were discovered by Richard Markgraf in 1912 in the Bahariya Formation of Egypt. The original fossils were unfortunately destroyed during World War II bombing of Munich.",
    museumLocations: [
      "National Geographic Museum, Washington D.C.",
      "Museo di Storia Naturale, Milan",
      "Royal Ontario Museum, Toronto",
    ],
  },
  {
    id: "ankylosaurus",
    name: "Ankylosaurus",
    images: ["/images/ankylosaurus-2.jpg", "/images/ankylosaurus-3.jpg", "/images/ankylosaurus-fossil.jpeg"],
    renderImage: "/placeholder.svg?height=400&width=400&text=Ankylosaurus-Render",
    fossilImage: "/images/ankylosaurus-fossil.jpeg",
    period: "Cretaceous",
    diet: "Herbivore",
    speed: 20,
    height: 1.7,
    length: 6.25,
    strength: 90,
    intelligence: 45,
    biteForce: 35,
    brainSize: "Small",
    scientificName: "Ankylosaurus magniventris",
    firstDiscovered: "1908",
    fossilsFound: "Montana, Wyoming, USA; Alberta, Canada",
    discoveryLocation: { lat: 49.1951, lng: -110.6686, name: "Hell Creek Formation, Montana" },
    funFact: "Ankylosaurus was like a living tank with armor plating and a massive club tail!",
    trivia: "Its tail club could swing with enough force to break the bones of predators.",
    overview:
      "Ankylosaurus was a heavily armored herbivorous dinosaur, covered in bony plates and spikes, with a large club at the end of its tail for defense.",
    habitat: "Ankylosaurus lived in coastal plains and river deltas, feeding on low-growing plants and ferns.",
    timeline: "Lived during the late Cretaceous period, approximately 68-66 million years ago.",
    discoveryStory:
      "The first Ankylosaurus fossil was discovered by Barnum Brown in 1906 in the Hell Creek Formation of Montana. Brown named the genus in 1908, recognizing its unique heavily armored characteristics.",
    museumLocations: [
      "American Museum of Natural History, New York",
      "Royal Tyrrell Museum, Alberta",
      "Museum of the Rockies, Montana",
    ],
  },
  {
    id: "parasaurolophus",
    name: "Parasaurolophus",
    images: ["/images/parasaurolophus-2.webp", "/images/parasaurolophus-3.jpg", "/images/parasaurolophus-fossil.jpg"],
    renderImage: "/placeholder.svg?height=400&width=400&text=Parasaurolophus-Render",
    fossilImage: "/images/parasaurolophus-fossil.jpg",
    period: "Cretaceous",
    diet: "Herbivore",
    speed: 55,
    height: 3.0,
    length: 9.5,
    strength: 60,
    intelligence: 65,
    biteForce: 45,
    brainSize: "Medium",
    scientificName: "Parasaurolophus walkeri",
    firstDiscovered: "1922",
    fossilsFound: "Alberta, Canada; New Mexico, Utah, USA",
    discoveryLocation: { lat: 51.0447, lng: -114.0719, name: "Dinosaur Park Formation, Alberta" },
    funFact: "Parasaurolophus could produce musical sounds through its hollow crest!",
    trivia: "Different species had different crest shapes, producing different musical notes.",
    overview:
      "Parasaurolophus was a duck-billed dinosaur known for its distinctive hollow crest that functioned as a resonating chamber for producing sounds.",
    habitat: "Parasaurolophus lived in coastal plains and swamps, feeding on conifers, ferns, and flowering plants.",
    timeline: "Lived during the late Cretaceous period, approximately 76-73 million years ago.",
    discoveryStory:
      "The first Parasaurolophus specimen was discovered by Levi Sternberg in 1920 along the Red Deer River in Alberta, Canada. William Parks described and named the species in 1922.",
    museumLocations: [
      "Royal Ontario Museum, Toronto",
      "Canadian Museum of Nature, Ottawa",
      "New Mexico Museum of Natural History, Albuquerque",
    ],
  },
  {
    id: "diplodocus",
    name: "Diplodocus",
    images: [
      "/images/diplodocus-4.webp",
      "/images/diplodocus.webp",
      "/images/diplodocus-2.webp",
      "/images/diplodocus-3.webp",
    ],
    renderImage: "/images/diplodocus-render.webp",
    fossilImage: "/placeholder.svg?height=400&width=400&text=Diplodocus-Fossil",
    period: "Jurassic",
    diet: "Herbivore",
    speed: 30,
    height: 4.0,
    length: 26.0,
    strength: 75,
    intelligence: 40,
    biteForce: 25,
    brainSize: "Very small",
    scientificName: "Diplodocus longus",
    firstDiscovered: "1877",
    fossilsFound: "Colorado, Montana, Utah, Wyoming, USA",
    discoveryLocation: { lat: 39.7392, lng: -104.9903, name: "Morrison Formation, Colorado" },
    funFact: "Diplodocus could crack its tail like a whip, creating sonic booms!",
    trivia: "Despite its massive size, Diplodocus weighed less than many other sauropods due to its slender build.",
    overview:
      "Diplodocus was one of the longest dinosaurs, with an extremely long neck and tail. Its whip-like tail could be used for defense against predators.",
    habitat: "Diplodocus lived in semi-arid environments with seasonal rivers, feeding on conifers and ferns.",
    timeline: "Lived during the late Jurassic period, approximately 154-152 million years ago.",
    discoveryStory:
      "The first Diplodocus fossil was discovered by Benjamin Mudge and Samuel Wendell Williston in 1877 in Colorado. Othniel Charles Marsh named the genus in 1878.",
    museumLocations: [
      "Carnegie Museum of Natural History, Pittsburgh",
      "Natural History Museum, London",
      "Senckenberg Museum, Frankfurt",
    ],
  },
  {
    id: "pteranodon",
    name: "Pteranodon",
    images: ["/images/pteranodon.jpg", "/images/pteranodon-2.png", "/images/pteranodon-3.jpg"],
    renderImage: "/images/pteranodon-render.jpeg",
    fossilImage: "/images/pteranodon-fossil.webp",
    period: "Cretaceous",
    diet: "Piscivore",
    speed: 90,
    height: 1.8,
    length: 6.0,
    strength: 45,
    intelligence: 60,
    biteForce: 40,
    brainSize: "Medium",
    scientificName: "Pteranodon longiceps",
    firstDiscovered: "1876",
    fossilsFound: "Kansas, Alabama, Nebraska, USA",
    discoveryLocation: { lat: 38.5266, lng: -96.7265, name: "Niobrara Formation, Kansas" },
    funFact: "Pteranodon had a wingspan of up to 23 feet but weighed only about 55 pounds!",
    trivia: "Technically not a dinosaur, but a pterosaur - a flying reptile that lived alongside dinosaurs.",
    overview:
      "Pteranodon was a large pterosaur with an impressive wingspan and distinctive backward-pointing crest. It soared over ancient seas hunting for fish.",
    habitat: "Pteranodon lived along coastlines and over shallow seas, diving to catch fish and other marine life.",
    timeline: "Lived during the late Cretaceous period, approximately 88-80 million years ago.",
    discoveryStory:
      "The first Pteranodon fossil was discovered by Othniel Charles Marsh in 1876 in the Smoky Hill Chalk of western Kansas. The discovery helped establish the existence of giant flying reptiles.",
    museumLocations: [
      "Sternberg Museum of Natural History, Kansas",
      "Yale Peabody Museum, Connecticut",
      "Black Hills Institute, South Dakota",
    ],
  },
  {
    id: "iguanodon",
    name: "Iguanodon",
    images: [
      "/images/iguanodon-2.jpg",
      "/images/iguanodon-fossil.jpg",
      "/placeholder.svg?height=400&width=400&text=Iguanodon-3",
    ],
    renderImage: "/placeholder.svg?height=400&width=400&text=Iguanodon-Render",
    fossilImage: "/images/iguanodon-fossil.jpg",
    period: "Cretaceous",
    diet: "Herbivore",
    speed: 50,
    height: 3.0,
    length: 10.0,
    strength: 70,
    intelligence: 55,
    biteForce: 50,
    brainSize: "Medium",
    scientificName: "Iguanodon bernissartensis",
    firstDiscovered: "1825",
    fossilsFound: "Belgium, England, Germany, Spain",
    discoveryLocation: { lat: 50.4547, lng: 3.9878, name: "Bernissart, Belgium" },
    funFact: "Iguanodon was one of the first dinosaurs ever discovered and named!",
    trivia: "It had a distinctive thumb spike that was initially thought to be a horn on its nose.",
    overview:
      "Iguanodon was a large herbivorous dinosaur that could walk on both two and four legs. It had distinctive thumb spikes used for defense and food processing.",
    habitat:
      "Iguanodon lived in forested areas and river plains, feeding on a variety of plants including ferns, conifers, and early flowering plants.",
    timeline: "Lived during the early Cretaceous period, approximately 140-120 million years ago.",
    discoveryStory:
      "Iguanodon teeth were first discovered by Mary Ann Mantell in 1822 in Sussex, England. Her husband, Gideon Mantell, recognized their significance and named the genus in 1825, making it one of the first dinosaurs to be scientifically described.",
    museumLocations: [
      "Royal Belgian Institute of Natural Sciences, Brussels",
      "Natural History Museum, London",
      "Dinosaur Isle Museum, Isle of Wight",
    ],
  },
  {
    id: "carnotaurus",
    name: "Carnotaurus",
    images: [
      "/images/carnotaurus-3.webp",
      "/images/carnotaurus-2.webp",
      "/placeholder.svg?height=400&width=400&text=Carnotaurus-3",
    ],
    renderImage: "/images/carnotaurus-render.jpeg",
    fossilImage: "/images/carnotaurus-fossil.jpeg",
    period: "Cretaceous",
    diet: "Carnivore",
    speed: 90,
    height: 3.0,
    length: 8.0,
    strength: 75,
    intelligence: 70,
    biteForce: 70,
    brainSize: "Medium-large",
    scientificName: "Carnotaurus sastrei",
    firstDiscovered: "1985",
    fossilsFound: "Argentina",
    discoveryLocation: { lat: -42.7692, lng: -65.0438, name: "La Colonia Formation, Argentina" },
    funFact: "Carnotaurus was one of the fastest large predators, capable of running up to 35 mph!",
    trivia: 'Its name means "meat-eating bull" due to the horn-like projections above its eyes.',
    overview:
      "Carnotaurus was a fast-running theropod dinosaur with distinctive horns above its eyes and extremely reduced arms, even smaller than those of T. rex.",
    habitat:
      "Carnotaurus lived in river plains and forested areas in what is now South America, hunting smaller dinosaurs and other prey.",
    timeline: "Lived during the late Cretaceous period, approximately 72-69 million years ago.",
    discoveryStory:
      "Carnotaurus was discovered by José Bonaparte in 1985 in the Chubut Province of Argentina. The remarkably complete skeleton provided unprecedented insights into abelisaurid anatomy and locomotion.",
    museumLocations: [
      "Museo Argentino de Ciencias Naturales, Buenos Aires",
      "Field Museum of Natural History, Chicago",
      "Royal Tyrrell Museum, Alberta",
    ],
  },
  {
    id: "mosasaurus",
    name: "Mosasaurus",
    images: [
      "/images/mosasaurus-2.jpg",
      "/images/mosasaurus.jpg",
      "/placeholder.svg?height=400&width=400&text=Mosasaurus-3",
    ],
    renderImage: "/images/mosasaurus-render.jpeg",
    fossilImage: "/images/mosasaurus-fossil.jpeg",
    period: "Cretaceous",
    diet: "Carnivore",
    speed: 70,
    height: 2.0,
    length: 17.0,
    strength: 90,
    intelligence: 65,
    biteForce: 85,
    brainSize: "Large",
    scientificName: "Mosasaurus hoffmanni",
    firstDiscovered: "1764",
    fossilsFound: "Netherlands, Belgium, France, USA",
    discoveryLocation: { lat: 50.8503, lng: 5.691, name: "Maastricht Formation, Netherlands" },
    funFact: "Mosasaurus was a marine reptile that ruled the ancient seas with powerful flippers and massive jaws!",
    trivia: "Despite being called a 'sea dinosaur', Mosasaurus was actually a marine lizard, not a true dinosaur.",
    overview:
      "Mosasaurus was a massive marine reptile that dominated the oceans during the late Cretaceous period. With its powerful tail and flippers, it was perfectly adapted for life in the water.",
    habitat: "Mosasaurus lived in shallow tropical seas, hunting fish, sharks, and other marine reptiles.",
    timeline: "Lived during the late Cretaceous period, approximately 82-66 million years ago.",
    discoveryStory:
      "The first Mosasaurus skull was discovered in 1764 in a limestone quarry near Maastricht, Netherlands. The fossil became famous during the French Revolutionary Wars and helped establish the concept of extinction.",
    museumLocations: [
      "Muséum national d'Histoire naturelle, Paris",
      "Natuurhistorisch Museum Maastricht, Netherlands",
      "Canadian Fossil Discovery Centre, Manitoba",
    ],
  },
]

// Fossil discovery locations with detailed information
export const fossilLocations = [
  {
    id: "hell-creek-formation",
    name: "Hell Creek Formation",
    location: { lat: 47.0527, lng: -109.6333 },
    country: "USA",
    state: "Montana",
    dinosaurs: ["tyrannosaurus-rex", "triceratops", "ankylosaurus"],
    description:
      "One of the most famous dinosaur fossil sites in the world, preserving the last few million years of the Cretaceous period.",
    significance:
      "This formation has yielded some of the most complete T. rex specimens ever found, including 'Sue' and 'Stan'.",
    ageRange: "68-66 million years ago",
    environment: "River plains and coastal swamps with subtropical climate",
    discoveryHistory:
      "First explored in the early 1900s by Barnum Brown, this formation continues to yield important discoveries today.",
    visitingInfo: {
      museum: "Museum of the Rockies, Bozeman, Montana",
      tours: "Guided fossil hunting tours available seasonally",
      accessibility: "Remote location, 4WD vehicle recommended",
    },
  },
  {
    id: "morrison-formation",
    name: "Morrison Formation",
    location: { lat: 39.7392, lng: -104.9903 },
    country: "USA",
    state: "Colorado",
    dinosaurs: ["stegosaurus", "allosaurus", "brachiosaurus", "diplodocus"],
    description:
      "A Late Jurassic sedimentary sequence that extends throughout the western United States, famous for its diverse dinosaur fauna.",
    significance:
      "Contains one of the most diverse dinosaur assemblages known, representing a complete Late Jurassic ecosystem.",
    ageRange: "156-145 million years ago",
    environment: "Semi-arid plains with seasonal rivers and abundant plant life",
    discoveryHistory: "Site of the famous 'Bone Wars' between paleontologists Marsh and Cope in the late 1800s.",
    visitingInfo: {
      museum: "Denver Museum of Nature & Science, Colorado",
      tours: "Dinosaur National Monument offers guided tours and fossil exhibits",
      accessibility: "Multiple access points, visitor centers available",
    },
  },
  {
    id: "gobi-desert",
    name: "Gobi Desert Formations",
    location: { lat: 44.2619, lng: 103.8467 },
    country: "Mongolia",
    state: "Ömnögovi Province",
    dinosaurs: ["velociraptor"],
    description:
      "Remote desert formations that have preserved exceptional dinosaur fossils, including complete skeletons and nests.",
    significance:
      "Famous for the 'Fighting Dinosaurs' specimen showing Velociraptor and Protoceratops locked in combat.",
    ageRange: "84-70 million years ago",
    environment: "Arid desert with seasonal sandstorms that rapidly buried and preserved fossils",
    discoveryHistory: "Explored by Roy Chapman Andrews in the 1920s, leading to numerous groundbreaking discoveries.",
    visitingInfo: {
      museum: "Mongolian Natural History Museum, Ulaanbaatar",
      tours: "Specialized paleontological expeditions available",
      accessibility: "Extremely remote, requires expedition-level planning",
    },
  },
  {
    id: "bernissart-formation",
    name: "Bernissart Coal Mine",
    location: { lat: 50.4547, lng: 3.9878 },
    country: "Belgium",
    state: "Hainaut",
    dinosaurs: ["iguanodon"],
    description:
      "A coal mine that yielded one of the most spectacular dinosaur discoveries in Europe, with multiple complete skeletons.",
    significance:
      "The discovery of 38 Iguanodon skeletons revolutionized understanding of dinosaur posture and behavior.",
    ageRange: "125 million years ago",
    environment: "Subtropical river delta with lush vegetation",
    discoveryHistory:
      "Discovered by coal miners in 1878, leading to one of the first major dinosaur excavations in Europe.",
    visitingInfo: {
      museum: "Royal Belgian Institute of Natural Sciences, Brussels",
      tours: "Museum offers detailed exhibits about the Bernissart discovery",
      accessibility: "Urban location, easily accessible by public transport",
    },
  },
  {
    id: "bahariya-formation",
    name: "Bahariya Formation",
    location: { lat: 27.1127, lng: 31.3219 },
    country: "Egypt",
    state: "Western Desert",
    dinosaurs: ["spinosaurus"],
    description:
      "An oasis in the Egyptian desert that has yielded unique African dinosaur species, including the sail-backed Spinosaurus.",
    significance:
      "One of the few places where African Cretaceous dinosaurs have been found, showing unique evolutionary adaptations.",
    ageRange: "100-94 million years ago",
    environment: "Tropical river systems and mangrove swamps",
    discoveryHistory:
      "First explored by German paleontologist Ernst Stromer in the early 1900s, with renewed interest in recent decades.",
    visitingInfo: {
      museum: "Egyptian Geological Museum, Cairo",
      tours: "Desert expeditions available through specialized tour operators",
      accessibility: "Remote desert location, requires experienced guides",
    },
  },
  {
    id: "la-colonia-formation",
    name: "La Colonia Formation",
    location: { lat: -42.7692, lng: -65.0438 },
    country: "Argentina",
    state: "Chubut Province",
    dinosaurs: ["carnotaurus"],
    description:
      "Patagonian badlands that have revealed unique South American dinosaur species with exceptional preservation.",
    significance:
      "Home to some of the most complete theropod skeletons from South America, showing unique evolutionary adaptations.",
    ageRange: "72-69 million years ago",
    environment: "River plains and forested areas with seasonal flooding",
    discoveryHistory:
      "Discovered by José Bonaparte in 1985, representing one of the most complete abelisaurid skeletons ever found.",
    visitingInfo: {
      museum: "Museo Argentino de Ciencias Naturales, Buenos Aires",
      tours: "Patagonian fossil tours available through specialized operators",
      accessibility: "Remote location, requires 4WD vehicle and local guides",
    },
  },
  {
    id: "maastricht-formation",
    name: "Maastricht Formation",
    location: { lat: 50.8503, lng: 5.691 },
    country: "Netherlands",
    state: "Limburg",
    dinosaurs: ["mosasaurus"],
    description:
      "Ancient marine deposits that have preserved spectacular marine reptiles from the end of the Cretaceous period.",
    significance: "The type locality for Mosasaurus, one of the first fossil reptiles to be scientifically described.",
    ageRange: "72-66 million years ago",
    environment: "Shallow tropical seas with abundant marine life",
    discoveryHistory:
      "The famous Mosasaurus skull was discovered in 1764, becoming one of the first fossils to suggest extinction.",
    visitingInfo: {
      museum: "Natuurhistorisch Museum Maastricht, Netherlands",
      tours: "Underground limestone quarry tours available",
      accessibility: "Urban location with excellent public transport access",
    },
  },
]

// Function to calculate distance between two coordinates
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return distance
}

// Function to find fossils within a certain radius
export function findFossilsNearLocation(userLat: number, userLon: number, radiusKm = 3000) {
  const nearbyFossils = fossilLocations
    .map((location) => ({
      ...location,
      distance: calculateDistance(userLat, userLon, location.location.lat, location.location.lng),
    }))
    .filter((location) => location.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)

  return nearbyFossils
}

// Function to get alternative fossil locations if none are nearby
export function getAlternativeFossilLocations(userLat: number, userLon: number) {
  return fossilLocations
    .map((location) => ({
      ...location,
      distance: calculateDistance(userLat, userLon, location.location.lat, location.location.lng),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5) // Return top 5 closest locations
}
