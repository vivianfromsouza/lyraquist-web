import { useWindowDimensions } from "react-native";
import { BREAKPOINTS } from "../constants/Breakpoints";

export type Breakpoint = "mobile" | "tablet" | "desktop";

export default function useBreakpoint() {
  const { width } = useWindowDimensions();

  const breakpoint: Breakpoint =
    width >= BREAKPOINTS.desktop
      ? "desktop"
      : width >= BREAKPOINTS.tablet
        ? "tablet"
        : "mobile";

  return {
    width,
    breakpoint,
    isMobile: breakpoint === "mobile",
    isTablet: breakpoint === "tablet",
    isDesktop: breakpoint === "desktop",
  };
}
