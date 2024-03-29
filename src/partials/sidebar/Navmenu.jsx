"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Collapse } from "react-collapse";
import Icon from "@/components/ui/Icon";
import { toggleActiveChat } from "@/store/slice";
import { useDispatch } from "react-redux";
import useMobileMenu from "@/hooks/useMobileMenu";
import Submenu from "./Submenu";
import { usePathname } from 'next/navigation'

const Navmenu = ({ menus }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const toggleSubmenu = (i) => {
    if (activeSubmenu === i) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(i);
    }
  };

  const pathname= usePathname();
  const router=useRouter();
  // console.log("Router pathname", pathname);
  const locationName = pathname.replace("/", "");
 
  // const locationName = router.pathname === "/" ? "" : router.pathname?.replace("/", "");

  const [mobileMenu, setMobileMenu] = useMobileMenu();
  const dispatch = useDispatch();

  useEffect(() => {
    let submenuIndex = null;
    menus.forEach((item, i) => {
      if (!item.child) return;
      if (item.link === locationName) {
        submenuIndex = null;
      } else {
        const ciIndex = item.child.findIndex(
          (ci) => ci.childlink === locationName
        );
        if (ciIndex !== -1) {
          submenuIndex = i;
        }
      }
    });
    document.title = `Swadeshi Mela | ${locationName}`;

    setActiveSubmenu(submenuIndex);
    dispatch(toggleActiveChat(false));
    if (mobileMenu) {
      setMobileMenu(false);
    }
  }, [pathname]);

  return (
    <>
      <ul>
        {menus.map((item, i) => (
          <li
            key={i}
            className={`single-sidebar-menu  
              ${item.child ? "item-has-children" : ""}
              ${activeSubmenu === i ? "open" : ""}
              ${locationName === item.link ? "menu-item-active" : ""}`}
          >
            {!item.child && !item.isHeadr && (
              <Link href={item.link} className="menu-link" >
               
                  <span className="menu-icon flex-grow-0 ">
                    <Icon icon={item.icon} />
                  </span>
                  <div className="text-box   flex-grow">{item.title}</div>
                  {item.badge && <span className="menu-badge">{item.badge}</span>}
               
              </Link>
            )}

            {item.isHeadr && !item.child && (
              <div className="menulabel">{item.title}</div>
            )}

            {item.child && (
              <div
                className={`menu-link ${
                  activeSubmenu === i
                    ? "parent_active not-collapsed"
                    : "collapsed"
                }`}
                onClick={() => toggleSubmenu(i)}
              >
                <div className="flex-1 flex items-start">
                  <span className="menu-icon">
                    <Icon icon={item.icon} />
                  </span>
                  <div className="text-box">{item.title}</div>
                </div>
                <div className="flex-0">
                  <div
                    className={`menu-arrow transform transition-all duration-300 ${
                      activeSubmenu === i ? " rotate-90" : ""
                    }`}
                  >
                    <Icon icon="heroicons-outline:chevron-right" />
                  </div>
                </div>
              </div>
            )}

            <Submenu activeSubmenu={activeSubmenu} item={item} i={i} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navmenu;
