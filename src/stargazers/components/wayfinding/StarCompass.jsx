import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/stargazers/components/ui/card";
import { Button } from "@/stargazers/components/ui/button";
import { Pencil } from "lucide-react";
import { starHouses, navigationStars } from "./starCompassData";
import HouseEditDialog from "./HouseEditDialog";

export default function StarCompass({ selectedSeason = "both" }) {
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [selectedQuadrant, setSelectedQuadrant] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingHouse, setEditingHouse] = useState(null);

  const compassImageUrl = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/a88c63ad6_starcompasswithtattoo.jpg";

  const quadrants = [
    { id: "Koʻolau", label: "Koʻolau", description: "North - Windward direction" },
    { id: "Hikina", label: "Hikina", description: "East - Rising sun" },
    { id: "Kona", label: "Kona", description: "South - Leeward direction" },
    { id: "Komohana", label: "Komohana", description: "West - Setting sun" }
  ];

  // Filter houses by season
  const filteredHouses = starHouses.filter(house => 
    selectedSeason === "both" || house.season === selectedSeason || house.season === "both"
  );

  // Get houses for selected quadrant, sorted by angle
  const quadrantHouses = selectedQuadrant 
    ? filteredHouses
        .filter(house => house.quadrant === selectedQuadrant)
        .sort((a, b) => a.angle - b.angle)
    : [];

  const handleHouseClick = (house) => {
    setSelectedHouse(house);
    setSelectedQuadrant(null);
  };

  const handleQuadrantClick = (quadrantId) => {
    setSelectedQuadrant(quadrantId);
    setSelectedHouse(null);
  };

  const handleEditHouse = (house) => {
    setEditingHouse(house);
    setEditDialogOpen(true);
  };

  const handleSaveHouse = (updatedHouse) => {
    // Find and update the house in starHouses array
    const houseIndex = starHouses.findIndex(h => h.id === updatedHouse.id);
    if (houseIndex !== -1) {
      starHouses[houseIndex] = updatedHouse;
      setSelectedHouse(updatedHouse);
    }
  };

  // Calculate position for clickable regions (32 divisions in compass)
  const createWedgeRegion = (house) => {
    const centerX = 50;
    const centerY = 50;
    const innerRadius = 15;
    const outerRadius = 45;
    // Convert house angle (0=N, 90=E, 180=S, 270=W clockwise from North)
    // to SVG angle (0=E, 90=S, 180=W, 270=N counter-clockwise from East with Y-axis down)
    const adjustedAngle = (house.angle - 90 + 360) % 360;
    // For 32 divisions: 360/32 = 11.25°, so half-width = 5.625°
    const startAngle = (adjustedAngle - 5.625) * (Math.PI / 180);
    const endAngle = (adjustedAngle + 5.625) * (Math.PI / 180);

    const x1 = centerX + innerRadius * Math.cos(startAngle);
    const y1 = centerY + innerRadius * Math.sin(startAngle);
    const x2 = centerX + outerRadius * Math.cos(startAngle);
    const y2 = centerY + outerRadius * Math.sin(startAngle);
    const x3 = centerX + outerRadius * Math.cos(endAngle);
    const y3 = centerY + outerRadius * Math.sin(endAngle);
    const x4 = centerX + innerRadius * Math.cos(endAngle);
    const y4 = centerY + innerRadius * Math.sin(endAngle);

    return `${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`;
  };

  return (
    <div>
      {/* Star Compass Image with Clickable Regions */}
      <div className="mb-8">
        <div className="relative max-w-3xl mx-auto">
          <img 
            src={compassImageUrl}
            alt="Hawaiian Star Compass"
            className="w-full h-auto"
          />
          
          {/* SVG Overlay for Clickable Regions */}
          <svg 
            viewBox="0 0 100 100" 
            className="absolute top-0 left-0 w-full h-full"
            style={{ pointerEvents: 'none' }}
          >
            {filteredHouses.map((house) => (
              <polygon
                key={house.id}
                points={createWedgeRegion(house)}
                fill="transparent"
                stroke="transparent"
                strokeWidth="0.5"
                style={{ 
                  pointerEvents: 'auto',
                  cursor: 'pointer'
                }}
                onClick={() => handleHouseClick(house)}
                onMouseEnter={(e) => e.target.style.fill = 'rgba(96, 165, 250, 0.2)'}
                onMouseLeave={(e) => e.target.style.fill = 'transparent'}
              />
            ))}
          </svg>
        </div>

        {/* Selected House Description */}
        {selectedHouse && (
          <Card className="mt-6 bg-gradient-to-br from-[#1E3A5F] to-[#0A1929] border-[#60A5FA]/30">
            <CardHeader>
              <CardTitle className="text-white text-xl flex justify-between items-center">
                <span>{selectedHouse.name}</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditHouse(selectedHouse)}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedHouse(null)}
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    Close
                  </Button>
                </div>
              </CardTitle>
              <p className="text-[#60A5FA] text-sm">{selectedHouse.quadrant} • {selectedHouse.season === "both" ? "All Seasons" : selectedHouse.season}</p>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 leading-relaxed mb-4">
                {selectedHouse.description}
              </p>
              {(() => {
                const houseStars = navigationStars.filter(star => 
                  star.houses.includes(selectedHouse.name)
                );
                return houseStars.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <h4 className="text-white/70 text-sm font-semibold mb-2">Stars in this house:</h4>
                    <div className="space-y-2">
                      {houseStars.map((star, index) => (
                        <div key={index} className="text-white/80 text-sm">
                          <span className="font-medium text-[#60A5FA]">{star.name}</span>
                          {" "}({star.commonName})
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Cardinal Direction Controls */}
      <div className="mb-8">
        <h3 className="text-white text-lg font-semibold mb-4">Explore by Direction</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quadrants.map((quadrant) => (
            <Button
              key={quadrant.id}
              onClick={() => handleQuadrantClick(quadrant.id)}
              className={`h-auto py-4 px-4 flex flex-col items-center gap-2 ${
                selectedQuadrant === quadrant.id
                  ? "bg-gradient-to-b from-blue-500 to-cyan-500 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <span className="font-semibold text-base">{quadrant.label}</span>
              <span className="text-xs opacity-80">{quadrant.description}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Quadrant Houses List */}
      {selectedQuadrant && quadrantHouses.length > 0 && (
        <Card className="mb-8 bg-gradient-to-br from-white/10 to-white/5 border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex justify-between items-center">
              <span>Houses of {selectedQuadrant}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedQuadrant(null)}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                Close
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quadrantHouses.map((house) => (
                <button
                  key={house.id}
                  onClick={() => handleHouseClick(house)}
                  className="text-left p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <h4 className="text-white font-medium mb-1">{house.name}</h4>
                  <p className="text-white/60 text-sm line-clamp-2">
                    {house.description}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <HouseEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        house={editingHouse}
        onSave={handleSaveHouse}
      />
    </div>
  );
}