import { IconButton, styled } from "@mui/material";
import { Container, Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "../fetchers/fetchProducts";
import { ProductItem } from "./ProductItem";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { BasketModal } from "./BasketModal";

const BasketButton = styled(IconButton)`
  position: fixed;
  right: 10px;
  top: 10px;
  border: 1px solid currentColor;
`;
export const ShopModule = () => {
  const [products, setProducts] = useState([]);
  const [openBasket, setOpenBasket] = useState(false);
  const [basket, setBasket] = useState([]);

  console.log(basket);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const handleAddToBasket = useCallback(
    (product) => {
      const newBasket = [...basket];
      const elem = newBasket.find((item) => item.id === product.id);
      if (elem) {
        elem.count += 1;
      } else {
        newBasket.push({
          ...product,
          count: 1
        });
      }
      setBasket(newBasket);
    },
    [basket]
  );

  const handleBasketItemCount = useCallback(
    (product, increment) => {
      const newBasket = [...basket];
      const elem = newBasket.find((item) => item.id === product.id);
      if (elem) {
        elem.count += increment;
        setBasket(newBasket);
      }
      if (elem?.count === 0) {
        setBasket(newBasket.filter((item) => item.id !== product.id));
      }
    },
    [basket]
  );

  return (
    <>
      <BasketButton
        color="primary"
        size="large"
        onClick={() => setOpenBasket(true)}
      >
        <ShoppingBasketIcon />
      </BasketButton>
      <BasketModal
        open={openBasket}
        onClose={() => setOpenBasket(false)}
        basket={basket}
        onBasketItemCountChange={handleBasketItemCount}
      />
      <Container>
        <Grid container gap={2} justifyContent="center">
          {products.map((product) => (
            <Grid item xs={6} sm={4} md={3} key={product.id}>
              <ProductItem
                product={product}
                onAddToBasket={() => handleAddToBasket(product)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
