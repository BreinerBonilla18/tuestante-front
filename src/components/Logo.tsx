import { Link } from 'react-router-dom';
import logoImage from '../assets/logo.svg';

interface LogoProps {
  to?: string;
  inverted?: boolean;
}

export function Logo({ to = '/', inverted = false }: LogoProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2.5 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      aria-label="TuEstante — inicio">
      <img src={logoImage} alt="" aria-hidden="true" className="h-8 w-8 shrink-0" />
      <span className={`text-[17px] font-semibold tracking-tight ${inverted ? 'text-white' : 'text-ink'}`}>
        TuEstante
      </span>
    </Link>
  );
}