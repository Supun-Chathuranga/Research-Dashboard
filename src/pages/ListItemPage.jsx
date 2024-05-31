import config from "../config.json";
import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemListPage = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const host = config.host;
  

  useEffect(() => {
    let isMounted = true;
    axios
      .get(host+"/api/item/list")
      .then((response) => {
        if (isMounted) {
        setItems(response.data);
        toast.success("Items loaded successfully!", { autoClose: 2000 });}
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        toast.error("An error occurred while loading items.", { autoClose: 2000 });
      });
      return ()=> {
        isMounted = false;
      }
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = (itemId) => {
    axios
      .delete(host+"/api/item/delete", {
        data: { id: itemId },
      })
      .then((response) => {
        if (response.data.status === false) {
          console.error("An error occurred:", response.data);
          toast.error(response.data.message || "An error occurred while deleting the item.", { autoClose: 2000 });
        } else {
          console.log("Item deleted successfully:", response.data);
          toast.success("Item deleted successfully!", { autoClose: 2000 });
          setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        }
      })
      .catch((error) => {
        console.error("An error occurred while deleting the item:", error);
        toast.error("An error occurred while deleting the item.", { autoClose: 2000 });
      });
  };
  

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    { field: "itemCode", headerName: "Item Code", width: 150 },
    { field: "itemName", headerName: "Item Name", width: 200 },
    { field: "purchasePrice", headerName: "Purchase Price", width: 150 },
    { field: "sellingPrice", headerName: "Selling Price", width: 150 },
    { field: "stockQty", headerName: "Stock Qty", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            href={`/item_edit/${params.row.id}`}
            style={{
              minWidth: "36px",
              padding: "4px",
            }}
          >
            <EditIcon />
          </Button>
          <Button
            variant="contained"
            color="error"
            style={{
              minWidth: "36px",
              padding: "4px",
            }}
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </Button>
        </div>
      ),
    },
  ];

  const handleOpenUploadModal = () => {
    setOpenUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    setOpenUploadModal(false);
  };

  const handleUpload = () => {
    handleCloseUploadModal();
    toast.success("File uploaded successfully!", { autoClose: 2000 });
  };

  return (
    <div>
      <Paper elevation={3} style={{ padding: "24px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Item List
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenUploadModal}
          >
            Upload
          </Button>
          <div>
            <Button
              variant="contained"
              style={{
                backgroundColor: "green",
                color: "white",
                marginRight: "8px",
              }}
            >
              Export
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "yellow", color: "black" }}
            >
              Print
            </Button>
          </div>
        </div>

        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          style={{ marginBottom: "16px" }}
        />

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filteredItems}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </div>

        <Dialog open={openUploadModal} onClose={handleCloseUploadModal}>
          <DialogTitle>Upload File</DialogTitle>
          <DialogContent>
            <input
              type="file"
              accept=".csv"
              // Add your file input change handler here
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUploadModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpload} color="primary">
              Upload
            </Button>
          </DialogActions>
        </Dialog>

        <ToastContainer position="top-right" />
      </Paper>
    </div>
  );
};

export default ItemListPage;
