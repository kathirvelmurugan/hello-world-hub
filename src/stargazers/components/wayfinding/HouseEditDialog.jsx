import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/stargazers/components/ui/dialog";
import { Button } from "@/stargazers/components/ui/button";
import { Input } from "@/stargazers/components/ui/input";
import { Textarea } from "@/stargazers/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/stargazers/components/ui/select";
import { Checkbox } from "@/stargazers/components/ui/checkbox";
import { navigationStars } from "./starCompassData";

export default function HouseEditDialog({ open, onOpenChange, house, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    quadrant: "",
    description: "",
    season: "both"
  });
  const [selectedStars, setSelectedStars] = useState([]);

  useEffect(() => {
    if (house) {
      setFormData({
        name: house.name || "",
        quadrant: house.quadrant || "",
        description: house.description || "",
        season: house.season || "both"
      });
      
      // Find which stars include this house
      const starsForHouse = navigationStars
        .filter(star => star.houses.includes(house.name))
        .map(star => star.name);
      setSelectedStars(starsForHouse);
    }
  }, [house]);

  const handleSave = () => {
    // Update the stars in navigationStars array
    navigationStars.forEach(star => {
      const isSelected = selectedStars.includes(star.name);
      const hasHouse = star.houses.includes(formData.name);
      
      if (isSelected && !hasHouse) {
        star.houses.push(formData.name);
      } else if (!isSelected && hasHouse) {
        star.houses = star.houses.filter(h => h !== formData.name);
      }
    });
    
    onSave({ ...house, ...formData });
    onOpenChange(false);
  };

  const toggleStar = (starName) => {
    setSelectedStars(prev => 
      prev.includes(starName) 
        ? prev.filter(s => s !== starName)
        : [...prev, starName]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0A1929] border-[#60A5FA]/30 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Star House</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-white/70 text-sm mb-1 block">House Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          
          <div>
            <label className="text-white/70 text-sm mb-1 block">Quadrant</label>
            <Select value={formData.quadrant} onValueChange={(value) => setFormData({ ...formData, quadrant: value })}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Koʻolau">Koʻolau (North)</SelectItem>
                <SelectItem value="Hikina">Hikina (East)</SelectItem>
                <SelectItem value="Kona">Kona (South)</SelectItem>
                <SelectItem value="Komohana">Komohana (West)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-white/70 text-sm mb-1 block">Season</label>
            <Select value={formData.season} onValueChange={(value) => setFormData({ ...formData, season: value })}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="both">All Seasons</SelectItem>
                <SelectItem value="Makaliʻi">Makaliʻi (Winter)</SelectItem>
                <SelectItem value="Kau wela">Kau wela (Summer)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-white/70 text-sm mb-1 block">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-white/10 border-white/20 text-white min-h-[100px]"
            />
          </div>

          <div>
            <label className="text-white/70 text-sm mb-2 block">Associated Stars</label>
            <div className="max-h-60 overflow-y-auto bg-white/5 rounded-lg p-3 space-y-2">
              {navigationStars.map((star) => (
                <div key={star.name} className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedStars.includes(star.name)}
                    onCheckedChange={() => toggleStar(star.name)}
                    className="border-white/20"
                  />
                  <label className="text-white/80 text-sm cursor-pointer" onClick={() => toggleStar(star.name)}>
                    {star.name} ({star.commonName})
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-b from-blue-500 to-cyan-500 text-white"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}