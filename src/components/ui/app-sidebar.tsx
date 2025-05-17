import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="text-xl font-bold px-4 py-2 block">
          Dein Projekt
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Link href="/3dScene" className="block px-4 py-2 hover:bg-gray-800 rounded">
            3D Scene
          </Link>
          {/* Weitere Links */}
        </SidebarGroup>
        {/* Weitere SidebarGroups falls gewünscht */}
      </SidebarContent>
      <SidebarFooter>
        <span className="text-xs text-gray-400 px-4 py-2 block">© {new Date().getFullYear()} Mein Projekt</span>
      </SidebarFooter>
    </Sidebar>
  );
}