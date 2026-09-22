import MenuItemCard from './MenuItemCard';
import type { MenuItem } from '../../data/menu';

interface ItemGroupProps {
  gName: string;
  gItems: MenuItem[];
}

export default function ItemGroup({ gName, gItems }: ItemGroupProps) {
  return (
    <div className="flex flex-col gap-4">
      {gName !== 'default' && (
        <div className="flex items-center gap-4 my-2">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
          <span className="text-gold-400 font-display uppercase tracking-widest text-xs font-bold px-2 text-center">
            {gName}
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
        </div>
      )}
      <div className="grid gap-4">
        {gItems.map(item => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
