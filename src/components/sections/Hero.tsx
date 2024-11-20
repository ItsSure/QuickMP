import { Basics } from '../../interfaces/Basics';
import { SocialIcon } from '../../interfaces/SocialIcon';
import WorldMap from '../../icons/WorldMap';
import Mail from '../../icons/Mail';
import Phone from '../../icons/Phone';
import GitHub from '../../icons/GitHub';
import LinkedIn from '../../icons/LinkedIn';
import X from '../../icons/X';
import Section from '../Section';
import { Image } from 'antd';

export default function Hero({ basics }: Readonly<{ basics: Basics }>) {
  const SOCIAL_ICONS: SocialIcon = {
    GitHub,
    LinkedIn,
    X
  };
  const { name, label, image, location, profiles, phone, email } = basics;
  const { city, region } = location;
  const linkedInfo = profiles?.find(({ network }) => network === 'LinkedIn');
  const linkedUrl = linkedInfo?.url;
  const printInfo = [email, phone, linkedUrl].filter(Boolean).join(' • ');

  return (
    <Section>
      <div className="flex md:flex-row items-center justify-between gap-4 flex-col-reverse">
        <div className="flex flex-col gap-2 md:pr-8 md:items-start md:text-left text-center">
          <h1 className="text-3xl">{name}</h1>
          <h2 className="text-gray-700 font-medium text-lg">{label}</h2>
          <span className="text-gray-600 flex justify-center items-center gap-1 text-sm">
            <WorldMap />
            {city}, {region}
          </span>
          <footer className="text-[0.65rem] text-pretty	text-gray-600 flex gap-1 mt-2 print">
            {printInfo}
          </footer>
          <footer className="text-[0.65rem] justify-center text-xs text-gray-600 flex gap-1 mt-2 no-print">
            {email && (
              <a
                href={`mailto:${email}`}
                title={`Enviar un correo electrónico a ${name} al correo ${email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border #777 p-1 h-8 w-8 rounded-md hover:bg-gray-200 hover:border-gray-300"
              >
                <Mail />
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone}`}
                title={`Llamar por teléfono a ${name} al número ${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-gray-200 p-1 h-8 w-8 rounded-md hover:bg-gray-200 hover:border-gray-300"
              >
                <Phone />
              </a>
            )}
            {profiles?.map(({ network, url }) => {
              const Icon = SOCIAL_ICONS[network];
              return (
                <a
                  key={network}
                  href={url}
                  title={`Visitar el perfil de ${name} en ${network}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-gray-200 p-1 h-8 w-8 rounded-md hover:bg-gray-200 hover:border-gray-300"
                >
                  <Icon />
                </a>
              );
            })}
          </footer>
        </div>
        <figure className="flex justify-center items-center">
          <Image
            src={`${image}`}
            alt={name}
            className="aspect-square object-cover w-32 rounded-lg"
            fallback="/avatar.jpg"
          />
        </figure>
      </div>
    </Section>
  );
}
