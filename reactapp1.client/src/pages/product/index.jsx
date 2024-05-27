import { useState, useEffect } from "react"
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Admin/Header";

const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [productList, setProductList] = useState([]);
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProductListData(100);

    }, []);

    useEffect(() => {

 

    }, [productList]);
    async function getProductListData(quantity) {

        const response = await fetch(`/api/product/admin/top/${quantity}`, {
            headers: {
                Accept: "application/json"
            }

        });
        if (response.ok) {
            const data = await response.json();
            setProductList(data);
            setLoading(false)

            const formattedData = data.map(item => ({
                id: item.productItemId,
                categoryId: item.categoryId,
                categoryName: item.categoryName,
                sku: item.sku,
                QtyInStock: item.qtyInStock,
                name: item.name,
                price: item.price,
                description: item.description
            }));
    
            setProductData(formattedData);

        } else {
            console.log(response.status);
        }



    }



  const columns = [
      { field: "id", headerName: "ID" },
   {
      field: "categoryId",
      headerName: "Category Code",
      
      },
      {
          field: "categoryName",
          headerName: "Category Name",
          cellClassName: "name-column--cell",
      },
    {
      field: "sku",
      headerName: "SKU",   
      },
      {
          field: "name",
          headerName: "Name",
          flex: 1,
          cellClassName: "name-column--cell",
      },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,    
    },
      {
          field: "QtyInStock",
          headerName: "QtyInStock",
          type: "number",
          headerAlign: "left",
          align: "left",
      },
  
  ];

  return (
    <Box m="20px">
      <Header title="Product" subtitle="Managing the Product List" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
      <DataGrid checkboxSelection rows={productData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;