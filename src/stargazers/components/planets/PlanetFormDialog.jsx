import React, { useState, useEffect } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/stargazers/components/ui/dialog";
import { Input } from "@/stargazers/components/ui/input";
import { Textarea } from "@/stargazers/components/ui/textarea";
import { Button } from "@/stargazers/components/ui/button";
import { Label } from "@/stargazers/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/stargazers/components/ui/select";
import { Save } from "lucide-react";

export default function PlanetFormDialog({ open, onOpenChange, planet, onSave, isLoading }) {
  const [formData, setFormData] = useState({
    hawaiian_name: "", english_name: "", type: "planet", meaning: "",
    description: "", mythology: "", pronunciation_audio_url: "", image_url: "",
  });

  useEffect(() => {
    if (planet && open) { setFormData(planet); } else if (!open) {
      setFormData({ hawaiian_name: "", english_name: "", type: "planet", meaning: "", description: "", mythology: "", pronunciation_audio_url: "", image_url: "" });
    }
  }, [planet, open]);

  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1E3A5F] border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="text-2xl">{planet ? "Edit Planet" : "Add New Planet"}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white/90">Hawaiian Name *</Label>
              <Input value={formData.hawaiian_name} onChange={(e) => setFormData(prev => ({ ...prev, hawaiian_name: e.target.value }))} required className="bg-white/10 border-white/20 text-white" placeholder="Hōkūloa" />
            </div>
            <div>
              <Label className="text-white/90">English Name *</Label>
              <Input value={formData.english_name} onChange={(e) => setFormData(prev => ({ ...prev, english_name: e.target.value }))} required className="bg-white/10 border-white/20 text-white" placeholder="Venus" />
            </div>
          </div>
          <div>
            <Label className="text-white/90">Type *</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="planet">Planet</SelectItem><SelectItem value="dwarf_planet">Dwarf Planet</SelectItem></SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-white/90">Meaning</Label>
            <Input value={formData.meaning} onChange={(e) => setFormData(prev => ({ ...prev, meaning: e.target.value }))} className="bg-white/10 border-white/20 text-white" placeholder="The bright one" />
          </div>
          <div>
            <Label className="text-white/90">Description</Label>
            <Textarea value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} className="bg-white/10 border-white/20 text-white min-h-24" placeholder="Information about this planet..." />
          </div>
          <div>
            <Label className="text-white/90">Mythology</Label>
            <Textarea value={formData.mythology} onChange={(e) => setFormData(prev => ({ ...prev, mythology: e.target.value }))} className="bg-white/10 border-white/20 text-white min-h-32" placeholder="Cultural significance..." />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading} className="border-white/20 text-white hover:bg-white/10">Cancel</Button>
            <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90">
              <Save className="w-4 h-4 mr-2" />{isLoading ? "Saving..." : "Save Planet"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
