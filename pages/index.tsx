import React from "react";
import {GetStaticProps} from 'next'
import {Product} from '../components/product/types'
import api from "../components/product/api";
import { Button, Flex, Grid, Image, Link, Stack, Text } from "@chakra-ui/react";

interface Props {
  products: Product[];
}

function parseCurrency(value: number): string{
  return value.toLocaleString("es-AR", {
    style: "currency", 
    currency: "ARS"
  })
}

const IndexRoute: React.FC<Props> = ({products}) => {
  const [cart, setCart] = React.useState<Product[]>([]);

  const text = React.useMemo(
    () => 
    cart
    .reduce(
      (message, product) => 
    message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`), ``)
    .concat(`\nTotal:${parseCurrency(cart.reduce((total, product)=> total + product.price, 0))}`), [cart]
  )

  function handleAddToCart(product: Product) {
    setCart((cart) => cart.concat(product))
  }
  

  return (
  <Stack spacing={6}>
    <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))" >
    {products.map(product => 
    <Stack 
    key={product.id}
    backgroundColor="gray.50" 
    borderRadius="md" 
    padding={4}
    spacing={2}
    >  
    <Image 
      borderRadius="md"
      alt={product.title}
      maxHeight={250}
      objectFit="cover"
      src={product.image}/>
      <Text fontSize={22} fontWeight="500" >{product.title}</Text>
      <Text color="green.500" fontSize={18} fontWeight="700" >{parseCurrency(product.price)}</Text>
      <Button onClick={() => handleAddToCart(product)} colorScheme="primary" size="sm" variant="outline">
      Agregar al Carrito
      </Button>
    </Stack>)}
  </Grid>
  {Boolean(cart.length) 
  &&
  <Flex position="sticky" padding={4} bottom={4} marginBottom={4} alignItems="center" justifyContent="center" >
    <Button 
    isExternal 
    as={Link} 
    href={`https://wa.me/543516862740?text=${encodeURIComponent(text)}`}
    colorScheme="whatsapp" 
    width="fit-content" >Completar pedido ({cart.length} productos)
    </Button>

  </Flex>
  }
  </Stack>
    )
};

export const getStaticProps: GetStaticProps = async() => {
  
  const products = await api.list();

  return {
    props: {
      products,
    },
    revalidate: 30
  }
}


export default IndexRoute