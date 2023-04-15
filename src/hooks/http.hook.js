import { useState, useCallback } from "react";

export const useHttp = () => {
   const [process, setProcess] = useState("waiting");

   const request = useCallback(
      async (
         url,
         method = "GET",
         body = null,
         headers = { "Content-Type": "application/json" }
      ) => {
         setProcess((process) => "loading");

         try {
            const response = await fetch(url, { method, body, headers });

            const totalCount = response.headers.get("X-Total-Count");

            if (!response.ok)
               throw new Error(
                  `Could not fetch ${url}, status: ${response.status}`
               );

            const data = await response.json();

            return { data, totalCount };
         } catch (error) {
            setProcess((process) => "error");
            throw error;
         }
      },
      []
   );

   return { request, process, setProcess };
};
