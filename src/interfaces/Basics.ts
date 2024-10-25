import { Profile } from "./Profile";
import { Location } from "./Location";

export interface Basics {
  name: string;
  label: string;
  image: string;
  location: Location;
  profiles: Profile[];
  phone?: string;
  email?: string;
}
