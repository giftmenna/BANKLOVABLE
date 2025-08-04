import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import services from "@/services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
  balance?: number;
  avatar?: string;
  status?: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  updateCurrentUser: (updates: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // On mount, check if the user is already logged in by hitting /api/me
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await services.auth.getCurrentUser();
        if (user) {
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
      } catch {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  // Updated login returns the user object
  const login = async (username: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      // This call sets the JWT cookie
      const loginResponse = await services.auth.login(username, password);
      const user = loginResponse.user;
      
      if (!user) {
        throw new Error("No user data found after login");
      }
      
      setCurrentUser(user);
      toast.success(
        `Welcome back, ${user.fullName || user.username}!`
      );
      
      // Redirect based on admin flag
      if (user.isAdmin) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
      
      return user;
    } catch (error: any) {
      toast.error(error.message || "Login failed. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await services.auth.logout();
      setCurrentUser(null);
      toast.info("You have been logged out.");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  const updateCurrentUser = async (updates: Partial<User>) => {
    if (!currentUser) return;
    try {
      const updated = await services.auth.updateUser(currentUser.id, updates);
      setCurrentUser(updated);
      toast.success("User profile updated successfully.");
    } catch {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const refreshUser = async () => {
    try {
      const user = await services.auth.getCurrentUser();
      if (user) {
        setCurrentUser(user);
      } else {
        throw new Error("No user data found");
      }
    } catch {
      toast.error("Failed to refresh user data.");
    }
  };

  const value: AuthContextType = {
    currentUser,
    loading,
    login,
    logout,
    isAdmin: currentUser?.isAdmin || false,
    updateCurrentUser,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-bank-gold"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
