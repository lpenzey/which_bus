import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Title } from "components/theme";
import NavBar from "components/navBar/navBar";
import BusContainer from "./BusContainer";

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 2px;
  justify-content: center;
  width: 100%;
  margin: 1em auto;

  flex-direction: column;
  align-items: center;

  @media (min-width: 400px) {
    padding: 1.5em;
    width: 60%;
    display: flex;
  }

  @media (min-width: 2000px) {
    width: 60%;
    display: inline-flex;
    justify-content: center;
    flex-direction: row;
    margin: 1em;
  }
`;

export default function Favorites(props: any) {
  const [estimates, setEstimates] = useState(Array<any>());
  const [favorites, setFavorites] = useState(Array<any>());
  const [update, setUpdate] = useState("");
  // const display = useRef("block");

  const getFavorites = async () => {
    let data = await props.api.getFavorites();
    let favoriteStops: Array<any> = data["favorites"].map((favorite: any) => {
      return {
        route: favorite.route,
        stopId: favorite.stopId
      };
    });

    // display.current = "block";
    setFavorites(favoriteStops);
    getEstimate(favoriteStops);
  };

  const getEstimate = async (favorites: Array<any>) => {
    console.log("inside estiamte");
    console.log(favorites);
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
      // display.current = "block";
      console.log(availableEstimates);
      setEstimates(availableEstimates);
      let i = 0;
      setUpdate(update + i);
      i++;
    });
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div>
      <NavBar />
      <Wrapper>
        <Title>Here are your favorites</Title>
        {favorites.map((item: { route: string; stpId: string }) => (
          <BusContainer route={item.route} estimates={estimates} />
        ))}
      </Wrapper>
    </div>
  );
}
