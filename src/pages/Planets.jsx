import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/stargazers/components/ui/card";
import { Input } from "@/stargazers/components/ui/input";
import { Button } from "@/stargazers/components/ui/button";
import { Globe, Volume2, Search, Plus, Edit, Trash2, Sparkles, ZoomIn } from "lucide-react";
import PlanetFormDialog from "@/stargazers/components/planets/PlanetFormDialog";
import ImageModal from "@/stargazers/components/ImageModal";
import { supabase } from "@/integrations/supabase/client";

export default function Planets() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ url: "", title: "" });
  const [allPlanets, setAllPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlanets = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("planets").select("*").order("hawaiian_name");
    if (!error && data) setAllPlanets(data);
    setLoading(false);
  };

  useEffect(() => { fetchPlanets(); }, []);

  const handleSave = async (formData) => {
    if (selectedPlanet) {
      await supabase.from("planets").update(formData).eq("id", selectedPlanet.id);
    } else {
      await supabase.from("planets").insert(formData);
    }
    setShowForm(false);
    setSelectedPlanet(null);
    fetchPlanets();
  };

  const handleDelete = async (id) => {
    await supabase.from("planets").delete().eq("id", id);
    fetchPlanets();
  };

  const filteredPlanets = allPlanets.filter(p => {
    const q = searchQuery.toLowerCase();
    return p.hawaiian_name?.toLowerCase().includes(q) || p.english_name?.toLowerCase().includes(q) || p.meaning?.toLowerCase().includes(q);
  });

  const planetIconUrl = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/12ba6bacb_planetsicon.jpeg";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="text-center md:text-left">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 mx-auto md:mx-0 mb-4">
            <img src={planetIconUrl} alt="Planets" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Nā Hōkūhele - The Wandering Stars</h1>
          <p className="text-white/70 text-lg">Planets and their Hawaiian names</p>
        </div>
        <Button onClick={() => { setSelectedPlanet(null); setShowForm(true); }} className="bg-gradient-to-r from-blue-500 to-blue-600">
          <Plus className="w-4 h-4 mr-2" /> Add Planet
        </Button>
      </div>

      <div className="mb-8">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
          <Input type="text" placeholder="Search by Hawaiian name, English name, mythology..."
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm h-12 text-lg" />
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

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      ) : filteredPlanets.length === 0 ? (
        <Card className="bg-white/5 border-white/20">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 mx-auto mb-4">
              <img src={planetIconUrl} alt="Planets" className="w-full h-full object-cover opacity-30" />
            </div>
            <h3 className="text-xl text-white mb-2">{searchQuery ? "No planets found" : "No planets yet"}</h3>
            <p className="text-white/60 mb-6">{searchQuery ? "Try a different search term" : "Add your first planet to get started"}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlanets.map((planet) => (
            <Card key={planet.id} className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm hover:scale-105 transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-8 h-8 text-[#60A5FA]" />
                  <div>
                    <h3 className="text-white font-bold text-lg">{planet.hawaiian_name}</h3>
                    <p className="text-white/60">{planet.english_name}</p>
                  </div>
                </div>
                {planet.meaning && <p className="text-[#60A5FA] italic mb-2">{planet.meaning}</p>}
                {planet.description && <p className="text-white/80 text-sm line-clamp-3">{planet.description}</p>}
                <div className="flex gap-1 justify-end mt-4">
                  <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10"
                    onClick={(e) => { e.stopPropagation(); setSelectedPlanet(planet); setShowForm(true); }}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white/70 hover:text-red-400 hover:bg-white/10"
                    onClick={(e) => { e.stopPropagation(); handleDelete(planet.id); }}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <PlanetFormDialog open={showForm} onOpenChange={setShowForm} planet={selectedPlanet} onSave={handleSave} isLoading={false} />
      <ImageModal open={imageModalOpen} onOpenChange={setImageModalOpen} imageUrl={selectedImage.url} title={selectedImage.title} />
    </div>
  );
}
