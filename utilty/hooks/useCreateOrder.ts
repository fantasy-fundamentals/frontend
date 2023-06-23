import { useRouter } from "next/router";
import { current } from "@reduxjs/toolkit";
import { useState, useEffect } from "react";

interface ICreateOrderState {
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
}
//
const useCreateOrder = () => {
  const location = useRouter();

  const [state, setState] = useState<ICreateOrderState>({
    isSuccess: false,
    isError: false,
    isLoading: true,
  });

  const isUrlValid = () => {
    const [url, queryString] = location.asPath.split("?");

    if (!queryString) return false;
    if (!url.endsWith("/success")) return false;

    if (
      queryString.includes("token=") &&
      queryString.includes("paymentId=") &&
      queryString.includes("PayerID=") &&
      queryString.split("&").length === 3
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (isUrlValid()) {
      if (Object.keys(location.query).length > 0) {
        const { paymentId, token, PayerID } = location.query;
        if (paymentId && token && PayerID) {
          setState((currentState) => {
            return {
              ...currentState,
              isLoading: false,
              isError: false,
              isSuccess: true,
            };
          });
        }
      }
    } else {
      setState((currentState) => {
        return {
          ...currentState,
          isLoading: false,
          isSuccess: false,
          isError: true,
        };
      });
    }
  }, [location]);

  return {
    isSuccess: state.isSuccess,
    isError: state.isError,
    isLoading: state.isLoading,
  };
};

export default useCreateOrder;
