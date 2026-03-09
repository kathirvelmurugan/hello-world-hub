import React, { useState, useEffect } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/stargazers/components/ui/dialog";
import { Input } from "@/stargazers/components/ui/input";
import { Textarea } from "@/stargazers/components/ui/textarea";
import { Button } from "@/stargazers/components/ui/button";
import { Label } from "@/stargazers/components/ui/label";
import { Save } from "lucide-react";

export default function ConstellationFormDialog({ open, onOpenChange, constellation, onSave, isLoading }) {
  const [formData, setFormData] = useState({
    hawaiian_name: "", english_name: "", meaning: "", stars_description: "",
    navigation_use: "", best_viewing_months: "", mythology: "",
    pronunciation_audio_url: "", image_url: "",
  });

  useEffect(() => {
    if (constellation) { setFormData(constellation); } else {
      setFormData({ hawaiian_name: "", english_name: "", meaning: "", stars_description: "", navigation_use: "", best_viewing_months: "", mythology: "", pronunciation_audio_url: "", image_url: "" });
    }
  }, [constellation, open]);

  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1E3A5F] border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="text-2xl">{constellation ? "Edit Constellation" : "Add New Constellation"}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white/90">Hawaiian Name *</Label>
              <Input value={formData.hawaiian_name} onChange={(e) => setFormData({ ...formData, hawaiian_name: e.target.value })} required className="bg-white/10 border-white/20 text-white" placeholder="Makaliʻi" />
            </div>
            <div>
              <Label className="text-white/90">English Name *</Label>
              <Input value={formData.english_name} onChange={(e) => setFormData({ ...formData, english_name: e.target.value })} required className="bg-white/10 border-white/20 text-white" placeholder="Pleiades" />
            </div>
          </div>
          <div>
            <Label className="text-white/90">Meaning</Label>
            <Input value={formData.meaning} onChange={(e) => setFormData({ ...formData, meaning: e.target.value })} className="bg-white/10 border-white/20 text-white" placeholder="Eyes of the Chief" />
          </div>
          <div>
            <Label className="text-white/90">Stars Description</Label>
            <Textarea value={formData.stars_description} onChange={(e) => setFormData({ ...formData, stars_description: e.target.value })} className="bg-white/10 border-white/20 text-white" placeholder="Stars in this constellation..." />
          </div>
          <div>
            <Label className="text-white/90">Navigation Use</Label>
            <Textarea value={formData.navigation_use} onChange={(e) => setFormData({ ...formData, navigation_use: e.target.value })} className="bg-white/10 border-white/20 text-white" placeholder="Wayfinding use..." />
          </div>
          <div>
            <Label className="text-white/90">Best Viewing Months</Label>
            <Input value={formData.best_viewing_months} onChange={(e) => setFormData({ ...formData, best_viewing_months: e.target.value })} className="bg-white/10 border-white/20 text-white" placeholder="November - March" />
          </div>
          <div>
            <Label className="text-white/90">Mythology</Label>
            <Textarea value={formData.mythology} onChange={(e) => setFormData({ ...formData, mythology: e.target.value })} className="bg-white/10 border-white/20 text-white min-h-24" placeholder="Hawaiian mythology..." />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading} className="border-white/20 text-white hover:bg-white/10">Cancel</Button>
            <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90">
              <Save className="w-4 h-4 mr-2" />{isLoading ? "Saving..." : "Save Constellation"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
