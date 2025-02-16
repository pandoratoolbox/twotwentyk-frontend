import React from "react";
import {
  Route,
  Routes,
  HashRouter as Router,
  Navigate,
} from "react-router-dom";
import {
  CheckEmailPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  SignInPage,
  SignUpPage,
  DashboardPage,
  UsernamePage,
  DatesPage,
  TriggersPage,
  IdentitiesPage,
  PredictionsPage,
  NotFoundPage,
  PrivacyPolicy,
  TermConditions,
  ProfilePage,
  ClaimsPage,
  TransactionsPage,
  BuyPackPage,
  MarketplacePage,
  MarketplaceIdentitiesPage,
  MarketplacePredictionPage,
  MarketplacePacksPage,
  CraftingIdentitesPage,
  CraftingPredictionsPage,
  CategoriesPage,
  CardPackPage,
  MyOfferPage,
  CollectionCreationPage,
  CraftingPage,
  CollectionDraft,
  CollectionMetaData,
  ClaimManagementPage,
  UserManagementPage,
  LearnToPlay
} from "./pages";
import { AppWrapper } from "./context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <GoogleOAuthProvider clientId="620329827727-t3sttbu6556u69ebv50fmt5rda85drp0.apps.googleusercontent.com">
        <Router>
          <AppWrapper>
            <Routes>
              {/* Auth Routes */}
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/check-email" element={<CheckEmailPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/signup/username" element={<UsernamePage />} />
              {/* Dashboard Routes */}
              <Route path="/" element={<Navigate to={"/dashboard/home"} />} />
              <Route
                path="/dashboard"
                element={<Navigate to={"/dashboard/home"} />}
              />
              <Route path="/dashboard/home" element={<DashboardPage />} />
              <Route path="/dashboard/dates" element={<DatesPage />} />
              <Route
                path="/dashboard/categories"
                element={<CategoriesPage />}
              />
              <Route
                path="/dashboard/identities"
                element={<IdentitiesPage />}
              />
              <Route path="/dashboard/triggers" element={<TriggersPage />} />
              <Route
                path="/dashboard/predictions"
                element={<PredictionsPage />}
              />
              <Route path="/dashboard/packs" element={<CardPackPage />} />
              <Route path="/dashboard/crafting" element={<CraftingPage />} />
              <Route path="/dashboard/myoffer" element={<MyOfferPage />} />
              {/* Dashboard Routes */}
              {/* Crafting Routes */}
              <Route
                path="/crafting"
                element={<Navigate to={"/crafting/identities"} />}
              />
              <Route
                path="/crafting/identities"
                element={<CraftingIdentitesPage />}
              />
              <Route
                path="/crafting/predictions"
                element={<CraftingPredictionsPage />}
              />
              {/* Crafting Routes */}
              {/* Marketplace Routes */}
              <Route
                path="/marketplace"
                element={<Navigate to={"/marketplace/cards"} />}
              />

              <Route path="/marketplace/cards" element={<MarketplacePage />} />
              <Route
                path="/marketplace/identities"
                element={<MarketplaceIdentitiesPage />}
              />
              <Route
                path="/marketplace/predictions"
                element={<MarketplacePredictionPage />}
              />
              <Route
                path="/marketplace/packs"
                element={<MarketplacePacksPage />}
              />
              {/* Marketplace Routes */}
              <Route path="/buy" element={<BuyPackPage />} />
              <Route path="/learn" element={<LearnToPlay />} />
              {/* Profile Routes */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/claims" element={<ClaimsPage />} />
              <Route
                path="/profile/transactions"
                element={<TransactionsPage />}
              />
              {/* Profile Routes */}

              {/* privacy policypage */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              {/* privacy policypage */}
              {/* term conditions & privacy policy */}
              <Route path="/term-conditions" element={<TermConditions />} />
              {/* End term conditions & privacy policy */}

              {/* Admin Routes */}
              <Route
                path="/admin/collection"
                element={<CollectionCreationPage />}
              />
              <Route
                path="/admin/collection/:collection_id/config"
                element={<CollectionDraft />}
              />
              <Route
                path="/admin/collection/:collection_id/upload"
                element={<CollectionMetaData />}
              />
              <Route
                path="/admin/event-validation"
                element={<ClaimManagementPage />}
              />
              <Route
                path="/admin/user-management"
                element={<UserManagementPage />}
              />
              {/* Admin Routes */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AppWrapper>
        </Router>
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
