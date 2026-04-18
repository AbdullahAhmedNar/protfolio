import { useTheme } from "../../hooks/useTheme";

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className={`border-t pt-16 pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] lg:pb-16 ${
        isDark ? "bg-bg-surface border-white/5" : "bg-white border-gray-200"
      }`}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 text-center">
        <div className="footer-poem-row">
          <img src="/image/palestine.ico" alt="" className="footer-flag-img" aria-hidden />
          <p
            className={`font-aligarh footer-poem ${
              isDark ? "text-text-main" : "text-gray-800"
            }`}
          >
            وَلِلحُرِّيَةِ الحَمراءِ بابٌ &nbsp;—&nbsp; وَلِكُلِّ يَدٍ مُضَرَّجَةٍ يُدَقُّ
          </p>
          <img src="/image/palestine.ico" alt="" className="footer-flag-img" aria-hidden />
        </div>
      </div>
    </footer>
  );
}
