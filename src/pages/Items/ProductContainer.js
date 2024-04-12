import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import heart from "../../assets/heart.svg";

const StyledProductContainer = styled(Link)`
`;

const ProductImg = styled.img`
  width: ${(props) => props.width || '220px'};
  height: ${(props) => props.width || '220px'};
  border-radius: 16.59px;
  margin-bottom: 16px;
`;

const ProductDes = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  text-align: left;
  margin-bottom: 6px;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 19.09px;
  text-align: left;
  margin-bottom: 6px;
`;

const ProductFav = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 14.32px;
  text-align: left;
`;

const ProductFooter = styled.div`
  display: flex;
  align-items: center;
`;

const HeartImg = styled.img`
  margin-right: 5px;
`

function ProductContainer({src, alt, description, price, favoriteCount, width }) {
  return (
    <StyledProductContainer>
      <ProductImg src={src} alt={alt} width={width} />
      <ProductDes>{description}</ProductDes>
      <ProductPrice>{price}</ProductPrice>
      <ProductFooter>
        <HeartImg src={heart}/>
        <ProductFav>{favoriteCount}</ProductFav>
      </ProductFooter>
    </StyledProductContainer>
  );
}

export default ProductContainer;