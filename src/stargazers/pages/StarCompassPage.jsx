import React, { useState } from "react";
import { Card, CardContent } from "@/stargazers/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/stargazers/components/ui/select";
import { Button } from "@/stargazers/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/stargazers/utils";
import StarCompass from "../components/wayfinding/StarCompass";
import StarCards from "../components/wayfinding/StarCards";
import { seasons } from "../components/wayfinding/starCompassData";

export default function StarCompassPage() {
  const [selectedSeason, setSelectedSeason] = useState("both");
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Button
        onClick={() => navigate(createPageUrl("Wayfinding"))}
        variant="ghost"
        className="mb-6 text-white hover:bg-white/10"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Wayfinding
      </Button>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-[#60A5FA] shadow-xl">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/ef2ab54ff_88290786-1D97-4C44-BD28-745977014920.png"
            alt="Star Compass"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">
          Kūkuluokalani - The Star Compass
        </h1>
        <p className="text-white/70 text-lg">
          32 houses marking the rising and setting of stars on the horizon
        </p>
      </div>

      {/* Introduction */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm mb-8">
        <CardContent className="p-6">
          <p className="text-white/90 leading-relaxed">
            The Hawaiian star compass divides the horizon into 32 equal sections called "houses." 
            Each house marks where specific stars rise and set throughout the year. By memorizing 
            these star paths, navigators could maintain direction across thousands of miles of open ocean. 
            These stars are used to teach direction and house positions, not seasonal night navigation. 
            They may rise or set in twilight or dawn. Click on any section of the compass to learn about 
            that house, or select a cardinal direction below to explore all houses in that quadrant.
          </p>
        </CardContent>
      </Card>

      {/* Season Selector */}
      <div className="flex justify-end mb-6">
        <div className="w-full md:w-64">
          <Select value={selectedSeason} onValueChange={setSelectedSeason}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Select season" />
            </SelectTrigger>
            <SelectContent>
              {seasons.map((season) => (
                <SelectItem key={season.id} value={season.id}>
                  {season.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-white/50 text-xs mt-2">
            {seasons.find(s => s.id === selectedSeason)?.description}
          </p>
        </div>
      </div>

      {/* Star Compass */}
      <p className="text-white/60 text-sm text-center mb-4">
        Touch each house to learn more
      </p>
      <StarCompass selectedSeason={selectedSeason} />

      {/* Navigation Stars */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          Key Navigation Stars
        </h2>
        <p className="text-white/70 mb-6">
          {selectedSeason === "both" 
            ? "Major stars and their navigational significance throughout the year"
            : `Stars active during ${seasons.find(s => s.id === selectedSeason)?.name}`
          }
        </p>
        <StarCards selectedSeason={selectedSeason} />
      </div>
    </div>
  );
}