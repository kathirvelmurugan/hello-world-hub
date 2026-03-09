import React from "react";
import { Card, CardContent } from "@/stargazers/components/ui/card";
import { Button } from "@/stargazers/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/stargazers/utils";

export default function ConstellationDetail() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Button
        onClick={() => navigate(createPageUrl("Constellations"))}
        className="mb-6 bg-white/10 hover:bg-white/20 text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Constellations
      </Button>

      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-12 text-center">
          <h3 className="text-xl text-white mb-2">Constellation details unavailable</h3>
          <p className="text-white/60">Connect a backend to view constellation details</p>
        </CardContent>
      </Card>
    </div>
  );
}
