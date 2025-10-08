/**
 * Authentication Redux Slice
 * Manages user authentication state and operations
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Firebase auth functions - dynamically imported
const getFirebaseAuth = async () => {
  try {
    const { auth } = await import("/src/Firebase/Config/firebase.config.js");
    return auth;
  } catch (error) {
    console.error("Failed to load Firebase auth:", error);
    throw new Error("Firebase authentication not available");
  }
};

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  emailVerified: false,
  lastLoginTime: null,
  loginAttempts: 0,
  isLocked: false,
  lockoutEndTime: null,
};

// Async thunks
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const auth = await getFirebaseAuth();
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        emailVerified: userCredential.user.emailVerified,
        photoURL: userCredential.user.photoURL,
      };
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
      const auth = await getFirebaseAuth();
      const {
        createUserWithEmailAndPassword,
        updateProfile,
        sendEmailVerification,
      } = await import("firebase/auth");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update profile with display name
      await updateProfile(userCredential.user, { displayName });

      // Send email verification
      await sendEmailVerification(userCredential.user);

      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: displayName,
        emailVerified: false,
        photoURL: null,
      };
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      const auth = await getFirebaseAuth();
      const { signOut: firebaseSignOut } = await import("firebase/auth");
      await firebaseSignOut(auth);
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const auth = await getFirebaseAuth();
      const { sendPasswordResetEmail } = await import("firebase/auth");
      await sendPasswordResetEmail(auth, email);
      return { message: "Password reset email sent successfully" };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        state.emailVerified = action.payload.emailVerified;
        state.lastLoginTime = new Date().toISOString();
      }
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    incrementLoginAttempts: (state) => {
      state.loginAttempts += 1;
      if (state.loginAttempts >= 5) {
        state.isLocked = true;
        state.lockoutEndTime = new Date(
          Date.now() + 15 * 60 * 1000
        ).toISOString(); // 15 minutes
      }
    },
    resetLoginAttempts: (state) => {
      state.loginAttempts = 0;
      state.isLocked = false;
      state.lockoutEndTime = null;
    },
    checkLockoutStatus: (state) => {
      if (state.lockoutEndTime && new Date() > new Date(state.lockoutEndTime)) {
        state.isLocked = false;
        state.lockoutEndTime = null;
        state.loginAttempts = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.emailVerified = action.payload.emailVerified;
        state.lastLoginTime = new Date().toISOString();
        state.loginAttempts = 0;
        state.isLocked = false;
        state.lockoutEndTime = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.loginAttempts += 1;
        if (state.loginAttempts >= 5) {
          state.isLocked = true;
          state.lockoutEndTime = new Date(
            Date.now() + 15 * 60 * 1000
          ).toISOString();
        }
      })

      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.emailVerified = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Sign Out
      .addCase(signOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.emailVerified = false;
        state.error = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  setUser,
  updateUserProfile,
  incrementLoginAttempts,
  resetLoginAttempts,
  checkLockoutStatus,
} = authSlice.actions;

export default authSlice.reducer;
