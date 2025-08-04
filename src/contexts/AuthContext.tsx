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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const normalizeUser = (user: any): User => ({
    id: user.id,
    username: user.username,
    fullName: user.full_name || user.fullName || "",
    email: user.email,
    isAdmin: user.is_admin ?? user.isAdmin ?? false,
    balance: user.balance,
    avatar: user.avatar,
    status: user.status,
  });

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const rawUser = await services.auth.getCurrentUser();
        if (rawUser) {
          const user = normalizeUser(rawUser);
          setCurrentUser(user);
        }
      } catch (err) {
        console.error("❌ Failed to fetch current user:", err);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  const login = async (username: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      const rawUser = await services.auth.login(username, password);
      const user = normalizeUser(rawUser);
      setCurrentUser(user);

      toast.success(`Welcome back, ${user.fullName || user.username}!`);

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
      const mappedUpdates: Partial<User> & { status?: "Active" | "Inactive" } = {
        ...updates,
        status:
          updates.status === "Active"
            ? "Active"
            : updates.status === "Inactive"
            ? "Inactive"
            : undefined,
      };
      const updated = await services.auth.updateUser(currentUser.id, mappedUpdates);
      const user = normalizeUser(updated);
      setCurrentUser(user);
      toast.success("User profile updated successfully.");
    } catch {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const refreshUser = async () => {
    try {
      const rawUser = await services.auth.getCurrentUser();
      if (rawUser) {
        const user = normalizeUser(rawUser);
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
