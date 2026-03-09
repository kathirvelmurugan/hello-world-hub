import React from "react";
import { Card, CardContent } from "@/stargazers/components/ui/card";
import { Button } from "@/stargazers/components/ui/button";
import { ArrowLeft, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/stargazers/utils";
import ImageModal from "@/stargazers/components/ImageModal";

export default function PlanetDetail() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-12 text-center">
          <Globe className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl text-white mb-2">Planet details unavailable</h3>
          <p className="text-white/60 mb-4">Connect a backend to view planet details</p>
          <Button
            onClick={() => navigate(createPageUrl("Planets"))}
            variant="outline"
            className="mt-4 border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Planets
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
