import Form from "./Components/Form";
import Header from "./Components/Header";

export default function SignUp() {
  return (
    <div>
      <Header />
      <Form
        button="Register"
        action={`post`}
        endPoint="auth/signup"
        navigate="/"
        hasLocalStorage={true}
      />
    </div>
  );
}
