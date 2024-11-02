import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { db } from "./iDB"; // Adjust according to your database setup
import { create, readAll, update, remove } from "./api"; // Ensure these APIs are correctly set up
import { v4 as uuidv4 } from "uuid";
import { TextField, Button, Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

// Define the Sales schema for validation
const SalesSchema = Yup.object().shape({
  productId: Yup.string().required("Product ID is required"),
  quantity: Yup.number().min(1).required("Quantity is required"),
  salePrice: Yup.number().min(0).required("Sale price is required"),
  saleDate: Yup.date().required("Sale date is required").nullable(),
});

const SalesComponent = () => {
  const [sales, setSales] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editableSale, setEditableSale] = useState<any>({});

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    const data = await readAll(db.sales); // Adjust to your sales database
    setSales(data);
  };

  const handleAddSale = async (values: any, { resetForm }: any) => {
    const newSale = {
      id: uuidv4(),
      ...values,
    };
    await create(db.sales, newSale);
    fetchSales();
    resetForm();
  };

  const handleDeleteSale = async (id: string) => {
    await remove(db.sales, id);
    fetchSales();
  };

  const handleEditClick = (sale: any) => {
    setEditingId(sale.id);
    setEditableSale({ ...sale });
  };

  const handleSaveEdit = async () => {
    await update(db.sales, editingId as string, editableSale);
    setEditingId(null);
    fetchSales();
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditableSale({});
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Sales Management
      </Typography>
      <Formik
        initialValues={{
          productId: "",
          quantity: 1,
          salePrice: 0,
          saleDate: null,
        }}
        validationSchema={SalesSchema}
        onSubmit={handleAddSale}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                name="productId"
                label="Product ID"
                value={values.productId}
                onChange={handleChange}
                error={Boolean(errors.productId && touched.productId)}
                helperText={touched.productId && errors.productId}
                fullWidth
              />
              <TextField
                name="quantity"
                label="Quantity"
                type="number"
                value={values.quantity}
                onChange={handleChange}
                error={Boolean(errors.quantity && touched.quantity)}
                helperText={touched.quantity && errors.quantity}
                fullWidth
              />
              <TextField
                name="salePrice"
                label="Sale Price"
                type="number"
                value={values.salePrice}
                onChange={handleChange}
                error={Boolean(errors.salePrice && touched.salePrice)}
                helperText={touched.salePrice && errors.salePrice}
                fullWidth
              />
              <TextField
                name="saleDate"
                label="Sale Date"
                type="date"
                value={values.saleDate || ""}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                error={Boolean(errors.saleDate && touched.saleDate)}
                helperText={touched.saleDate && errors.saleDate}
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary">
                Add Sale
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Sale Price</TableCell>
              <TableCell>Sale Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                {editingId === sale.id ? (
                  <>
                    <TableCell>
                      <TextField name="productId" value={editableSale.productId || ""} onChange={(e) => setEditableSale({ ...editableSale, productId: e.target.value })} />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="quantity"
                        type="number"
                        value={editableSale.quantity || 1}
                        onChange={(e) => setEditableSale({ ...editableSale, quantity: Number(e.target.value) })}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="salePrice"
                        type="number"
                        value={editableSale.salePrice || 0}
                        onChange={(e) => setEditableSale({ ...editableSale, salePrice: Number(e.target.value) })}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="saleDate"
                        type="date"
                        value={editableSale.saleDate || ""}
                        onChange={(e) => setEditableSale({ ...editableSale, saleDate: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                      />
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
                    <TableCell>{sale.productId}</TableCell>
                    <TableCell>{sale.quantity}</TableCell>
                    <TableCell>{sale.salePrice}</TableCell>
                    <TableCell>{sale.saleDate}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEditClick(sale)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteSale(sale.id)}>
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

export default SalesComponent;
