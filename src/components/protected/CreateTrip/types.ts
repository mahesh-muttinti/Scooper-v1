interface Location {
  lat: number;
  lng: number;
}

interface Viewport {
  northeast: Location;
  southwest: Location;
}

interface OpeningHours {
  open_now: boolean;
}

interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

interface PlusCode {
  compound_code: string;
  global_code: string;
}

interface Result {
  business_status: string;
  formatted_address: string;
  geometry: {
    location: Location;
    viewport: Viewport;
  };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours: OpeningHours;
  photos: Photo[];
  place_id: string;
  plus_code: PlusCode;
  rating: number;
  reference: string;
  types: string[];
  user_ratings_total: number;
}

export interface PlacesResponse {
  html_attributions: string[];
  results: Result[];
  status: string;
}
