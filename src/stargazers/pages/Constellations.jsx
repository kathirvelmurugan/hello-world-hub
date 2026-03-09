import React, { useState } from "react";
import { Card, CardContent } from "@/stargazers/components/ui/card";
import { Button } from "@/stargazers/components/ui/button";
import { Input } from "@/stargazers/components/ui/input";
import { Stars, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConstellationFormDialog from "../components/constellations/ConstellationFormDialog";
import ImageModal from "../components/ImageModal";

export default function Constellations() {
  const navigate = useNavigate();
  const [selectedConstellation, setSelectedConstellation] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ url: "", title: "" });

  const constellations = [];
  const constellationIconUrl = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/956757e39_IMG_2167.jpeg";

  const filteredConstellations = constellations.filter(constellation => {
    const query = searchQuery.toLowerCase();
    return (
      constellation.hawaiian_name?.toLowerCase().includes(query) ||
      constellation.english_name?.toLowerCase().includes(query) ||
      constellation.meaning?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="text-center md:text-left">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 mx-auto md:mx-0 mb-4">
            <img src={constellationIconUrl} alt="Constellation" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Constellation Guide</h1>
          <p className="text-white/70 text-lg">Hawaiian star patterns and their navigation significance</p>
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
            Constellations served as celestial roadmaps for Hawaiian navigators, helping them 
            maintain course across thousands of miles of open ocean.
          </p>
        </CardContent>
      </Card>

      {filteredConstellations.length === 0 && (
        <Card className="bg-white/5 border-white/20">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 mx-auto mb-4 opacity-30">
              <img src={constellationIconUrl} alt="Constellation" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl text-white mb-2">
              {searchQuery ? "No constellations found" : "No constellations yet"}
            </h3>
            <p className="text-white/60 mb-6">
              {searchQuery ? "Try a different search term" : "Connect a backend to start building your constellation guide"}
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="mt-12 bg-gradient-to-br from-[#3B82F6]/20 to-[#60A5FA]/20 border-[#60A5FA]/30">
        <CardContent className="p-6">
          <p className="text-white/90 italic leading-relaxed">
            "The stars served as a celestial map, with constellations marking key directions 
            and latitudes."
          </p>
        </CardContent>
      </Card>

      <ConstellationFormDialog
        open={showForm}
        onOpenChange={setShowForm}
        constellation={selectedConstellation}
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
