/**
 * React hook that determines if the current viewport width is considered "mobile"
 * based on a predefined breakpoint (default: 768px).
 *
 * Returns `true` if the viewport width is less than the mobile breakpoint, otherwise `false`.
 * The hook listens for viewport size changes and updates automatically.
 *
 * @returns {boolean} `true` if the device is mobile-sized, otherwise `false`.
 *
 * @example
 * const isMobile = useIsMobile();
 * if (isMobile) {
 *   // Render mobile-specific UI
 * }
 */
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
