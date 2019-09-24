import React, { useState, useEffect, useRef } from "react";
import { Title, OuterWrapper } from "styles/theme";
import NavBar from "components/navBar/navBar";
import BusContainer from "./BusContainer";
import { EstimateCard, Wrapper } from "styles/theme";

export default function Favorites(props: any) {
  const [estimates, setEstimates] = useState(Array<any>());
  const [favorites, setFavorites] = useState();
  const [update, setUpdate] = useState(0);
  const display = useRef("block");

  const getFavorites = async () => {
    let data = await props.api.getFavorites();
    let favoriteStops: Array<any> = data["favorites"].map(
      (favorite: { route: string; stopId: string; estimates: [] }) => {
        return {
          route: favorite.route,
          stopId: favorite.stopId,
          estimates: new Array()
        };
      }
    );

    getEstimate(favoriteStops);
  };

  const getEstimate = async (favorites: Array<any>) => {
    favorites.map(async (favorite: any) => {
      let data = await props.api.requestTimeEstimate(
        favorite.route,
        favorite.stopId
      );
      let availableEstimates = data["bustime-response"].prd.map(
        (estimate: any) => {
          return {
            time: estimate.prdctdn,
            id: estimate.vid,
            delay: estimate.dly
          };
        }
      );
      favorite.estimates = [...availableEstimates];
      setUpdate(favorite.route);
    });
    setFavorites(favorites);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div>
      <NavBar />
      <OuterWrapper>
        <Wrapper>
          {favorites &&
            favorites.map(
              (favorite: {
                route: string;
                stpId: string;
                estimates: Array<any>;
              }) => (
                <EstimateCard>
                  <BusContainer
                    route={favorite.route}
                    estimates={favorite.estimates}
                  />
                </EstimateCard>
              )
            )}
        </Wrapper>
      </OuterWrapper>
    </div>
  );
}
