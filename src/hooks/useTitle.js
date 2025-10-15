import { useEffect } from "react";

const useTitle = (title) => {

    useEffect(() => {
        document.title = `${title} | Zaschboard`;
    }, [title]);
  return (
    null
  )
}

export default useTitle
