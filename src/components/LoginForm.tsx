import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { User } from "../types/user";
import { Box, TextField, Button, Typography, Container } from "@mui/material";

// Hàm gọi API backend để đăng nhập
const loginWithBackend = async (email: string, password: string) => {
  const response = await fetch("https://movieweb-production.up.railway.app/api/v1/login", {
    method: "POST",
    credentials: "include", // để gửi cookie
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Đăng nhập thất bại");
  }

  return await response.json(); // { data: { user }, accessToken }
};

const LoginForm = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Kiểm tra tài khoản admin cứng
      if (formData.email === "admin@gmail.com" && formData.password === "admin") {
        const adminUser: User = {
          _id: "admin123",
          id: "admin-id",
          email: "admin@gmail.com",
          name: "Admin",
          displayName: "Admin",
          role: "admin",
          gender: "male",
          age: 30,
          address: "Admin HQ",
        };
        authLogin(adminUser, "admin-token");
        navigate("/admin", { replace: true });
        return;
      }

      // ✅ Gọi API backend để đăng nhập
      const result = await loginWithBackend(formData.email, formData.password);
      const loginUser: User = {
        ...result.data.user,
        displayName: result.data.user.name,
      };

      // Đăng nhập thành công, lưu thông tin và điều hướng
      authLogin(loginUser, result.accessToken);
      navigate("/homepage", { replace: true });

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
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
          Đăng nhập
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "100%" }}
        >
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
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
            autoComplete="username"
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
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#e50914",
              "&:hover": { bgcolor: "#b2070e" },
              "&.Mui-disabled": { bgcolor: "#e50914", opacity: 0.7 },
            }}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
          <Typography sx={{ color: "gray", textAlign: "center" }}>
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              style={{ color: "white", textDecoration: "underline" }}
            >
              Đăng ký ngay
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
