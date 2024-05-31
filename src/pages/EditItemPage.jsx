import config from "../config.json";
import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditItemPage = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState({
    itemCode: "",
    itemName: "",
    itemDescription: "",
    itemCategory: "",
    itemSubCategory: "",
    purchasePrice: "",
    sellingPrice: "",
    unit: "",
    stockCount: "",
    lastGRNDate: "",
    lastPODate: "",
    lastPurchasePrice: "",
    remark: "",
  });

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const host = config.host;

  useEffect(() => {
    // Fetch item data
    axios
      .post(host+"/api/item/view", { id })
      .then((response) => {
        const itemApiData = response.data;

        // Update the itemData state with the received data
        setItemData({
          itemCode: itemApiData.item_code,
          itemName: itemApiData.item_name,
          itemDescription: itemApiData.item_description,
          itemCategory: itemApiData.item_category_id,
          itemSubCategory: itemApiData.item_sub_category_id,
          purchasePrice: itemApiData.item_purchasing_price,
          sellingPrice: itemApiData.item_selling_price,
          unit: itemApiData.item_unit_id,
          stockCount: itemApiData.stock_count,
          lastGRNDate: itemApiData.last_grn_date,
          lastPODate: itemApiData.last_pos_date,
          lastPurchasePrice: itemApiData.last_purchase_price,
          remark: itemApiData.remark,
        });
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });

    // Fetch category data
    axios
      .get(host + "/api/item/category_list")
      .then((response) => {
        if (response.data.length > 0) {
          setCategoryOptions(response.data);
        } else {
          console.error("Failed to fetch categories:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("An error occurred while fetching categories:", error);
      });

    // Fetch sub-category data
    axios
      .get(host+"/api/item/sub_category_list")
      .then((response) => {
        if (response.data.length > 0) {
          setSubCategoryOptions(response.data);
        } else {
          console.error("Failed to fetch sub-categories:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("An error occurred while fetching sub-categories:", error);
      });

    // Fetch unit data
    axios
      .get(host+ "/api/item/unit_list")
      .then((response) => {
        if (response.data.length > 0) {
          setUnitOptions(response.data);
        } else {
          console.error("Failed to fetch units:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("An error occurred while fetching units:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    // Make a POST request to update the item data in the database
    axios
      .post(host+"/api/item/update", {
        code: itemData.itemCode,
        name: itemData.itemName,
        description: itemData.itemDescription,
        purchasing_price: parseFloat(itemData.purchasePrice),
        selling_price: parseFloat(itemData.sellingPrice),
        unit_id: parseInt(itemData.unit),
        category_id: parseInt(itemData.itemCategory),
        sub_category_id: parseInt(itemData.itemSubCategory),
        stock_count: parseInt(itemData.stockCount),
        last_grn_date: itemData.lastGRNDate,
        last_pos_date: itemData.lastPODate,
        last_purchase_price: parseFloat(itemData.lastPurchasePrice),
        remark: itemData.remark,
        id: id,
      })
      .then((response) => {
        if (response.data.status === false) {
          // Handle error response here
          console.error("An error occurred:", response.data);

          // Show an error toast with the response message
          toast.error(
            response.data.message || "An error occurred while updating the item.",
            { autoClose: 2000 }
          );
        } else {
          // Handle success response here (e.g., show a success message)
          console.log("Item updated successfully:", response.data);

          // Show a success toast
          toast.success("Item updated successfully!", { autoClose: 2000 });
          setTimeout(() => {
            window.location.href = "/item_list"; 
          }, 2000); 
          // Clear the form
          setItemData({
            itemCode: "",
            itemName: "",
            itemDescription: "",
            itemCategory: "",
            itemSubCategory: "",
            purchasePrice: "",
            sellingPrice: "",
            unit: "",
            stockCount: "",
            lastGRNDate: "",
            lastPODate: "",
            lastPurchasePrice: "",
            remark: "",
          });
        }
      })
      .catch((error) => {
        // Handle update error
        console.error("An error occurred:", error);

        // Show an error toast for any network or server errors
        toast.error("An error occurred while making the request.", { autoClose: 2000 });
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" mb={3} align="center">
        Edit Item
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <form>
          {/* Basic Info Section */}
          <Typography variant="h6" mb={2}>
            Basic Info
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Item Code"
                name="itemCode"
                value={itemData.itemCode}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Item Name"
                name="itemName"
                value={itemData.itemName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Item Description"
                name="itemDescription"
                value={itemData.itemDescription}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="itemCategory">Item Category</InputLabel>
                <Select
                  name="itemCategory"
                  value={itemData.itemCategory}
                  onChange={handleChange}
                  label="Item Category"
                >
                  <MenuItem value="">Select Category</MenuItem>
                  {categoryOptions.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="itemSubCategory">Item Sub Category</InputLabel>
                <Select
                  name="itemSubCategory"
                  value={itemData.itemSubCategory}
                  onChange={handleChange}
                  label="Item Sub Category"
                >
                  <MenuItem value="">Select Sub Category</MenuItem>
                  {subCategoryOptions.map((subCategory) => (
                    <MenuItem key={subCategory.id} value={subCategory.id}>
                      {subCategory.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Purchase Price"
                name="purchasePrice"
                value={itemData.purchasePrice}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Selling Price"
                name="sellingPrice"
                value={itemData.sellingPrice}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel htmlFor="unit">Unit</InputLabel>
                <Select
                  name="unit"
                  value={itemData.unit}
                  onChange={handleChange}
                  label="Unit"
                >
                  <MenuItem value="">Select Unit</MenuItem>
                  {unitOptions.map((unit) => (
                    <MenuItem key={unit.id} value={unit.id}>
                      {unit.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Stock Info Section */}
          <Typography variant="h6" mt={4} mb={2}>
            Stock Info
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Stock Count"
                name="stockCount"
                value={itemData.stockCount}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last GRN Date"
                name="lastGRNDate"
                type="date"
                value={itemData.lastGRNDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last PO Date"
                name="lastPODate"
                type="date"
                value={itemData.lastPODate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Purchase Price"
                name="lastPurchasePrice"
                value={itemData.lastPurchasePrice}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Remark"
                name="remark"
                value={itemData.remark}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <div style={{ marginTop: "16px", textAlign: "right" }}>
            <Button
              onClick={handleUpdate}
              variant="contained"
              color="primary"
              style={{
                width: "auto",
                backgroundColor: "blue",
                color: "white",
                borderRadius: "5px",
                padding: "10px 20px",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Paper>

      {/* Toast Container */}
      <ToastContainer position="top-right" />
    </div>
  );
};

export default EditItemPage;
