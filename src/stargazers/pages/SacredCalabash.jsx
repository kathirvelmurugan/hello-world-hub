import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/stargazers/components/ui/card";
import { Button } from "@/stargazers/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/stargazers/utils";

export default function SacredCalabash() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <h1 className="text-4xl font-bold text-white mb-2">
          Ka Ipu Makani o Laʻamaomao
        </h1>
        <p className="text-white/70 text-lg">
          The Sacred Calabash of Wind Navigation
        </p>
      </div>

      {/* Hero Image */}
      <div className="mb-8 rounded-2xl overflow-hidden border-4 border-[#60A5FA] shadow-2xl">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/f85c02268_8674D5F4-9991-49F9-853B-2EBA1A589233.png"
          alt="Navigator using sacred calabash"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Explanation */}
      <Card className="mb-8 bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm">
        <CardContent className="p-6 space-y-4">
          <p className="text-white/90 leading-relaxed">
            <span className="font-semibold text-[#60A5FA]">Ka Ipu Makani o Laʻamaomao</span> translates to "The Wind Gourd of Laʻamaomao," referring to a legendary calabash containing all the winds, belonging to Laʻamaomao, the goddess of winds, and central to the moʻolelo (legend) of Pākaʻa, a chief's attendant who used its power for navigation and to protect his family's honor. The ipu held the bones of Laʻamaomao's mother and was used by Pākaʻa to command winds for sailing, a crucial skill for navigators.
          </p>
          <p className="text-white/90 leading-relaxed">
            It symbolizes ancestral knowledge, resources, and the ability to manage one's responsibilities (kuleana). The gourd and its chants allowed Pākaʻa to conjure storms to defeat enemies, showcasing ancestral power and wisdom.
          </p>
          
          <div className="pt-4 border-t border-white/20">
            <h3 className="text-white font-semibold text-lg mb-3">Navigational Use</h3>
            <p className="text-white/90 leading-relaxed mb-3">
              In Hawaiian and Polynesian navigation it refers to a navigational tool, possibly a large gourd used with water to find latitude by sighting the North Star Hōkūpaʻa (Polaris) as it touched a hole in the calabash rim, helping navigators steer west to Hawaii. This calabash, filled with water, acted as a stable, level surface to measure Hōkūpaʻa (Polaris's) altitude (around 19 degrees for Hawaii's latitude) to guide long voyages back home.
            </p>
            
            <h4 className="text-white/80 font-semibold mb-2">How it was believed to have worked:</h4>
            <ul className="list-disc list-inside space-y-2 text-white/80 ml-4">
              <li>A large Ipu (gourd) was filled with water, the surface of which remained level.</li>
              <li>Holes were made in the rim of the Ipu (gourd).</li>
              <li>When Hōkūpaʻa (Polaris) was sighted through a hole, its altitude (angle above the horizon) corresponded to the navigator's latitude, helping maintain the correct north-south position. This established latitude allowed navigators to steer west with confidence, knowing they would eventually reach the Hawaiian Islands.</li>
            </ul>
          </div>

          <p className="text-white/70 text-sm italic pt-4 border-t border-white/20">
            Stories emerged from native historians, like David Malo Kupihea, about this gourd compass used for voyages to and from Tahiti (Kahiki). The concept is linked to the broader tradition of Hawaiian/Polynesian wayfinding, which relies heavily on observing stars, waves, and natural signs, with the star compass being a key memorized guide for directions.
          </p>
        </CardContent>
      </Card>

      {/* Introduction */}
      <Card className="mb-8 bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm">
        <CardContent className="p-8">
          <p className="text-white/90 text-lg leading-relaxed mb-4">
            The sacred calabash, or ipu, was an essential tool used by Hawaiian navigators to observe 
            and understand the natural world around them. Through its curved opening, wayfinders could 
            focus their vision on specific cloud formations, star positions, and horizon features, 
            blocking out peripheral distractions.
          </p>
          <p className="text-white/70 leading-relaxed">
            Laʻamaomao is the Hawaiian goddess of the winds, and this sacred instrument bears her name 
            as it helped navigators read the subtle messages carried on the wind—cloud movements, 
            temperature changes, and the scents that revealed distant land.
          </p>
        </CardContent>
      </Card>

      {/* Usage Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-xl">
              Observing Cloud Formations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 leading-relaxed">
              Navigators used the calabash to isolate and study specific cloud patterns. Clouds 
              forming over distant islands could be detected on the horizon, their unique shapes 
              and colors revealing the presence of land long before it became visible. Different 
              cloud types—lenticular clouds, stationary clouds, or fast-moving formations—each 
              told a different story about weather systems and nearby landmasses.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-xl">
              Reading the Winds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 leading-relaxed">
              The calabash helped concentrate the navigator's senses on wind patterns. By 
              observing how clouds moved through the framed view, wayfinders could determine 
              wind direction and strength. They learned to recognize the trade winds (Moaʻe), 
              the Kona winds from the south, and seasonal wind patterns that guided their 
              voyages across the Pacific.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-xl">
              Celestial Observations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 leading-relaxed">
              At night, the calabash served as a focusing tool for star observations. By 
              framing specific portions of the sky, navigators could more accurately track 
              star positions and their movement across the horizon. This helped in identifying 
              the correct house of the star compass and maintaining course throughout the night.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-xl">
              Meditation and Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 leading-relaxed">
              Beyond its practical uses, the calabash was a sacred tool for spiritual focus. 
              The act of looking through it helped navigators enter a state of deep concentration, 
              connecting with ancestral knowledge and the spiritual aspects of wayfinding. It 
              represented the focused intention required to safely guide a crew across thousands 
              of miles of open ocean.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cultural Significance */}
      <Card className="bg-gradient-to-br from-[#1E3A5F] to-[#0A1929] border-[#60A5FA]/30">
        <CardHeader>
          <CardTitle className="text-white text-2xl">
            The Spirit of Laʻamaomao
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/90 leading-relaxed">
            Laʻamaomao, the goddess of winds, was said to keep the winds in a great calabash. 
            When she opened it, the winds would rush out to fill the sails of voyaging canoes 
            or to bring rain to the islands. Navigators honored her before each voyage, asking 
            for favorable winds and safe passage.
          </p>
          <p className="text-white/80 leading-relaxed">
            The navigator's calabash was not just a tool but a sacred connection to this deity. 
            Through it, wayfinders could perceive the subtle language of the winds—the whispers 
            of Laʻamaomao guiding them home.
          </p>
          <div className="pt-4 border-t border-white/20">
            <p className="text-[#60A5FA] italic">
              "E kuʻu makani, e Laʻamaomao, e hoʻoikaika mai i ka huakaʻi." <br/>
              "Oh my wind, Laʻamaomao, give strength to the voyage."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
