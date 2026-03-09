import React from "react";
import { Card, CardContent } from "@/stargazers/components/ui/card";
import { Button } from "@/stargazers/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/stargazers/utils";

export default function StarDetail() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Card className="bg-white/5 border-white/20">
        <CardContent className="p-12 text-center">
          <Star className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl text-white mb-2">Star details unavailable</h3>
          <p className="text-white/60 mb-4">Connect a backend to view star details</p>
          <Button
            onClick={() => navigate(createPageUrl("Stars"))}
            variant="outline"
            className="mt-4 border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Star Guide
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
