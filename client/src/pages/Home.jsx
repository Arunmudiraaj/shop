import { Box, Grid2, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ProductItem from '../components/ProductItem';
import { getAllProducts } from '../services/productServices';
import { getCart } from '../services/cartServices';
import { useDispatch, useSelector } from 'react-redux';
import { setCartData } from '../store/cartSlice';
import { toast } from 'react-toastify';
const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch()
  const userData = useSelector((state) => state?.auth || null);
  useEffect(()=>{
    const getData = async()=>{
      try{
        const response = await getAllProducts({}, {search: searchText})
        setProducts(response?.data?.data?.products || [])
      } catch(error){
        console.log(error)
        toast.error(error?.response?.data?.message)
      }
    }
    getData()
  },[searchText])

  useEffect(()=>{
    getCartData()
  },[])

  const getCartData = async()=>{
    try{
      if(userData?.accessToken){
        const cart = await getCart()
        console.log(cart.data.data)
        dispatch(setCartData(cart?.data?.data))
      }
    } catch(error){
      console.log(error)
    }
  }
  return (
    <Box sx={{ padding: '20px' }}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant='h5'>Products</Typography>
        <TextField
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          },
        }}
        variant="outlined"
        placeholder="Search..."
        size="small"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      </Stack>
      <Box sx={{ flexGrow: 1, marginTop: '20px' }}>
      <Grid2 container spacing={2} rowSpacing={6}>
        {products?.length>0 ? products.map((item) => (
          <Grid2 key={item.id} size={{ xs: 12, md: 6, lg: 4 }} >
          <ProductItem item={item}/>
        </Grid2>
        )): <Typography>No Products Found</Typography>}
      </Grid2>
    </Box>
    </Box>
  );
};

export default Home;
