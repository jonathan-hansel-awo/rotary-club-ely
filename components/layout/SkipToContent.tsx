export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        focus:fixed focus:top-4 focus:left-4 focus:z-[100]
        focus:px-4 focus:py-3
        focus:bg-[#F7A81B] focus:text-[#1A1918]
        focus:font-semibold focus:text-sm
        focus:rounded-[0.375rem]
        focus:shadow-lg
        focus:outline-none
        focus:ring-2 focus:ring-[#17458F] focus:ring-offset-2
      "
    >
      Skip to main content
    </a>
  )
}