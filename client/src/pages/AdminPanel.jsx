import {
  Box,
  Button,
  Grid2,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../helpers/axios";
import urlConstants from "../constants/urlConstants";
import { deleteProduct, getAllProducts } from "../services/productServices";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";

const AdminPanel = () => {
  const initialFormData = {
    name: "",
    description: "",
    price: "",
    stock: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllProducts({}, {});
        setProducts(response?.data?.data?.products || []);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !file ||
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.stock
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    const data = new FormData();

    // Append form fields to FormData
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    if (file) {
      data.append("image", file);
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post(
        urlConstants.CREATE_PRODUCT,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.data) {
        setProducts([...products, response?.data?.data]);
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    console.log(id);
    try {
      const response = await deleteProduct({ id }, {});
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Product name",
      width: 150,
      headerAlign: "center", // Center align the header
      align: "center", // Center align the cell content
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      width: 110,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 160,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <img
            alt="image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain", // Ensures the image fits within the cell
            }}
            src={params.value}
          />
        );
      },
    },
    {
      field: "id",
      headerName: "Remove",
      width: 160,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Button onClick={() => handleDeleteProduct(params.value)}>
            Remove
          </Button>
        );
      },
    },
  ];

  return (
    <Box sx={{ padding: "20px", height: "100vh" }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
          <Paper
            elevation={3}
            sx={{
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography>Add Product</Typography>
            <TextField
              variant="outlined"
              label="Product Name"
              name="name"
              onChange={handleInputChange}
              value={formData.name}
            />
            <TextField
              variant="outlined"
              label="Product Description"
              name="description"
              onChange={handleInputChange}
              value={formData.description}
            />
            <TextField
              variant="outlined"
              label="Product Price"
              type="number"
              name="price"
              onChange={handleInputChange}
              value={formData.price}
            />
            <TextField
              variant="outlined"
              label="Product Stock"
              type="number"
              name="stock"
              onChange={handleInputChange}
              value={formData.stock}
            />
            <div>
              <label>Upload Image:</label>
              <TextField
                type="file"
                sx={{ border: "none", outline: "none", marginTop: "5px" }}
                size="small"
                inputProps={{ accept: "image/*" }} // Only accept images
                onChange={handleFileChange}
              />
            </div>

            <Button
              onClick={handleSubmit}
              variant="contained"
              loading={loading.toString()}
              disabled={loading}
            >
              Add Product
            </Button>
          </Paper>
        </Grid2>
        <Grid2 item='true' size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 8 }}>
          <Paper sx={{ padding: "10px" }} elevation={3}>
            <DataGrid
              rows={products}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default AdminPanel;
