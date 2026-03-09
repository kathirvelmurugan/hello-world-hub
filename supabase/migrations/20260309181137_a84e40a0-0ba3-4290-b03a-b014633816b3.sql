-- Create stars table
CREATE TABLE public.stars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hawaiian_name TEXT NOT NULL,
  english_name TEXT,
  meaning TEXT,
  constellation TEXT,
  brightness NUMERIC,
  distance_light_years NUMERIC,
  navigation_use TEXT,
  best_viewing_months TEXT,
  pronunciation_audio_url TEXT,
  image_url TEXT,
  mythology TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create constellations table
CREATE TABLE public.constellations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hawaiian_name TEXT NOT NULL,
  english_name TEXT,
  meaning TEXT,
  stars_description TEXT,
  navigation_use TEXT,
  best_viewing_months TEXT,
  mythology TEXT,
  pronunciation_audio_url TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create planets table
CREATE TABLE public.planets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hawaiian_name TEXT NOT NULL,
  english_name TEXT,
  type TEXT DEFAULT 'planet',
  meaning TEXT,
  description TEXT,
  mythology TEXT,
  pronunciation_audio_url TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.stars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.constellations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planets ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Allow public read stars" ON public.stars FOR SELECT USING (true);
CREATE POLICY "Allow public read constellations" ON public.constellations FOR SELECT USING (true);
CREATE POLICY "Allow public read planets" ON public.planets FOR SELECT USING (true);

-- Public write access (lock down later when auth is added)
CREATE POLICY "Allow public insert stars" ON public.stars FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update stars" ON public.stars FOR UPDATE USING (true);
CREATE POLICY "Allow public delete stars" ON public.stars FOR DELETE USING (true);

CREATE POLICY "Allow public insert constellations" ON public.constellations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update constellations" ON public.constellations FOR UPDATE USING (true);
CREATE POLICY "Allow public delete constellations" ON public.constellations FOR DELETE USING (true);

CREATE POLICY "Allow public insert planets" ON public.planets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update planets" ON public.planets FOR UPDATE USING (true);
CREATE POLICY "Allow public delete planets" ON public.planets FOR DELETE USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_stars_updated_at BEFORE UPDATE ON public.stars FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_constellations_updated_at BEFORE UPDATE ON public.constellations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_planets_updated_at BEFORE UPDATE ON public.planets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.stars;
ALTER PUBLICATION supabase_realtime ADD TABLE public.constellations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.planets;