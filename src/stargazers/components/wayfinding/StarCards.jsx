import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/stargazers/components/ui/card";
import { navigationStars } from "./starCompassData";

export default function StarCards({ selectedSeason = "both" }) {
  // Filter stars by season
  const filteredStars = navigationStars.filter(star => 
    selectedSeason === "both" || star.season === selectedSeason || star.season === "both"
  );

  return (
    <div className="space-y-4">
      {filteredStars.map((star, index) => (
        <Card
          key={index}
          className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm"
        >
          <CardHeader>
            <CardTitle className="text-white text-lg">
              {star.name}
              <span className="text-white/60 text-base font-normal ml-2">
                ({star.commonName})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                  Houses
                </p>
                <p className="text-white/80 text-sm">
                  {star.houses.join(", ")}
                </p>
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                  Season
                </p>
                <p className="text-white/80 text-sm">
                  {star.season === "both" ? "Year-round" : star.season}
                </p>
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                  Significance
                </p>
              </div>
            </div>
            <p className="text-white/90 leading-relaxed text-sm">
              {star.significance}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}