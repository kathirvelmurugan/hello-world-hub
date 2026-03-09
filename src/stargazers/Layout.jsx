import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/stargazers/utils";
import { Sparkles, Moon, Compass, Globe, Map, Stars, Type, Search, X } from "lucide-react";
import { Button } from "@/stargazers/components/ui/button";
import { Input } from "@/stargazers/components/ui/input";
import ImageModal from "./components/ImageModal";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState('normal');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ url: "", title: "" });

  // No data fetching - removed base44

  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize') || 'normal';
    setFontSize(savedFontSize);
    document.documentElement.setAttribute('data-font-size', savedFontSize);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const searchContainer = document.querySelector('.search-container');
      if (searchOpen && searchContainer && !searchContainer.contains(e.target)) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  // Close search on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };

    if (searchOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => document.removeEventListener('keydown', handleEsc);
  }, [searchOpen]);

  const handleFontSizeChange = () => {
    const sizes = ['normal', 'large', 'xlarge'];
    const currentIndex = sizes.indexOf(fontSize);
    const nextSize = sizes[(currentIndex + 1) % sizes.length];
    setFontSize(nextSize);
    localStorage.setItem('fontSize', nextSize);
    document.documentElement.setAttribute('data-font-size', nextSize);
  };

  const handleImageClick = (imageUrl, title) => {
    setSelectedImage({ url: imageUrl, title: title });
    setImageModalOpen(true);
  };

  const navigationItems = [
    { name: "Tonight", path: createPageUrl("Home"), icon: Sparkles },
    { name: "Sky Map", path: createPageUrl("SkyMap"), icon: Map },
    { name: "Stars", path: createPageUrl("Stars"), icon: Stars },
    { name: "Planets", path: createPageUrl("Planets"), icon: Globe },
    { name: "Constellations", path: createPageUrl("Constellations"), icon: Stars },
    { name: "Moon Calendar", path: createPageUrl("Moon"), icon: Moon },
    { name: "Star Compass", path: createPageUrl("StarCompassPage"), icon: Compass },
    { name: "Wayfinding", path: createPageUrl("Wayfinding"), icon: Compass },
  ];

  const getBackgroundImage = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("starcompasspage")) {
      return "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/1625a1921_IMG_3211.jpg";
    }
    if (path.includes("stars") || path.includes("stardetail")) {
      return "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/1cc3d171f_starguide.jpg";
    }
    if (path.includes("planets")) {
      return "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/a36debc57_planet-4534835_1920.jpg";
    }
    if (path.includes("constellations")) {
      return "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/a96cb709d_constellations.jpg";
    }
    if (path.includes("moon")) {
      return "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/3c702c4ef_river-7294102_1920.jpg";
    }
    if (path.includes("sacredcalabash")) {
      return "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/865aee85c_9BEEAAA2-1E2B-459F-8ACF-7D4D450D3BBE.png";
    }
    if (path.includes("wayfinding")) {
      return "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/2bc3b79ca_wayfaring.jpg";
    }
    return "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/432ccb59c_couplestargazing.png";
  };

  const backgroundImage = getBackgroundImage();

  return (
    <div className="min-h-screen relative">
      {/* Background with inline style */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.25), rgba(0,0,0,0.35))',
          zIndex: 1
        }}
      />

      {/* Content */}
      <div className="relative min-h-screen" style={{ zIndex: 2 }}>
        <style>{`
          :root {
            --ocean-deep: #0A1929;
            --ocean-mid: #1E3A5F;
            --sky-bright: #60A5FA;
            --sky-light: #3B82F6;
            --cyan: #06B6D4;
            --sand: #F8F9FA;
          }

          @keyframes twinkle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }

          .star-twinkle {
            animation: twinkle 3s ease-in-out infinite;
          }

          html[data-font-size="normal"] {
            font-size: 16px;
          }
          html[data-font-size="large"] {
            font-size: 18px;
          }
          html[data-font-size="xlarge"] {
            font-size: 20px;
          }
        `}</style>

        {/* Navigation */}
        <nav className="border-b border-white/10 backdrop-blur-md bg-black/30 sticky top-0" style={{ zIndex: 50 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div
                  onClick={() => handleImageClick(
                    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/85e138c1e_KILOHOKU.jpeg",
                    "Stargazers Anonymous - Kilo Hōkū"
                  )}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690537046186188fdedaa7d0/85e138c1e_KILOHOKU.jpeg"
                    alt="Stargazers Anonymous"
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#60A5FA]"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white whitespace-nowrap">Stargazers Anonymous</h1>
                  <p className="text-xs text-white/80">Kilo Hōkū • Hawaiian Astronomy</p>
                </div>
              </div>
              <Button
                onClick={handleFontSizeChange}
                className="border-2 border-[#60A5FA] bg-transparent text-white hover:bg-[#60A5FA]/10 px-2 py-1 h-auto"
                title="Change text size"
              >
                <span className="font-semibold text-[10px]">Type Size</span>
              </Button>
            </div>

            <div className="flex gap-1 pb-3 overflow-x-auto no-scrollbar">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || 
                  (item.path !== "/" && location.pathname.startsWith(item.path));
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-[#60A5FA] text-white shadow-lg shadow-[#60A5FA]/20"
                        : "bg-white/10 text-white/70 hover:bg-white/20 backdrop-blur-sm"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pb-8">
          {children}
        </main>
      </div>

      {/* Image Modal */}
      <ImageModal
        open={imageModalOpen}
        onOpenChange={setImageModalOpen}
        imageUrl={selectedImage.url}
        title={selectedImage.title}
      />
    </div>
  );
}
