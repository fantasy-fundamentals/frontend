import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ScrollToTop() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router.asPath]);

  return null;
}
