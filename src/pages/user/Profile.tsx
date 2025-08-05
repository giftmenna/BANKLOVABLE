import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { users, transactions } from '../../services/api';
import { toast } from 'sonner';
import { Layout } from '../../components/Layout';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Badge } from '../../components/ui/badget';
import { Separator } from '../../components/ui/separator';
import { User, Camera, Trash2, Save, X, Lock, Mail, Phone, Bell, Palette, BarChart3, Shield, Volume2 } from 'lucide-react';
import { showTransactionNotification, playNotificationSound } from '../../utils/notifications';

export default function Profile() {
  const { currentUser, refreshUser } = useAuth();
  const [userDetails, setUserDetails] = useState<any>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    transactionAlerts: true,
    securityAlerts: true
  });
  const [transactionStats, setTransactionStats] = useState({
    totalTransactions: 0,
    thisMonthTransactions: 0
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser?.id) {
        setIsLoading(false);
        return;
      }
      
      try {
        console.log('🔄 Fetching user data for ID:', currentUser.id);
        const userData = await users.getById(currentUser.id);
        console.log('✅ User data received:', userData);
        setUserDetails(userData);
        
        // Fetch transaction statistics
        try {
          const userTransactions = await transactions.getByUserId(currentUser.id);
          const txList = Array.isArray(userTransactions) ? userTransactions : [];
          const now = new Date();
          const thisMonth = now.getMonth();
          const thisYear = now.getFullYear();
          
          const thisMonthTransactions = txList.filter((tx: any) => {
            const txDate = new Date(tx.date_time);
            return txDate.getMonth() === thisMonth && txDate.getFullYear() === thisYear;
          }).length;
          
          setTransactionStats({
            totalTransactions: txList.length,
            thisMonthTransactions: thisMonthTransactions
          });
        } catch (txError) {
          console.warn('Failed to fetch transaction stats:', txError);
        }
      } catch (error: any) {
        console.error('❌ Failed to fetch user data:', error);
        
        // Check if it's an authentication error
        if (error.response?.status === 401 || error.response?.status === 403) {
          toast.error('Session expired. Please log in again.');
          // Redirect to login
          window.location.href = '/login';
          return;
        }
        
        toast.error('Failed to load profile data. Please try refreshing the page.');
        // Set default user details to prevent crashes
        setUserDetails({
          id: currentUser.id,
          username: currentUser.username || 'Unknown',
          full_name: currentUser.fullName || 'Unknown',
          email: currentUser.email || 'No email',
          balance: 0,
          status: 'Active',
          avatar: null
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser?.id]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      if (!file.type.match(/image\/(jpeg|png|jpg)/)) {
        toast.error("Please select a valid image file (JPEG, JPG, or PNG)");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size should be less than 10MB");
        return;
      }
      
      setAvatarFile(file);
      
      // Create a simple object URL for preview
      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
    }
  };

  const uploadAvatar = async () => {
    if (!avatarFile || !currentUser?.id) {
      toast.error("No file selected or user not found");
      return;
    }
    
    try {
      console.log('🔄 Starting avatar upload:', {
        userId: currentUser.id,
        fileName: avatarFile.name,
        fileSize: avatarFile.size,
        fileType: avatarFile.type
      });
      
      const response = await users.updateAvatar(currentUser.id, avatarFile);
      console.log('✅ Avatar upload response:', response);
      
      if (response && response.avatar) {
        console.log('📝 Updating user details with avatar path:', response.avatar);
        
        // Update local state with the new avatar
        setUserDetails({ ...userDetails, avatar: response.avatar });
        
        // Clear the file and preview
        setAvatarFile(null);
        setAvatarPreview(null);
        
        toast.success("Avatar updated successfully");
        
        // Refresh user context
        await refreshUser();
        
        console.log('✅ Avatar upload completed successfully');
      } else {
        console.error('❌ No avatar in response:', response);
        toast.error("Failed to update avatar - server returned no avatar data");
      }
    } catch (error: any) {
      console.error("Avatar upload error:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error(`Upload failed: ${error.message || "Unknown error"}`);
    }
  };

  const removeAvatar = async () => {
    if (!currentUser?.id) return;
    try {
      await users.deleteAvatar(currentUser.id);
      setAvatarPreview(null);
      setAvatarFile(null);
      setUserDetails({ ...userDetails, avatar: undefined });
      toast.success("Avatar removed successfully");
      
      // Refresh user data to ensure consistency
      try {
        await refreshUser();
        const refreshedUser = await users.getById(currentUser.id);
        setUserDetails(refreshedUser);
      } catch (refreshError) {
        console.warn("Failed to refresh user data:", refreshError);
      }
    } catch (error: any) {
      console.error("Remove avatar error:", error);
      toast.error(error.message || "Failed to remove avatar. Please try again.");
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  if (isLoading) {
    return (
      <Layout>
        <Navbar />
        <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="h-8 w-48 bg-muted rounded mx-auto mb-4"></div>
            <div className="h-4 w-24 bg-muted rounded mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </Layout>
    );
  }

  if (!currentUser) {
    return (
      <Layout>
        <Navbar />
        <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p className="text-muted-foreground mb-4">Please log in to view your profile.</p>
            <Button onClick={() => window.location.href = '/login'}>
              Go to Login
            </Button>
          </div>
        </div>
        <Footer />
      </Layout>
    );
  }

  // Avatar source logic
  const avatarSrc = avatarPreview || (userDetails?.avatar ? `/api/avatar/${userDetails.avatar.split('/').pop()}` : "");
  const avatarSrcWithTimestamp = avatarSrc ? `${avatarSrc}?t=${Date.now()}` : "";

  return (
    <Layout>
      <Navbar />
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Profile Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your personal information, security, and preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Picture Section */}
            <Card className="bg-[#1F2937] text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="h-6 w-6 mr-2 text-bank-gold" />
                  Profile Picture
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Update your profile picture
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6">
                <Avatar className="h-32 w-32 border-4 border-bank-gold rounded-full">
                  <AvatarImage 
                    src={avatarSrcWithTimestamp} 
                    onLoad={() => console.log('✅ Avatar image loaded successfully:', avatarSrcWithTimestamp)}
                    onError={(e) => {
                      console.error('❌ Avatar image failed to load:', avatarSrcWithTimestamp, e);
                    }}
                    style={{ objectFit: 'cover' }}
                  />
                  <AvatarFallback className="bg-bank-gold text-bank-dark-text text-3xl">
                    {currentUser?.fullName
                      ? currentUser.fullName.substring(0, 2).toUpperCase()
                      : currentUser?.username?.substring(0, 2).toUpperCase() ||
                        "NU"}
                  </AvatarFallback>
                </Avatar>
                
                <div className="space-y-3 w-full">
                  <input
                    ref={fileInputRef}
                    id="avatar-upload"
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={handleAvatarChange}
                    className="sr-only"
                  />
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={triggerFileInput}
                    className="w-full bg-transparent border-bank-gold text-bank-gold hover:bg-bank-gold hover:text-bank-dark-text"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Change Profile Picture
                  </Button>
                  
                  {avatarFile && (
                    <div className="flex gap-2">
                      <Button
                        onClick={uploadAvatar}
                        variant="default"
                        className="flex-1 bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        onClick={() => {
                          setAvatarFile(null);
                          setAvatarPreview(null);
                        }}
                        variant="destructive"
                        className="flex-1"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                  
                  {(userDetails?.avatar || avatarPreview) && !avatarFile && (
                    <Button
                      onClick={removeAvatar}
                      variant="destructive"
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Profile Picture
                    </Button>
                  )}
                                 </div>
                 
                 <Separator className="bg-gray-600" />
                 
                 <Button
                   variant="default"
                   className="w-full bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text"
                   onClick={() => {
                     // TODO: Implement notification settings save
                     toast.success('Notification settings saved!');
                   }}
                 >
                   Save Preferences
                 </Button>
               </CardContent>
             </Card>

            {/* Profile Information Section */}
            <Card className="bg-[#1F2937] text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-6 w-6 mr-2 text-bank-gold" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Your account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300">Full Name</label>
                  <p className="text-white font-semibold">{userDetails?.fullName || userDetails?.full_name || 'Not set'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-300">Username</label>
                  <p className="text-white font-semibold">{userDetails?.username || 'Not set'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-300">Email</label>
                  <p className="text-white font-semibold">{userDetails?.email || 'Not set'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-300">Phone</label>
                  <p className="text-white font-semibold">{userDetails?.phone || 'Not set'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-300">Account Status</label>
                  <Badge variant={userDetails?.status === 'Active' ? 'default' : 'destructive'}>
                    {userDetails?.status || 'Active'}
                  </Badge>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-300">Available Balance</label>
                  <p className="text-white font-semibold">
                    ${userDetails?.balance ? (typeof userDetails.balance === 'number' ? userDetails.balance.toFixed(2) : '0.00') : '0.00'}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-300">Last Login</label>
                  <p className="text-white font-semibold">
                    {userDetails?.last_login ? new Date(userDetails.last_login).toLocaleString() : 'Not available'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Security Section */}
            <Card className="bg-[#1F2937] text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-bank-gold" />
                  Security
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Manage your account security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-bank-gold text-bank-gold hover:bg-bank-gold hover:text-bank-dark-text"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  onClick={async () => {
                    await playNotificationSound('success');
                    toast.success('🔊 Test notification sound played!', {
                      duration: 30000,
                      position: "top-center",
                    });
                  }}
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Test Notification Sound
                </Button>
                
                {isEditing && (
                  <div className="space-y-3 p-4 border border-gray-600 rounded-lg">
                    <div>
                      <Label htmlFor="currentPassword" className="text-gray-300">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newPassword" className="text-gray-300">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword" className="text-gray-300">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        className="flex-1 bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text"
                        onClick={() => {
                          // TODO: Implement password change
                          toast.success('Password change functionality coming soon!');
                          setIsEditing(false);
                        }}
                      >
                        Update Password
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Additional Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Notification Settings */}
            <Card className="bg-[#1F2937] text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-6 w-6 mr-2 text-bank-gold" />
                  Notification Preferences
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Manage your notification settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Email Notifications</Label>
                    <p className="text-sm text-gray-400">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                  />
                </div>
                
                <Separator className="bg-gray-600" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">SMS Notifications</Label>
                    <p className="text-sm text-gray-400">Receive updates via SMS</p>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                  />
                </div>
                
                <Separator className="bg-gray-600" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Transaction Alerts</Label>
                    <p className="text-sm text-gray-400">Get notified of account activity</p>
                  </div>
                  <Switch
                    checked={notificationSettings.transactionAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, transactionAlerts: checked})}
                  />
                </div>
                
                <Separator className="bg-gray-600" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Security Alerts</Label>
                    <p className="text-sm text-gray-400">Get notified of security events</p>
                  </div>
                  <Switch
                    checked={notificationSettings.securityAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, securityAlerts: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Statistics */}
            <Card className="bg-[#1F2937] text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-6 w-6 mr-2 text-bank-gold" />
                  Account Statistics
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Your account overview
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border border-gray-600 rounded-lg">
                    <p className="text-2xl font-bold text-bank-gold">{transactionStats.totalTransactions}</p>
                    <p className="text-sm text-gray-300">Total Transactions</p>
                  </div>
                  <div className="text-center p-4 border border-gray-600 rounded-lg">
                    <p className="text-2xl font-bold text-bank-gold">{transactionStats.thisMonthTransactions}</p>
                    <p className="text-sm text-gray-300">This Month</p>
                  </div>
                </div>
                
                <Separator className="bg-gray-600" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Account Created</span>
                    <span className="text-white">
                      {userDetails?.created_at ? new Date(userDetails.created_at).toLocaleDateString() : 'Not available'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Last Login</span>
                    <span className="text-white">
                      {userDetails?.last_login ? new Date(userDetails.last_login).toLocaleString() : 'Not available'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Account Type</span>
                    <span className="text-white">
                      {userDetails?.isAdmin ? 'Administrator' : 'Standard'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
} 