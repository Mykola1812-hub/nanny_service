import css from './NanniesList.module.css';
import NannyCard from '@/components/NannyCard/NannyCard';
import type { Nanny } from '@/types/nanny';

interface NanniesListProps {
  nannies: Nanny[];
}

export default function NanniesList({ nannies }: NanniesListProps) {
  return (
    <ul className={css.list}>
      {nannies.map(nanny => (
        <li key={nanny.id}>
          <NannyCard nanny={nanny} />
        </li>
      ))}
    </ul>
  );
}
