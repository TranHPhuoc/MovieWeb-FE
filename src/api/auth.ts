const API_URL = '/api/v1';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  gender: string;
  age: number;
  address: string;
}

interface AuthResponse {
  status?: number;
  data?: {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    }
  };
  accessToken?: string;
  message?: string;
}

// Hàm xử lý response chung
const handleResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Có lỗi xảy ra từ server');
    }
    return data;
  }
  throw new Error('Phản hồi không phải JSON');
};

// Đăng ký
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đăng ký thất bại');
  }
};

// Đăng nhập
export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đăng nhập thất bại');
  }
};

// Đăng xuất
export const logout = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Đăng xuất thất bại');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Đăng xuất thất bại');
  }
};

// Refresh token
export const refreshToken = async (): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include'
    });

    return handleResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Làm mới token thất bại');
  }
};
