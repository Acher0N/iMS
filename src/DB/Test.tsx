import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { db } from "./iDB";
import { create, readAll, update, remove } from "./api";
import { v4 as uuidv4 } from "uuid";
import { TextField, Button, Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

// Define Product schema for validation with Yup
const ProductSchema = Yup.object().shape({
  nameEn: Yup.string().required("English name is required"),
  nameAr: Yup.string().required("Arabic name is required"),
  cost: Yup.number().min(0).required("Cost is required"),
  sell: Yup.number().min(0).required("Sell price is required"),
  VATPercentage: Yup.number().min(0).max(100).required("VAT percentage is required"),
  count: Yup.number().min(1).required("Quantity count is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
});

const MyComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editableProduct, setEditableProduct] = useState<any>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await readAll(db.products);
    setProducts(data);
  };

  const handleAddProduct = async (values: any, { resetForm }: any) => {
    const newProduct: Product = {
      id: uuidv4(),
      name: { en: values.nameEn, ar: values.nameAr },
      price: { cost: values.cost, sell: values.sell },
      VAT: { type: "Included", percentage: values.VATPercentage },
      quantity: { isCount: "Count", count: values.count },
      category: values.category,
      description: values.description,
      lastModifiedDate: new Date().toString(),
      lastModified: Date.now(),
      uid: uuidv4(),
    };
    await create(db.products, newProduct);
    fetchProducts();
    resetForm();
  };

  const handleDeleteProduct = async (id: string) => {
    await remove(db.products, id);
    fetchProducts();
  };

  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setEditableProduct({
      ...product,
      nameEn: product.name.en,
      nameAr: product.name.ar,
      cost: product.price.cost,
      sell: product.price.sell,
      VATPercentage: product.VAT.percentage,
      count: product.quantity.count,
    });
  };

  const handleSaveEdit = async () => {
    const updatedProduct = {
      ...editableProduct,
      name: { en: editableProduct.nameEn, ar: editableProduct.nameAr },
      price: { cost: editableProduct.cost, sell: editableProduct.sell },
      VAT: { type: "Included", percentage: editableProduct.VATPercentage },
      quantity: { isCount: "Count", count: editableProduct.count },
    };

    await update(db.products, editingId as string, updatedProduct);
    setEditingId(null);
    fetchProducts();
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditableProduct(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>
      <Formik
        initialValues={{
          nameEn: "",
          nameAr: "",
          cost: 0,
          sell: 0,
          VATPercentage: 0,
          count: 1,
          category: "",
          description: "",
        }}
        validationSchema={ProductSchema}
        onSubmit={handleAddProduct}
      >
        {({ errors, touched }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              <Field as={TextField} name="nameEn" label="Product Name (EN)" error={Boolean(errors.nameEn && touched.nameEn)} helperText={touched.nameEn && errors.nameEn} />
              <Field as={TextField} name="nameAr" label="Product Name (AR)" error={Boolean(errors.nameAr && touched.nameAr)} helperText={touched.nameAr && errors.nameAr} />
              <Field as={TextField} name="cost" label="Cost Price" type="number" error={Boolean(errors.cost && touched.cost)} helperText={touched.cost && errors.cost} />
              <Field as={TextField} name="sell" label="Sell Price" type="number" error={Boolean(errors.sell && touched.sell)} helperText={touched.sell && errors.sell} />
              <Field
                as={TextField}
                name="VATPercentage"
                label="VAT Percentage"
                type="number"
                error={Boolean(errors.VATPercentage && touched.VATPercentage)}
                helperText={touched.VATPercentage && errors.VATPercentage}
              />
              <Field as={TextField} name="count" label="Quantity Count" type="number" error={Boolean(errors.count && touched.count)} helperText={touched.count && errors.count} />
              <Field as={TextField} name="category" label="Category" error={Boolean(errors.category && touched.category)} helperText={touched.category && errors.category} />
              <Field
                as={TextField}
                name="description"
                label="Description"
                multiline
                rows={4}
                error={Boolean(errors.description && touched.description)}
                helperText={touched.description && errors.description}
              />
              <Button type="submit" variant="contained" color="primary">
                Add Product
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name (EN)</TableCell>
              <TableCell>Name (AR)</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Sell</TableCell>
              <TableCell>VAT (%)</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                {editingId === product.id ? (
                  <>
                    <TableCell>
                      <TextField value={editableProduct.nameEn} onChange={(e) => setEditableProduct({ ...editableProduct, nameEn: e.target.value })} />
                    </TableCell>
                    <TableCell>
                      <TextField value={editableProduct.nameAr} onChange={(e) => setEditableProduct({ ...editableProduct, nameAr: e.target.value })} />
                    </TableCell>
                    <TableCell>
                      <TextField type="number" value={editableProduct.cost} onChange={(e) => setEditableProduct({ ...editableProduct, cost: Number(e.target.value) })} />
                    </TableCell>
                    <TableCell>
                      <TextField type="number" value={editableProduct.sell} onChange={(e) => setEditableProduct({ ...editableProduct, sell: Number(e.target.value) })} />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={editableProduct.VATPercentage}
                        onChange={(e) => setEditableProduct({ ...editableProduct, VATPercentage: Number(e.target.value) })}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField type="number" value={editableProduct.count} onChange={(e) => setEditableProduct({ ...editableProduct, count: Number(e.target.value) })} />
                    </TableCell>
                    <TableCell>
                      <TextField value={editableProduct.category} onChange={(e) => setEditableProduct({ ...editableProduct, category: e.target.value })} />
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={handleSaveEdit}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={handleCancelEdit}>
                        <CancelIcon />
                      </IconButton>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{product.name.en}</TableCell>
                    <TableCell>{product.name.ar}</TableCell>
                    <TableCell>{product.price.cost}</TableCell>
                    <TableCell>{product.price.sell}</TableCell>
                    <TableCell>{product.VAT.percentage}</TableCell>
                    <TableCell>{product.quantity.count}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEditClick(product)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteProduct(product.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MyComponent;
