import { useLocation } from "react-router-dom";
import { ROUTES, TABS } from "../../../constants";
import { EMPTY_LIST_MESSAGES } from "../../../constants/messages";
import { useEffect } from "react";

export default function FollowersList() {
  const location = useLocation();

  const currentRoute = location.pathname.split('/').pop();

  useEffect(() => {
    if (currentRoute.endsWith(ROUTES.RECIPES_MY)) setData(mockData);
    else if (currentRoute.endsWith(ROUTES.RECIPES_FAVORITES)) setData(mockData);
  }, [location]);

  return (
    <div>
      FollowersList: {location.pathname}
      <p className="font-medium text-sm md:text-base leading-[143%] md:leading-[150%] tracking-[-0.02em] text-center text-[#bfbebe] md:text-[#1a1a1a] mt-20 md:mt-[100px]">
              {currentRoute.endsWith(ROUTES.FOLLOWERS_LIST)
                ? EMPTY_LIST_MESSAGES.FOLLOWERS
                : EMPTY_LIST_MESSAGES.FOLLOWING}
            </p>
    </div>
  );
}
