import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView, ScrollView } from "react-native";
import { useAuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { User, Mail, ShieldCheck, LogOut, ChevronRight, Settings } from "lucide-react-native";

export default function ProfileScreen() {
  const { user } = useAuthContext();

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Yes, Logout", 
        style: "destructive", 
        onPress: async () => {
          try { await signOut(auth); } 
          catch (error) { Alert.alert("Error", "Failed to sign out."); }
        } 
      },
    ]);
  };

  const ProfileItem = ({ Icon, label, value, showArrow = true }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.itemLeft}>
        <View style={styles.iconBg}>
          <Icon size={20} color="#111" />
        </View>
        <View>
          <Text style={styles.itemLabel}>{label}</Text>
          <Text style={styles.itemValue} numberOfLines={1}>{value}</Text>
        </View>
      </View>
      {showArrow && <ChevronRight size={18} color="#CCC" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.email?.[0].toUpperCase()}
            </Text>
            <TouchableOpacity style={styles.editBadge}>
              <Settings size={14} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user?.email?.split('@')[0]}</Text>
          <Text style={styles.userStatus}>Verified Account</Text>
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.card}>
            <ProfileItem 
                Icon={Mail} 
                label="Email Address" 
                value={user?.email} 
            />
            <View style={styles.divider} />
            <ProfileItem 
                Icon={ShieldCheck} 
                label="User ID" 
                value={user?.uid} 
                showArrow={false}
            />
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.card}>
             <ProfileItem Icon={User} label="Edit Profile" value="Change your account details" />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
          <LogOut size={20} color="#FF3B30" style={{marginRight: 10}} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.2</Text>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8F9FA" },
  container: { padding: 20, paddingBottom: 120 }, 
  
  header: { alignItems: "center", marginVertical: 30 },
  avatarContainer: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: "#111", alignItems: "center",
    justifyContent: "center", marginBottom: 15,
    elevation: 5, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10,
  },
  avatarText: { color: "#fff", fontSize: 40, fontWeight: "bold" },
  editBadge: {
    position: 'absolute', bottom: 0, right: 0,
    backgroundColor: '#FF7E52', padding: 8, borderRadius: 20,
    borderWidth: 3, borderColor: '#F8F9FA'
  },
  userName: { fontSize: 24, fontWeight: "bold", color: "#111" },
  userStatus: { fontSize: 14, color: "#999", marginTop: 4 },

  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#111", marginBottom: 12, marginLeft: 5 },
  card: {
    backgroundColor: "#FFF", borderRadius: 20,
    paddingVertical: 5, paddingHorizontal: 15,
    elevation: 2, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10,
  },
  itemContainer: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", paddingVertical: 15,
  },
  itemLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  iconBg: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: "#F1F1F1", justifyContent: "center",
    alignItems: "center", marginRight: 15,
  },
  itemLabel: { fontSize: 12, color: "#999", marginBottom: 2 },
  itemValue: { fontSize: 15, fontWeight: "600", color: "#111" },
  divider: { height: 1, backgroundColor: "#F1F1F1", marginLeft: 55 },

  signOutBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    backgroundColor: "#FFF", marginTop: 10, padding: 18, borderRadius: 20,
    borderWidth: 1, borderColor: "#FFE5E5",
  },
  signOutText: { color: "#FF3B30", fontSize: 16, fontWeight: "700" },
  versionText: { textAlign: 'center', color: '#CCC', marginTop: 20, fontSize: 12 }
});