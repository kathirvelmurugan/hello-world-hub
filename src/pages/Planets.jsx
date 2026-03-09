import React, { useState } from "react";
import { Card, CardContent } from "@/stargazers/components/ui/card";
import { Input } from "@/stargazers/components/ui/input";
import { Button } from "@/stargazers/components/ui/button";
import { Globe, Volume2, Search, Plus, Edit, Trash2, Sparkles, ZoomIn } from "lucide-react";
import PlanetFormDialog from "@/stargazers/components/planets/PlanetFormDialog";
import ImageModal from "@/stargazers/components/ImageModal";

export default function Planets() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ url: "", title: "" });

  const allPlanets = [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="text-center md:text-left">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 mx-auto md:mx-0 mb-4">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/12ba6bacb_planetsicon.jpeg"
              alt="Planets"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Nā Hōkūhele - The Wandering Stars</h1>
          <p className="text-white/70 text-lg">Planets and their Hawaiian names</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
          <Input
            type="text"
            placeholder="Search by Hawaiian name, English name, mythology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm h-12 text-lg"
          />
        </div>
      </div>

      <Card className="mb-12 bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm">
        <CardContent className="p-8">
          <p className="text-white/90 text-xl leading-relaxed">
            Ancient Hawaiians called planets "hōkūhele" meaning "wandering stars" because they moved
            against the fixed backdrop of stars.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 mx-auto mb-4">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/12ba6bacb_planetsicon.jpeg"
              alt="Planets"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <h3 className="text-xl text-white mb-2">
            {searchQuery ? "No planets found" : "No planets yet"}
          </h3>
          <p className="text-white/60 mb-6">
            {searchQuery ? "Try a different search term" : "Connect a backend to start building your planet guide"}
          </p>
        </CardContent>
      </Card>

      <PlanetFormDialog
        open={showForm}
        onOpenChange={setShowForm}
        planet={selectedPlanet}
        onSave={() => setShowForm(false)}
        isLoading={false}
      />

      <ImageModal
        open={imageModalOpen}
        onOpenChange={setImageModalOpen}
        imageUrl={selectedImage.url}
        title={selectedImage.title}
      />
    </div>
  );
}
