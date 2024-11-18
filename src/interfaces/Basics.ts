import { Profile } from "./Profile";
import { Location } from "./Location";

export interface Basics {
  name: string;
  label: string;
  image?: string;
  email?: string;
  phone?: string;
  summary?: string;
  location: Location;
  profiles?: Profile[];
}
