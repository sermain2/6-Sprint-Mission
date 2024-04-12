import styled from "styled-components";

const ProductCard = ({ product, showLikes = false }) => {
  const { name, price, images, favoriteCount } = product;

  return (
    <ProductCardWrapper>
      <ProductImage src={images[0]} alt={name} />
      <ProductName>{name}</ProductName>
      <ProductPrice>{price}원</ProductPrice>
      {showLikes && (
        <ProductLikes>
          {favoriteCount !== 0 ? "❤️" : "🤍"} {favoriteCount}
        </ProductLikes>
      )}
    </ProductCardWrapper>
  );
};

const ProductCardWrapper = styled.div`
  border: none;
  padding: 0.5rem;
  text-align: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: 240px;
  border-radius: 16px;
`;

const ProductName = styled.h3`
  margin: 0.8rem 0;
  width: 116px;
  height: 17px;
  font-size: 13px;
  font-weight: 500;
  line-height: 16.71px;
  text-align: left;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 19.09px;
  text-align: left;
`;

const ProductLikes = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 14.32px;
  text-align: left;
  color: #4b5563;
  padding-top: 10px;
`;

export default ProductCard;
