import PasswordFind from "../components/Accounts/PasswordFind";
import PasswordReset from "../components/Accounts/PasswordReset";
import useAuthState from "../store/useAuthState";

const PasswordFindPage = () => {
  const { emailAuth } = useAuthState();
  return emailAuth ? <PasswordReset /> : <PasswordFind />;
};

export default PasswordFindPage;
