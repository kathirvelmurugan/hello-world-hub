import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/stargazers/components/ui/card";
import { Button } from "@/stargazers/components/ui/button";
import { Input } from "@/stargazers/components/ui/input";
import { Stars, Search, Plus, Trash2, Volume2, ZoomIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/stargazers/utils";
import ConstellationFormDialog from "@/stargazers/components/constellations/ConstellationFormDialog";
import ImageModal from "@/stargazers/components/ImageModal";
import { supabase } from "@/integrations/supabase/client";

export default function Constellations() {
  const navigate = useNavigate();
  const [selectedConstellation, setSelectedConstellation] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ url: "", title: "" });
  const [playingAudio, setPlayingAudio] = useState(null);
  const [constellations, setConstellations] = useState([]);
  const [loading, setLoading] = useState(true);

  const constellationIconUrl = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/956757e39_IMG_2167.jpeg";

  const fetchConstellations = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("constellations").select("*").order("hawaiian_name");
    if (!error && data) setConstellations(data);
    setLoading(false);
  };

  useEffect(() => { fetchConstellations(); }, []);

  const handleSave = async (formData) => {
    if (selectedConstellation) {
      await supabase.from("constellations").update(formData).eq("id", selectedConstellation.id);
    } else {
      await supabase.from("constellations").insert(formData);
    }
    setShowForm(false);
    setSelectedConstellation(null);
    fetchConstellations();
  };

  const handleDelete = async (id) => {
    await supabase.from("constellations").delete().eq("id", id);
    fetchConstellations();
  };

  const handleImageClick = (url, title) => {
    setSelectedImage({ url, title });
    setImageModalOpen(true);
  };

  const playPronunciation = (url, id) => {
    const audio = new Audio(url);
    setPlayingAudio(id);
    audio.play();
    audio.onended = () => setPlayingAudio(null);
  };

  const filteredConstellations = constellations.filter(c => {
    const query = searchQuery.toLowerCase();
    return c.hawaiian_name?.toLowerCase().includes(query) || c.english_name?.toLowerCase().includes(query) || c.meaning?.toLowerCase().includes(query);
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
        <Button onClick={() => { setSelectedConstellation(null); setShowForm(true); }} className="bg-gradient-to-r from-blue-500 to-blue-600">
          <Plus className="w-4 h-4 mr-2" /> Add Constellation
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
            Constellations served as celestial roadmaps for Hawaiian navigators, helping them
            maintain course across thousands of miles of open ocean.
          </p>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      ) : filteredConstellations.length === 0 ? (
        <Card className="bg-white/5 border-white/20">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 mx-auto mb-4 opacity-30">
              <img src={constellationIconUrl} alt="Constellation" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl text-white mb-2">{searchQuery ? "No constellations found" : "No constellations yet"}</h3>
            <p className="text-white/60 mb-6">{searchQuery ? "Try a different search term" : "Add your first constellation to get started"}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredConstellations.map((constellation) => (
            <Card key={constellation.id} className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm hover:scale-[1.02] transition-all overflow-hidden cursor-pointer"
              onClick={() => navigate(`${createPageUrl("ConstellationDetail")}?id=${constellation.id}`)}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {constellation.image_url ? (
                    <div className="flex-shrink-0 relative cursor-pointer group" onClick={(e) => { e.stopPropagation(); handleImageClick(constellation.image_url, constellation.hawaiian_name); }}>
                      <img src={constellation.image_url} alt={constellation.hawaiian_name} className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg border-2 border-white/20" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                        <ZoomIn className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                        <img src={constellationIconUrl} alt="Constellation" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-bold text-lg">{constellation.hawaiian_name}</h3>
                      {constellation.pronunciation_audio_url && (
                        <button onClick={(e) => { e.stopPropagation(); playPronunciation(constellation.pronunciation_audio_url, constellation.id); }}
                          className={`transition-all ${playingAudio === constellation.id ? 'text-white scale-90' : 'text-[#0EA5E9] hover:text-[#60A5FA]'}`}>
                          <Volume2 className="w-8 h-8" />
                        </button>
                      )}
                    </div>
                    <p className="text-white/60 text-base">{constellation.english_name}</p>
                    {constellation.meaning && <p className="text-[#60A5FA] text-base italic mt-1">{constellation.meaning}</p>}
                    {constellation.navigation_use && (
                      <div className="mt-2"><p className="text-white/50 text-xs uppercase tracking-wider mb-1">Navigation Use</p><p className="text-white/80 text-base">{constellation.navigation_use}</p></div>
                    )}
                  </div>
                  <div className="flex md:flex-col gap-2">
                    <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10"
                      onClick={(e) => { e.stopPropagation(); setSelectedConstellation(constellation); setShowForm(true); }}>
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white/70 hover:text-red-400 hover:bg-white/10"
                      onClick={(e) => { e.stopPropagation(); handleDelete(constellation.id); }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ConstellationFormDialog open={showForm} onOpenChange={setShowForm} constellation={selectedConstellation} onSave={handleSave} isLoading={false} />
      <ImageModal open={imageModalOpen} onOpenChange={setImageModalOpen} imageUrl={selectedImage.url} title={selectedImage.title} />
    </div>
  );
}
