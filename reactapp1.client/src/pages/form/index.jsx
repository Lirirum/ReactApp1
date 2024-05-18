import { Box, Button, TextField, Select, MenuItem, useTheme, InputLabel, FormControl } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Admin/Header";
import { tokens } from "../../theme";
import { mockDataCategory } from "../../data/mockData";


const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleFormSubmit = (values) => {
      console.log(values)

      fetch(`product/add`, {          
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name: values.name,
              description: values.description,
              categoryId: values.categoryId,
              price: values.price,
              sku: values.sku,
              qtyInStock: values.qtyInStock,
              imageUrl:values.imageUrl

          })
      })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              console.log(data);
          })
          .catch(error => {
              console.error('There was a problem with your fetch operation:', error);
          });
  };


 

  return (
    <Box m="20px">
      <Header title="CREATE PRODUCT" subtitle="Create a New Product Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.productName && !!errors.productName}
                helperText={touched.productName && errors.productName}
                sx={{ gridColumn: "span 3" }}
                          />
                          <FormControl                         
                          >
                          <InputLabel id="ñategoryName-label">Category Name</InputLabel>
              <Select
                              sx={{
                                  gridColumn: "span 1",                               
                                  }}
                              value={values.categoryId }
                              onChange={handleChange}   
                              name="categoryId"
                              displayEmpty                          
                              labelId="ñategoryName-label"
                             
                          >
                         <MenuItem value="" disabled>
                                  Select an option
                         </MenuItem>                     
                              {mockDataCategory.map(category => (
                                  <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                              ))}
              </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="SKU"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sku}
                name="sku"
                error={!!touched.sku && !!errors.sku}
                helperText={touched.sku && errors.sku}
                sx={{ gridColumn: "span 2" }}
               />

               <TextField
                 fullWidth
                 variant="filled"
                 type="number"
                 label="Quantity in Stock"
                 onBlur={handleBlur}
                 onChange={handleChange}
                 value={values.qtyInStock}
                 name="qtyInStock"
                 error={!!touched.qtyInStock && !!errors.qtyInStock}
                 helperText={touched.qtyInStock && errors.qtyInStock}
                 sx={{ gridColumn: "span 2" }}
               />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Product Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 4" }}
                          />
                        
        
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Product
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};



const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  description: yup.string().required("required"),
  categoryId: yup.number().required("required"),
  sku: yup.string().required("required"),
  qtyInStock: yup.number().required("required"),
  price: yup.number().required("required"),
  
});
const initialValues = {
  name: "",
  description: "",
  categoryId: 5,
  price: 0,
  sku: "",
  qtyInStock: 1,  
  imageUrl: "1.webp"
};

export default Form;