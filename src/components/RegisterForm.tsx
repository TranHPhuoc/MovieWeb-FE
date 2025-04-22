import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: "",
    address: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    const age = parseInt(formData.age);
    if (isNaN(age) || age < 1 || age > 150) {
      setError("Tuổi không hợp lệ");
      return;
    }

    try {
      const response = await fetch("http://movieweb-production.up.railway.app/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
          age: parseInt(formData.age),
          address: formData.address,
        }),
      });
    
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Đăng ký thất bại");
      }
    
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Lỗi không xác định");
    }
    
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      color: "white",
      "& fieldset": { borderColor: "gray" },
      "&:hover fieldset": { borderColor: "white" },
    },
    "& .MuiInputLabel-root": { color: "gray" },
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="netflix-bg"></div>
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "400px",
          bgcolor: "rgba(0, 0, 0, 0.75)",
          p: 4,
          borderRadius: 2,
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ color: "white", mb: 3, textAlign: "center" }}
        >
          Đăng ký
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Họ và tên"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={textFieldStyle}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={textFieldStyle}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Mật khẩu"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={textFieldStyle}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            sx={textFieldStyle}
          />
          <TextField
            select
            margin="normal"
            required
            fullWidth
            label="Giới tính"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            sx={textFieldStyle}
          >
            <MenuItem value="male">Nam</MenuItem>
            <MenuItem value="female">Nữ</MenuItem>
            <MenuItem value="other">Khác</MenuItem>
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Tuổi"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            sx={textFieldStyle}
            inputProps={{ min: 1, max: 150 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Địa chỉ"
            name="address"
            value={formData.address}
            onChange={handleChange}
            sx={textFieldStyle}
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#e50914",
              "&:hover": { bgcolor: "#b2070e" },
            }}
          >
            Đăng ký
          </Button>
          <Typography sx={{ color: "gray", textAlign: "center" }}>
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "underline" }}
            >
              Đăng nhập ngay
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
