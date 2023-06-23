import { useRouter } from "next/router";
import { useEffect } from "react";
import { store } from "../store";

interface prop {
  children?: any;
}
const PrivateRoute = (props: prop) => {
  const { children } = props;
  const { accessToken } = store?.getState()?.user;
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.replace("/");
    }
  }, [accessToken, router]);

  if (!accessToken) {
    return null;
  }

  return children;
};
export default PrivateRoute;
