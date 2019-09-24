import styled from "styled-components";

export const StyledForm = styled.form`
  background-color: #ffe082;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
  padding: 1em;
  margin: 1em auto;
  min-width: 250px;
  max-width: 400px;
  flex-direction: column;
`;

export const EstimateCard = styled.div`
  background-color: #ffe082;
  border-radius: 4px;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 60%;
  margin: 1em auto;
  min-width: 250px;
  max-width: 400px;

  @media (min-width: 400px) {
    padding: 1em;
    width: 60%;
    display: flex;
  }

  @media (min-width: 1000px) {
    width: 100%;
    display: inline-flex;
  }
`;

export const WrapperInner = styled.div`
  padding: 0.5em;
  width: 100%;
  margin: 0.5em;
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: 1em auto;
  padding: 0.5em;
  flex-direction: row;
  align-items: center;

  @media (min-width: 400px) {
    padding: 1.5em;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 1000px) {
    width: 60%;
    justify-content: center;
    flex-direction: row;
    margin: 1em;
    align-items: center;
  }
`;

export const Input = styled.input`
  width: 300px;
  height: 35px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

export const Button = styled.button`
  width: 300px;
  height: 35px;
  background-color: #5995ef;
  color: #fff;
  border-radius: 3px;
`;

export const Title = styled.h1`
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  color: #4d4d4d;
  font-size: 2.2em;
`;

export const Title2 = styled.h2`
  font-family: "Raleway", sans-serif;
  font-weight: 300;
  color: #4d4d4d;
  font-size: 1.8em;
`;

export const Text = styled.p`
  font-family: "Raleway", sans-serif;
  color: ${props => props.color || "#4d4d4d"};
`;

export const OuterWrapper = styled.section`
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;
