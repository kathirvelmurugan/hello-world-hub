import React, { useState, useEffect } from "react";
import { Sunrise, Sunset, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/stargazers/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/stargazers/utils";
import MoonPhaseIcon from "../components/MoonPhaseIcon";

// Accurate moon phase calculation using cosine formula
const calculateMoonPhase = (date = new Date()) => {
  const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14));
  const lunarCycle = 29.53058867;
  
  const daysSinceNewMoon = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const currentCycle = daysSinceNewMoon % lunarCycle;
  const normalizedCycle = currentCycle < 0 ? currentCycle + lunarCycle : currentCycle;

  const angle = (normalizedCycle / lunarCycle) * 2 * Math.PI;
  const illumination = Math.round((1 - Math.cos(angle)) / 2 * 100);
  
  let phaseName;
  let phaseType;
  
  if (normalizedCycle < 1.84566 || normalizedCycle >= 27.68492) {
    phaseName = "New Moon"; phaseType = "new";
  } else if (normalizedCycle < 7.38264) {
    phaseName = "Waxing Crescent"; phaseType = "waxing-crescent";
  } else if (normalizedCycle < 9.22830) {
    phaseName = "First Quarter"; phaseType = "first-quarter";
  } else if (normalizedCycle < 13.76528) {
    phaseName = "Waxing Gibbous"; phaseType = "waxing-gibbous";
  } else if (normalizedCycle < 15.76528) {
    phaseName = "Full Moon"; phaseType = "full";
  } else if (normalizedCycle < 22.14792) {
    phaseName = "Waning Gibbous"; phaseType = "waning-gibbous";
  } else if (normalizedCycle < 23.99358) {
    phaseName = "Last Quarter"; phaseType = "last-quarter";
  } else {
    phaseName = "Waning Crescent"; phaseType = "waning-crescent";
  }
  
  return { name: phaseName, percentage: illumination, type: phaseType };
};

export default function Home() {
  const [moonPhase, setMoonPhase] = useState(null);

  useEffect(() => {
    const phase = calculateMoonPhase();
    setMoonPhase(phase);
  }, []);

  if (!moonPhase) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-white/10 rounded-3xl" />
          <div className="h-64 bg-white/10 rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Tonight's Sky
        </h1>
        <p className="text-xl text-white/70">
          {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'Pacific/Honolulu'
          })}
        </p>
      </div>

      {/* Moon Phase Card */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="w-16 h-16 flex items-center justify-center">
              <MoonPhaseIcon phase={moonPhase.type} />
            </div>
            <div>
              <div className="text-2xl">{moonPhase.name}</div>
              <div className="text-sm text-white/60 font-normal">
                Mahina - {moonPhase.percentage}% illuminated
              </div>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Sunset & Sunrise Card */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white text-lg">
            <Sunset className="w-5 h-5 text-[#60A5FA]" />
            Sunset & Sunrise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Sunset</span>
              <span className="text-white font-semibold text-lg">6:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Sunrise</span>
              <span className="text-white font-semibold text-lg">6:30 AM</span>
            </div>
            <div className="pt-3 border-t border-white/10">
              <span className="text-white/70 text-sm">Best Viewing</span>
              <p className="text-white mt-1">9 PM - 4 AM</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to={createPageUrl("Stars")}>
          <Card className="bg-white/5 border-white/20 hover:bg-white/10 transition-all cursor-pointer h-full">
            <CardContent className="p-6 text-center">
              <div className="w-10 h-10 rounded-full mx-auto mb-3 overflow-hidden border-2 border-white/20">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/5e18e74fc_IMG_2150.jpeg"
                  alt="Star"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-white font-semibold mb-2">Star Guide</h3>
              <p className="text-white/60 text-sm">
                Learn Hawaiian star names
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to={createPageUrl("Moon")}>
          <Card className="bg-white/5 border-white/20 hover:bg-white/10 transition-all cursor-pointer h-full">
            <CardContent className="p-6 text-center">
              <div className="w-10 h-10 mx-auto mb-3">
                <MoonPhaseIcon phase={moonPhase?.type || "full"} />
              </div>
              <h3 className="text-white font-semibold mb-2">Moon Calendar</h3>
              <p className="text-white/60 text-sm">
                Hawaiian lunar months
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to={createPageUrl("Wayfinding")}>
          <Card className="bg-white/5 border-white/20 hover:bg-white/10 transition-all cursor-pointer h-full">
            <CardContent className="p-6 text-center">
              <div className="w-10 h-10 rounded-full mx-auto mb-3 overflow-hidden border-2 border-[#60A5FA]">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/174409567_starcompass.jpeg"
                  alt="Star Compass"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-white font-semibold mb-2">Wayfinding</h3>
              <p className="text-white/60 text-sm">
                Navigation traditions
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
