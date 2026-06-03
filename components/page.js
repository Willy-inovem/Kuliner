import { getMenus, getCategories } from '@/lib/api';
import MenuListClient from '@/components/MenuListClient';

// Server Component - data fetching di server
export default async function HomePage() {
  const menus = await getMenus();
  const categories = await getCategories();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Daftar Menu Kuliner</h1>
      <MenuListClient initialMenus={menus} categories={categories} />
    </div>
  );
}