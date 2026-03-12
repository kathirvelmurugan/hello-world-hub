import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/stargazers/components/ui/card";
import { Button } from "@/stargazers/components/ui/button";
import { Input } from "@/stargazers/components/ui/input";
import { Star, Sparkles, Plus, Search } from "lucide-react";
import StarCard from "@/stargazers/components/stars/StarCard";
import StarFormDialog from "@/stargazers/components/stars/StarFormDialog";
import { supabase } from "@/integrations/supabase/client";

export default function Stars() {
  const [selectedStar, setSelectedStar] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStars = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("stars").select("*").order("hawaiian_name");
    if (!error && data) setStars(data);
    setLoading(false);
  };

  useEffect(() => { fetchStars(); }, []);

  const handleSave = async (formData) => {
    if (selectedStar) {
      await supabase.from("stars").update(formData).eq("id", selectedStar.id);
    } else {
      await supabase.from("stars").insert(formData);
    }
    setShowForm(false);
    setSelectedStar(null);
    fetchStars();
  };

  const handleDelete = async (id) => {
    await supabase.from("stars").delete().eq("id", id);
    fetchStars();
  };

  const filteredStars = stars.filter(star => {
    const query = searchQuery.toLowerCase();
    return (
      star.hawaiian_name?.toLowerCase().includes(query) ||
      star.english_name?.toLowerCase().includes(query) ||
      star.constellation?.toLowerCase().includes(query) ||
      star.meaning?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Nā Hōkū - Star Guide</h1>
          <p className="text-white/70">Hawaiian names and meanings of celestial bodies</p>
        </div>
        <Button onClick={() => { setSelectedStar(null); setShowForm(true); }} className="bg-gradient-to-r from-blue-500 to-blue-600">
          <Plus className="w-4 h-4 mr-2" /> Add Star
        </Button>
      </div>

      <div className="mb-8">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
          <Input
            type="text" placeholder="Search by Hawaiian name, English name, constellation..."
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm h-12 text-lg"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      ) : filteredStars.length === 0 ? (
        <Card className="bg-white/5 border-white/20">
          <CardContent className="p-12 text-center">
            <Sparkles className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">{searchQuery ? "No stars found" : "No stars yet"}</h3>
            <p className="text-white/60 mb-6">{searchQuery ? "Try a different search term" : "Add your first star to get started"}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStars.map((star) => (
            <StarCard
              key={star.id} star={star}
              onEdit={() => { setSelectedStar(star); setShowForm(true); }}
              onDelete={() => handleDelete(star.id)}
              id={`star-${star.id}`}
            />
          ))}
        </div>
      )}

      <StarFormDialog open={showForm} onOpenChange={setShowForm} star={selectedStar} onSave={handleSave} isLoading={false} />
    </div>
  );
}
