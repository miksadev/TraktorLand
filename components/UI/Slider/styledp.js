import styled from "styled-components";

export default styled.p`
    font-family: 'Open Sans', sans-serif;
    font-style: normal;
    font-weight: 500;
    margin-left: 15px;
    max-height: 56px;
    overflow: hidden;
    width: calc(100% - 30px);
    font-size: 22px;
    line-height: 28px;
    position: absolute;
    top:168px;
    @media (max-width: 380px) {
        top:148px;
      }
`;